import React, { useEffect } from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { RealPasswordClaim } from "../realPasswordClaim";

export default function Home() {
    const sessionContext = useSessionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            !sessionContext.loading &&
            sessionContext.invalidClaims.find((err) => err.validatorId === RealPasswordClaim.id)
        ) {
            navigate("/set-password");
        }
    }, [sessionContext, navigate]);

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    if (sessionContext.loading || sessionContext.invalidClaims.length > 0) {
        return null;
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={sessionContext.userId} />
        </div>
    );
}
