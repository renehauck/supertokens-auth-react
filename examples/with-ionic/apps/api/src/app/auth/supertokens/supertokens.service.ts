import { Inject, Injectable } from '@nestjs/common';
import supertokens from "supertokens-node";
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from "../config.interface";

function updateHeadersForResponse(res: any) {
    // this is specific to express response
    if (!res.original.headersSent) {
        const cookies = res.original.getHeader("Set-Cookie");
        if (cookies) {
            // We need to copy the Set-Cookie header into another one, since Set-Cookie is not accessible on the frontend
            res.original.setHeader("st-cookie", cookies);
            res.original.removeHeader("Set-Cookie");
        }
    }
}

function updateHeadersInRequest(req: any) {
    // this is specific to express request
    const stCookies = req.original.headers["st-cookie"];
    // If it was defined, we should overwrite the original cookies header with it.
    // Since the format matches, SuperTokens can access and parse them.
    if (stCookies) {
        req.original.headers["cookie"] = req.original.headers["st-cookie"];
    }
}

@Injectable()
export class SupertokensService {
    constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
        supertokens.init({
            appInfo: config.appInfo,
            supertokens: {
                connectionURI: config.connectionURI,
                apiKey: config.apiKey,
            },
            recipeList: [
              EmailPassword.init(),
                Session.init({
            override: {
                functions: (origImpl) => {
                    return {
                        ...origImpl,
                        createNewSession: async function (input) {
                            // We start with calling the original implementation because it doesn't need a session
                            const session = await origImpl.createNewSession(input);
                            // We need to copy the Set-Cookies header into the custom header in the response.
                            updateHeadersForResponse(input.res);

                            if (session) {
                                const origUpdate = session.mergeIntoAccessTokenPayload.bind(session);
                                session.mergeIntoAccessTokenPayload = async (newAccessTokenPayload, userContext) => {
                                    await origUpdate(newAccessTokenPayload, userContext);
                                    updateHeadersForResponse(input.res);
                                };
                            }

                            return session;
                        },
                        refreshSession: async function (input) {
                            // Before calling the original implementation, we need to check the custom header.
                            updateHeadersInRequest(input.req);
                            const session = await origImpl.refreshSession(input);
                            updateHeadersForResponse(input.res);
                            if (session) {
                                const origUpdate = session.mergeIntoAccessTokenPayload.bind(session);
                                session.mergeIntoAccessTokenPayload = async (newAccessTokenPayload, userContext) => {
                                    await origUpdate(newAccessTokenPayload, userContext);
                                    updateHeadersForResponse(input.res);
                                };
                            }
                            return session;
                        },
                        getSession: async function (input) {
                            // Before calling the original implementation, we need to check the custom header.
                            updateHeadersInRequest(input.req);
                            // Calling the original implementation
                            const res = await origImpl.getSession(input);
                            // This method may change cookie values, so we need to copy the Set-Cookies header into the custom header in the response.
                            updateHeadersForResponse(input.res);
                            if (res) {
                                const origUpdate = res.mergeIntoAccessTokenPayload.bind(res);
                                res.mergeIntoAccessTokenPayload = async (newAccessTokenPayload, userContext) => {
                                    await origUpdate(newAccessTokenPayload, userContext);
                                    updateHeadersForResponse(input.res);
                                };
                            }
                            return res;
                        },
                    };
                },
            },
        }),
            ],
        });
    }

}
