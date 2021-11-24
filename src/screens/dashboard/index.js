import React from "react";
import Box, { HORIZONTAL } from "../../components/box";
import { makeStyles } from '../../provider/theme';
import { generateComponent, composeComponents } from '../../utils/component';
import { useScreen } from "../../provider/screen";
import { findMatchingRoute } from "../../utils/route";
import { exists } from "../../utils/basics";
import DescriptorLoader from '../../enhancers/descriptor-loader';

const headerStyles = makeStyles(
    ({ spacing }) => ({
        header: {
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${spacing(4)}px`
        }
    })
);

const Header = ({ logo, header: { menus } = {} }) => {
    const classes = headerStyles();

    return (
        <Box type={HORIZONTAL} className={classes.header}>
            {logo && (
                <Box>
                    {generateComponent(logo)}
                </Box>
            )}
            <Box type={HORIZONTAL}>
                {menus && menus.map((m, i) => generateComponent({
                    ...m,
                    key: `dashboard-header-menu-${i}`
                }))}
            </Box>
        </Box>
    );
}


const leftColStyles = makeStyles(
    ({ spacing }) => ({
        leftCol: {
            padding: `${spacing(2)}px ${spacing(1)}px`
        },
        accordion: {}
    })
);

const LeftCol = ({ leftCol = [] }) => {
    const classes = leftColStyles();

    return (
        <Box className={classes.leftCol}>
            {leftCol.map((item, i) => generateComponent({
                ...item,
                key: `dashboard-left-col-item-${i}`,
                className: classes.accordion
            }))}
        </Box>
    )
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