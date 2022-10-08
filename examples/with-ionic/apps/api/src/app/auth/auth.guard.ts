import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Error as STError } from 'supertokens-node';

import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { VerifySessionOptions } from 'supertokens-node/recipe/session';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    let resp = ctx.getResponse();
    let req = ctx.getRequest();
    if (!req) {
      const gqlCtx = GqlExecutionContext.create(context).getContext();
      req = gqlCtx.req;
      resp = gqlCtx.res;
    }

    let err = undefined;
    // You can create an optional version of this by passing {sessionRequired: false} to verifySession
    await verifySession()(req, resp, (res) => {
      err = res;
    });

    if (resp.headersSent) {
      throw new STError({
        message: 'RESPONSE_SENT',
        type: 'RESPONSE_SENT',
      });
    }

    if (err) {
      throw err;
    }

    return true;
  }
}
