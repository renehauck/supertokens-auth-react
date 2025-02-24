import React from "react";
import axios from "axios";
import { getApiDomain } from "../App";

export default function CallAPIView() {
    async function callAPIClicked() {
        // this will also automatically refresh the session if needed
        let jwt = localStorage.getItem("jwt");
        let response = await axios.get(getApiDomain() + "/sessioninfo", {
            headers: {
                Authorization: "Bearer " + jwt,
            },
        });
        window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    }

    return (
        <div onClick={callAPIClicked} className="sessionButton">
            Call API
        </div>
    );
}
