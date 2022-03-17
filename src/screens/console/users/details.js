import React from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const USER_DETAILS_API = 'http://tenant-service01.cloudid.ci.opal.synacor.com:4080/orgs/cableco_rt/users';

const TABS = [
    { title: "Profile", content: [
        { title: "First Name", dKey: "firstName" },
        { title: "First Name", dKey: "lastName" },
        { title: "First Name", dKey: "userId" },
        { title: "First Name", dKey: "userStatus" },
        { title: "First Name", dKey: "userUpdateDate" },
        { title: "First Name", dKey: "contactEmail" },
        { title: "First Name", dKey: "parentalControls" }
    ]},
    { title: "Account Info", content: [

    ]},
    { title: "Password", content: [

    ]}
];

export default function UserDetails(props) {
    const { userid } = useParams();
    const [user, setUser] = React.useState(null);
    const [edit, setEdit] = React.useState(false);
    const [tab, setTab] = React.useState(0);

    const handleEdit = () => setEdit(true);

    const handleClose = () => setEdit(false);

    const handleTabChange = (event, val) => setTab(val);

    React.useEffect(() => {
        fetch(`${USER_DETAILS_API}/${userid}`).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(data => {
            setUser(data);
        }).catch(e => {
            console.log(e.message)
        });
    }, []);

    console.log(user)

    return user && (
        <React.Fragment>
            <Tabs value={tab} onChange={handleTabChange}>
                <Tab label="Profile" />
                <Tab label="Account Info" />
                <Tab label="Three" />
            </Tabs>
        </React.Fragment>
    );
}