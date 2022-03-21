import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box, TextField } from '@material-ui/core';
import Text from '../../../components/text';
import { makeStyles } from '../../../provider/theme';
import PrimaryCTABtn from '../../../components/button/primary-cta';
import { exists, isBoolean } from '../../../utils/basics';
import CheckBox from '../../../components/checkbox';
import Heading from '../../../components/custom/heading';

const USER_DETAILS_API = 'http://tenant-service01.cloudid.ci.opal.synacor.com:4080/orgs/cableco_rt/users';

const TABS = ['Profile', 'Account Info', 'Credentials'];

const PARENTAL_CONTROLS_TITLE = {
    adultAccess: 'Adult Access',
    adultPurchase: 'Adult Purchase',
    dvr: 'DVR',
    game: 'Game',
    movie: 'Movie',
    nsfw: 'NSFW',
    spendingLimit: 'Spending Limit',
    trailer: 'Trailer',
    tv: 'TV',
    unrated: 'Unrated'
}

const styles = makeStyles({
    hide: {
        display: 'none'
    },
    fieldSpacer: {
        '& > div': {
            marginTop: '16px',

            '& > *': {
                padding: '8px 0'
            }
        }
    },
    fieldLabel: {
        fontWeight: 700
    },
    internal: {
        marginLeft: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnContainer: {
        padding: '24px 0 8px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    selectedTab: {
        backgroundColor: '#CEE7FF'
    },
    selectedTabHighliter: {
        backgroundColor: '#50667c'
    }
})

const TabPanel = ({ children, ...props }) => {
    return <Box {...props}>{children}</Box>
}

export default function UserDetails(props) {
    const classes = styles();

    const { userid } = useParams();
    const [user, setUser] = React.useState(null);
    const {
        firstName,
        lastName,
        userId,
        contactEmail,
        userStatus,
        userUpdateDate,
        parentalControls,
        accountInfo: { accountId, maxUsersPerAccount, postalCode } = {},
        passwordStatus,
        passwordUpdateDate
    } = user || {};

    const [edit, setEdit] = React.useState(false);
    const [tab, setTab] = React.useState(0);

    const handleEdit = () => setEdit(true);

    const handleSave = () => setEdit(false);

    const handleCancel = () => setEdit(false);

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

    return user && (
        <Box>
            <Box><Heading variant="sectionTitle" label={firstName && lastName && `${firstName} ${lastName}` || userId} /></Box>
            <Box mb={3}><Text color="textSecondary">{contactEmail}</Text></Box>
            <Tabs value={tab} onChange={handleTabChange} TabIndicatorProps={{ className: classes.selectedTabHighliter }}>
                {TABS.map((t, i) => (
                    <Tab label={t} key={`tab-${i}`} {...tab === i && { className: classes.selectedTab }} />
                ))}
            </Tabs>
            <Box className={classes.btnContainer}>
                {edit ? (
                    <React.Fragment>
                        <PrimaryCTABtn label="Save" onClick={handleSave} style={{ maxWidth: '120px', marginRight: 8 }} />
                        <PrimaryCTABtn label="Cancel" onClick={handleCancel} style={{ maxWidth: '120px' }} />
                    </React.Fragment>
                ) : (
                    <PrimaryCTABtn label="Edit" onClick={handleEdit} style={{ maxWidth: '120px' }} />
                )}
            </Box>
            <TabPanel className={cn(classes.fieldSpacer, tab !== 0 && classes.hide)}>
                <Box>
                    <Text className={classes.fieldLabel}>First Name</Text>
                    {edit ? (
                        <TextField value={firstName} />
                    ) : (
                        <Text>{exists(firstName) ? firstName : 'N/A'}</Text>
                    )}
                </Box>
                <Box>
                    <Text className={classes.fieldLabel}>Last Name</Text>
                    {edit ? (
                        <TextField value={lastName} />
                    ) : (
                        <Text>{exists(lastName) ? lastName : 'N/A'}</Text>
                    )}
                </Box>
                {userId && (
                    <Box>
                        <Text className={classes.fieldLabel}>User ID</Text>
                        {edit ? (
                            <TextField value={userId} />
                        ) : (
                            <Text>{userId}</Text>
                        )}
                    </Box>
                )}
                {contactEmail && (
                    <Box>
                        <Text className={classes.fieldLabel}>Contact Email</Text>
                        {edit ? (
                            <TextField value={contactEmail} />
                        ) : (
                            <Text>{contactEmail}</Text>
                        )}
                    </Box>
                )}
                {userStatus && (
                    <Box>
                        <Text className={classes.fieldLabel}>User Status</Text>
                        {edit ? (
                            <TextField value={userStatus} />
                        ) : (
                            <Text>{userStatus}</Text>
                        )}
                    </Box>
                )}
                {userUpdateDate && (
                    <Box>
                        <Text className={classes.fieldLabel}>User Update Date</Text>
                        {edit ? (
                            <TextField value={userUpdateDate} />
                        ) : (
                            <Text>{userUpdateDate}</Text>
                        )}
                    </Box>
                )}
                {parentalControls && (
                    <Box>
                        <Text className={classes.fieldLabel}>Parental Controls</Text>
                        {Object.entries(parentalControls).map(([key, value], i) => (
                            <Box key={`fragment-key-${i}`} className={classes.internal}>
                                <Text className={classes.fieldLabel}>
                                    {PARENTAL_CONTROLS_TITLE[key] || key}
                                </Text>
                                {edit ? (
                                    isBoolean(value) ? <CheckBox value={value} defaultChecked={value} /> : <TextField value={value} />
                                ) : (
                                    isBoolean(value) ? <CheckBox value={value} defaultChecked={value} disabled /> : <Text>{exists(value) ? value : 'N/A'}</Text>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}
            </TabPanel>
            <TabPanel className={cn(classes.fieldSpacer, tab !== 1 && classes.hide)}>
                {accountId && (
                    <Box>
                        <Text className={classes.fieldLabel}>Account ID</Text>
                        {edit ? (
                            <TextField value={accountId} />
                        ) : (
                            <Text>{accountId}</Text>
                        )}
                    </Box>
                )}
                {maxUsersPerAccount && (
                    <Box>
                        <Text className={classes.fieldLabel}>Max. users per account</Text>
                        {edit ? (
                            <TextField value={maxUsersPerAccount} />
                        ) : (
                            <Text>{maxUsersPerAccount}</Text>
                        )}
                    </Box>
                )}
                {postalCode && (
                    <Box>
                        <Text className={classes.fieldLabel}>Postal Code</Text>
                        {edit ? (
                            <TextField value={postalCode} />
                        ) : (
                            <Text>{postalCode}</Text>
                        )}
                    </Box>
                )}
            </TabPanel>
            <TabPanel className={cn(classes.fieldSpacer, tab !== 2 && classes.hide)}>
                {passwordStatus && (
                    <Box>
                        <Text className={classes.fieldLabel}>Password Status</Text>
                        {edit ? (
                            <TextField value={passwordStatus} />
                        ) : (
                            <Text>{passwordStatus}</Text>
                        )}
                    </Box>
                )}
                {passwordUpdateDate && (
                    <Box>
                        <Text className={classes.fieldLabel}>Password Update Date</Text>
                        {edit ? (
                            <TextField value={passwordUpdateDate} />
                        ) : (
                            <Text>{passwordUpdateDate}</Text>
                        )}
                    </Box>
                )}
            </TabPanel>
        </Box>
    );
}