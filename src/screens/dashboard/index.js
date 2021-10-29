import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import Box, { HORIZONTAL } from "../../components/box";
import BrandLogo from '../../components/brand-logo';
import InputBase from "@material-ui/core/InputBase";

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
)

const LeftCol = () => null;

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