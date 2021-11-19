import React from "react";
import Box, { HORIZONTAL } from "../../components/box";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Apps from '@material-ui/icons/Apps';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '../../provider/theme';
import { generateComponent, composeComponents } from '../../utils/component';
import { useScreen } from "../../provider/screen";
import { findMatchingRoute } from "../../utils/route";
import { exists } from "../../utils/basics";
import DescriptorLoader from '../../enhancers/descriptor-loader';

const HelpMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <IconButton onClick={handleClick}>
                <HelpOutline />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} getContentAnchorEl={null} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MenuItem onClick={handleClose}>Help Center</MenuItem>
                <MenuItem onClick={handleClose}>Developer Documentation</MenuItem>
                <MenuItem onClick={handleClose}>Training</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

const AppMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <IconButton onClick={handleClick}>
                <Apps />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} getContentAnchorEl={null} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MenuItem onClick={handleClose}>End-user dashboard</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <IconButton onClick={handleClick}>
                <Box style={{ border: '1px solid', borderRadius: '50%', padding: 5, boxSizing: 'border-box', fontSize: '1rem' }}>JD</Box>
                {anchorEl ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} getContentAnchorEl={null} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MenuItem onClick={handleClose}>User Name</MenuItem>
                <MenuItem onClick={handleClose}>User Email</MenuItem>
                <MenuItem onClick={handleClose}>hbo.synacor.com(link to End-user dashboard)</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Sign out</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

const headerStyles = makeStyles(
    ({ spacing }) => ({
        header: {
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${spacing(4)}px`
        }
    })
);

const Header = ({ logo, header }) => {
    const classes = headerStyles();

    return (
        <Box type={HORIZONTAL} className={classes.header}>
            {logo && (
                <Box>
                    {generateComponent(logo)}
                </Box>
            )}
            <Box type={HORIZONTAL} style={{ alignItems: "center" }}>
                <Box><HelpMenu /></Box>
                <Box><AppMenu /></Box>
                <Box><UserMenu /></Box>
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
            {leftCol.map(item => generateComponent({ ...item, className: classes.accordion }))}
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