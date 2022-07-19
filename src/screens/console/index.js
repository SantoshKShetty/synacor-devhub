import React from "react";
import { generateComponent, composeComponents } from '../../utils/component';
import { useScreen } from "../../provider/screen";
import { findMatchingRoute } from "../../utils/route";
import { exists, isArray, isObject } from "../../utils/basics";
import DescriptorLoader from '../../enhancers/descriptor-loader';
import useEventsRegistry from "../../hooks/events-registry";
import { useAuth } from "../../provider/auth";
import { CALLBACK_TYPES, ELEM_REF_ATTR } from "../../constants/events-registry";

const Header = ({ logo, header }) => {
    const { signOut } = useAuth();
    const { registerEvents } = useEventsRegistry();

    const handleSignout = () => {
        signOut()
    }

    const eventsToRegister = [
        {
            [ELEM_REF_ATTR.ID]: 'SIGN_OUT_CTA',
            events: {
                onClick: [CALLBACK_TYPES.DEFAULT_RETURN, handleSignout]
            }
        }
    ];

    registerEvents(eventsToRegister);

    return (
        <React.Fragment>
            {logo && generateComponent(logo)}
            {header && generateComponent(header)}
        </React.Fragment>
    );
}

const LeftCol = ({ leftCol }) => generateComponent(leftCol);

const RightCol = ({ subScreens = {} }) => {
    const [, SubScreens] = useScreen();
    const matchingUri = findMatchingRoute(Object.keys(subScreens));

    if (matchingUri) {
        const { component, descriptor } = subScreens[matchingUri];

        if (!exists(component)) return null;

        const SubScreen = SubScreens[component];

        return SubScreen && composeComponents(
            descriptor && [DescriptorLoader, { descriptor, key: descriptor }]
        )(<SubScreen />) || null;
    }

    return null;
}

function ConsoleScreen({ genericInfo, screenInfo, Layout, subScreens }) {
    const { logo } = genericInfo;
    const [ header, leftCol ] = isObject(screenInfo) ? [screenInfo] : isArray(screenInfo) ? screenInfo : [];

    return (
        <Layout>
            <Header logo={logo} header={header} />
            <LeftCol leftCol={leftCol} />
            <RightCol subScreens={subScreens} />
        </Layout>
    );
};

export default React.memo(ConsoleScreen);