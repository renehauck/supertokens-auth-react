import { useState, useEffect } from "react";
import Session, { useSessionContext } from "supertokens-auth-react/recipe/session";
import { SignInUp, SignInUpTheme } from "supertokens-auth-react/recipe/passwordless";

const CustomSignInUpTheme: typeof SignInUpTheme = (props) => {
    let [showDefaultUI, setShowDefaultUI] = useState(false);
    const session = useSessionContext();
    useEffect(() => {
        let aborting = false;
        async function effect() {
            if (session.loading === true) {
                return;
            }

            let phoneNumber = session.accessTokenPayload.phoneNumber;
            // If don't have a phone number we show the default UI (which should be the phone form)
            if (phoneNumber === undefined) {
                setShowDefaultUI(true);
            } else {
                // we start the OTP flow if it's not started already
                if (props.featureState.loginAttemptInfo === undefined) {
                    await props.recipeImplementation.createCode({ phoneNumber, userContext: props.userContext });
                }

                if (aborting) {
                    return;
                }
                // if we have an OTP flow (or we just started one) we show the default UI which should be the OTP input
                setShowDefaultUI(true);
            }
        }
        effect();
        return () => {
            aborting = true;
        };
    }, []);

    // If this was active, we'd not show the OTP screen because it'd detect an active session.
    props.featureState.successInAnotherTab = false;

    if (showDefaultUI) {
        return <SignInUpTheme {...props} />;
    }
    return <></>;
};

export default function PhoneVerification() {
    return (
        <SignInUp redirectOnSessionExists={false}>
            {
                // @ts-ignore We ignore the error about missing props, since they'll be set by the feature component
                <CustomSignInUpTheme />
            }
        </SignInUp>
    );
}
