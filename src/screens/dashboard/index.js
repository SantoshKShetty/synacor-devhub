import React from "react";
import { makeStyles } from '../../provider/theme';
import { generateComponent, composeComponents } from '../../utils/component';
import { useScreen } from "../../provider/screen";
import { findMatchingRoute } from "../../utils/route";
import { exists } from "../../utils/basics";
import DescriptorLoader from '../../enhancers/descriptor-loader';

const Header = ({ logo, header }) => (
    <React.Fragment>
        {logo && generateComponent(logo)}
        {header && generateComponent(header, { keyPrefix: 'dashboard-header-item' })}
    </React.Fragment>
)


const leftColStyles = makeStyles({
    accordion: {}
});

const LeftCol = ({ leftCol, css }) => {
    const classes = leftColStyles();

    return generateComponent(leftCol, {
        classes,
        keyPrefix: 'dashboard-left-col-item'
    });
}


const RightCol = ({ subScreens = {} }) => {
    const [, SubScreens] = useScreen();
    const matchingUri = findMatchingRoute(Object.keys(subScreens));

    if (matchingUri) {
        const { component, descriptor } = subScreens[matchingUri];

        if (!exists(component)) return null;

        const SubScreen = SubScreens[component];

        return SubScreen && composeComponents(
            descriptor && [DescriptorLoader, { descriptor }]
        )(<SubScreen />) || null;
    }

    return null;
}


export default function DashboardScreen({ info, Layout, subScreens }) {
    const { logo, header, leftCol } = info;

    return (
        <Layout>
            <Header logo={logo} header={header} />
            <LeftCol leftCol={leftCol} />
            <RightCol subScreens={subScreens} />
        </Layout>
    );
};