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

const LeftCol = ({ leftCol, classes }) => generateComponent(leftCol, {
    classes,
    keyPrefix: 'dashboard-left-col-item'
});

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

const styles = makeStyles(
    ({ palette, spacing, typography }) => ({
        leftColAccordion: {
            boxShadow: 'none',

            '&:before': {
                content: 'none'
            },

            '&.Mui-expanded': {
                margin: 'revert',
                marginBottom: `${spacing(2)}px`
            },

            '& > .MuiAccordionSummary-root': {
                '&.Mui-expanded': {
                    minHeight: 'revert',

                    '& > .MuiAccordionSummary-content.Mui-expanded': {
                        margin: 'revert'
                    }
                },

                '& > .MuiAccordionSummary-content': {
                    fontSize: typography.fontSize,
                    fontWeight: typography.fontWeightLight,
                    color: palette.custom.dashboardLayout.leftCol.accordion.text.color,

                    '& > .MuiTypography-body1': {
                        fontSize: 'inherit'
                    }
                }
            },

            '& > .MuiCollapse-root': {
                '& .MuiAccordionDetails-root': {
                    padding: 'revert',
                    display: 'block',

                    '& > ul': {
                        margin: 0,
                        padding: 0,
                        listStyleType: 'none',

                        '& > li > a': {
                            fontSize: typography.fontSize,
                            fontWeight: typography.fontWeightMedium,
                            color: palette.custom.dashboardLayout.leftCol.accordion.link.color,
                            display: 'block',
                            borderRadius: `${spacing(1)}px`,
                            padding: `${spacing(1)}px ${spacing(2)}px`,
                            textDecoration: 'none',

                            '&:hover': {
                                backgroundColor: '#EEEEEE'
                            },

                            '&.activeLink': {
                                backgroundColor: '#CEE7FF'
                            }
                        }
                    }
                }
            }
        }
    })
);

export default function DashboardScreen({ info, Layout, subScreens }) {
    const classes = styles();
    const { logo, header, leftCol } = info;

    return (
        <Layout>
            <Header logo={logo} header={header} />
            <LeftCol leftCol={leftCol} classes={classes} />
            <RightCol subScreens={subScreens} />
        </Layout>
    );
};