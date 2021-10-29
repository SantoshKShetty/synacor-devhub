import React from "react";
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

const Header = ({ logo }) => (
    <Box type={HORIZONTAL} style={{ alignItems: "center", justifyContent: 'space-between', padding: '0 32px' }}>
        <Box>
            <BrandLogo logo={logo} />
        </Box>
        <Box style={{ border: '1px solid #D8D8D8', flexGrow: 1, maxWidth: 650 }}>
            <SearchBox />
        </Box>
        <Box type={HORIZONTAL}></Box>
    </Box>
);


// const Acc = () => ()

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
            {Object.entries(options).map(([title, contents], key) => {
                return (
                    <Accordion key={key}>
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

const RightCol = () => null

export default function DashboardScreen({ genericInfo, Layout }) {
    return (
        <Layout genericInfo={genericInfo}>
            <Header />
            <LeftCol />
            <RightCol />
        </Layout>
    );
};