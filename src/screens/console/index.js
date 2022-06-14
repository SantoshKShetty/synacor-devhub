import React from "react";
import { generateComponent, composeComponents } from '../../utils/component';
import { useScreen } from "../../provider/screen";
import { findMatchingRoute } from "../../utils/route";
import { exists } from "../../utils/basics";
import DescriptorLoader from '../../enhancers/descriptor-loader';
import useEventsRegistry from "../../hooks/events-registry";
import { useAuth } from "../../provider/auth";

const Header = ({ logo, header }) => {
    const { signOut } = useAuth();
    const { registerEvents } = useEventsRegistry();

    const handleSignout = () => {
        signOut()
    }

    const eventsToRegister = {
        SignoutBtn: {
            onClick: handleSignout
        }
    }

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

function ConsoleScreen({ info, Layout, subScreens }) {
    const { logo, header, leftCol } = info;

    return (
        <Layout>
            <Header logo={logo} header={header} />
            <LeftCol leftCol={leftCol} />
            <RightCol subScreens={subScreens} />
        </Layout>
    );
};

export default React.memo(ConsoleScreen);