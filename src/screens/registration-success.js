import React from "react";
import { generateComponent } from "../utils/component";

function RegisterSuccess({ genericInfo, screenInfo, Layout }) {
    const { logo } = genericInfo;

    return (
        <Layout logo={logo}>
            {generateComponent(screenInfo)}
        </Layout>
    );
}

export default React.memo(RegisterSuccess);