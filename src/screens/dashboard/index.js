import React from "react";
import { useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import Box, { HORIZONTAL } from "../../components/box";
import BrandLogo from '../../components/brand-logo';
import InputBase from "@material-ui/core/InputBase";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Text from '../../components/text';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Apps from '@material-ui/icons/Apps';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import Users from "./users";
import Link from '../../components/link';

const SearchBox = () => (
    <Box type={HORIZONTAL} style={{ alignItems: 'center', padding: '0 10px', height: 36 }}>
        <SearchIcon />
        <InputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            style={{ marginLeft: 15 }}
        />
    </Box>
);

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

const Header = ({ logo }) => (
    <Box type={HORIZONTAL} style={{ alignItems: "center", justifyContent: 'space-between', padding: '0 32px' }}>
        <Box>
            <BrandLogo logo={logo} />
        </Box>
        <Box style={{ border: '1px solid #D8D8D8', flexGrow: 1, maxWidth: 650 }}>
            <SearchBox />
        </Box>
        <Box type={HORIZONTAL} style={{ alignItems: "center" }}>
            <Box><HelpMenu /></Box>
            <Box><AppMenu /></Box>
            <Box><UserMenu /></Box>
        </Box>
    </Box>
);

const LeftCol = () => {
    const options = {
        "Dashboard": [
            "Dashboard", "Tasks", "Notifications", "Getting Started"
        ],
        "Directory": [
            "Users", "Groups", "Attributes", "Directory Integrations"
        ],
        "Customization": [
            "Brading", "Sign-in page editor", "Email", "SMS"
        ],
        "Applications": [
            "Applications"
        ],
        "Security": [
            "Authentication", "Multifactor", "Administrators"
        ],
        "Reports": [
            "Reports", "Logs"
        ],
        "Settings": [
            "Account", "Downloads"
        ]
    };

    return (
        <Box>
            <Link href="/dashboard/users" label="Users" />
            {Object.entries(options).map(([title, contents], key) => {
                return (
                    <Accordion key={`accordian-${key}`}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Text>{title}</Text>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {contents.map((item, k) => (
                                    <ListItem key={`${key}-${k}`}>
                                        <ListItemText>{item}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
};

const RightCol = () => {
    const { view } = useParams();
    switch(view) {
        case 'users':
            return <Users />
        default:
            return null;
    }
}

export default function DashboardScreen({ genericInfo, Layout }) {
    return (
        <Layout genericInfo={genericInfo}>
            <Header />
            <LeftCol />
            <RightCol />
        </Layout>
    );
};