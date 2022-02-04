import React from "react";
import Box, { HORIZONTAL } from "../../components/box";
import { makeStyles } from '../../provider/theme';
import { generateComponent, composeComponents } from '../../utils/component';
import { useScreen } from "../../provider/screen";
import { findMatchingRoute } from "../../utils/route";
import { exists } from "../../utils/basics";
import DescriptorLoader from '../../enhancers/descriptor-loader';

const Header = ({ logo, header: { menus } = {} }) => (
    <React.Fragment>
        {logo && (
            <Box>
                {generateComponent(logo)}
            </Box>
        )}
        <Box direction={HORIZONTAL}>
            {menus && menus.map((m, i) => generateComponent({
                ...m,
                key: `dashboard-header-menu-${i}`
            }))}
        </Box>
    </React.Fragment>
)


const leftColStyles = makeStyles({
    accordion: {}
});

const LeftCol = ({ leftCol = [] }) => {
    const classes = leftColStyles();

    return leftCol.map(
        (item, i) => generateComponent({
            ...item,
            key: `dashboard-left-col-item-${i}`,
            className: classes.accordion
        })
    );
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