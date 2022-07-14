import React from 'react';
import { makeStyles } from '../../provider/theme';
import Accordion from '../accordion';

const styles = makeStyles(
    ({ palette, spacing, typography }) => ({
        accordionMenu: {
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
                    fontWeight: typography.fontWeightRegular,
                    color: palette.custom.layout.console.leftCol.accordion.summary.color,

                    '& > .MuiTypography-body1': {
                        fontSize: 'inherit',
                        fontWeight: 'inherit'
                    }
                }
            },

            '& .MuiAccordionDetails-root': {
                padding: 'revert',
                display: 'block',

                '& > ul': {
                    margin: 0,
                    padding: 0,
                    listStyleType: 'none',

                    '& > li > a': {
                        fontFamily: typography.fontFamily,
                        fontSize: typography.fontSize,
                        fontWeight: typography.fontWeightMedium,
                        color: palette.text.primary,
                        display: 'block',
                        borderRadius: `${spacing(1)}px`,
                        padding: `${spacing(1)}px ${spacing(2)}px`,
                        textDecoration: 'none',

                        '&:hover': {
                            backgroundColor: palette.custom.layout.console.leftCol.accordion.content.bgColorHover
                        },

                        '&.activeLink': {
                            backgroundColor: palette.custom.layout.console.leftCol.accordion.content.bgColorActive
                        }
                    }
                }
            }
        }
    })
);

export default function AccordionMenu(props) {
    const classes = styles();
    return <Accordion {...props} className={classes.accordionMenu} />
}