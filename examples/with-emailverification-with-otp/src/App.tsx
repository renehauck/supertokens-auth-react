import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailpassword, { Github, Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import "./App.css";
import Home from "./Home";
import OtpScreen from "./OtpScreen";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

Session.addAxiosInterceptors(axios);

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(),
    },
    recipeList: [
        EmailVerification.init({
            mode: "REQUIRED",

            override: {
                components: {
                    EmailVerificationSendVerifyEmail_Override: () => {
                        return <OtpScreen />;
                    },
                },
            },
        }),
        ThirdPartyEmailpassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init()],
            },
        }),
        Session.init(),
    ],
});

function App() {
    return (
        <SuperTokensWrapper>
            <div className="App">
                <Router>
                    <Routes>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                        <Route
                            path="/"
                            element={
                                /* This protects the "/" route so that it shows 
                                <Home /> only if the user is logged in.
                                Else it redirects the user to "/auth" */
                                <SessionAuth>
                                    <Home />
                                </SessionAuth>
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
