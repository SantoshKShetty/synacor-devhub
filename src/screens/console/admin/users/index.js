import React from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import dlv from 'dlv';
import Box, { HORIZONTAL } from '../../../../components/containers/box';
import Text from '../../../../components/text';
import { generateComponent } from '../../../../utils/component';
import { TableContainer, TableHead, TableRow, Table, TableCell, TableSortLabel, TableBody, Select, MenuItem, makeStyles, InputAdornment } from '@material-ui/core';
import TransferList from '../../../../components/transfer-list';
import TextField from '../../../../components/textfield';
import { debounce } from "debounce";
import { isEmail, exists } from '../../../../utils/basics';
import CheckBox from '../../../../components/checkbox';
import IconButton from '../../../../components/button/icon';
import SearchIcon from '@material-ui/icons/Search';
import PrimaryBtn from '../../../../components/button/primary';
import CLIENTS from '../../../../constants/clients';
import { getCompNameFromSession, useAuth } from '../../../../provider/auth';

// To render header/pick data key for sorting, keep a good sort key name etc...
const HEADER_FIELD_DATA_MAP = [
    {
        label: "FULL NAME AND USERNAME",
        sortKey: "FULL_NAME",
        dataKey: "fullName"
    },
    {
        label: "FIRST NAME",
        sortKey: "FIRST_NAME",
        dataKey: "firstName"
    },
    {
        label: "LAST NAME",
        sortKey: "LAST_NAME",
        dataKey: "lastName"
    },
    {
        label: "USER ID",
        sortKey: "USER_ID",
        dataKey: "userId"
    },
    {
        label: "PRIMARY EMAIL",
        sortKey: "CONTACT_EMAIL",
        dataKey: "contactEmail"
    },
    {
        label: "STATUS",
        sortKey: "USER_STATUS",
        dataKey: "userStatus"
    },
    {
        label: "USER UPDATE DATE",
        sortKey: "USER_UPD_DATE",
        dataKey: "userUpdateDate"
    },
    {
        label: "PASSWORD STATUS",
        sortKey: "PWD_STATUS",
        dataKey: "passwordStatus"
    },
    {
        label: "PASSWORD UPDATE DATE",
        sortKey: "PWD_UPD_DATE",
        dataKey: "passwordUpdateDate"
    }
];

const DEFAULT_COLUMNS = ['FULL_NAME', 'CONTACT_EMAIL', 'USER_STATUS'];

const getColumnDetails = key => HEADER_FIELD_DATA_MAP.find(f => f.sortKey === key);

function descendingComparator(a, b, sortBy) {
    if (b[sortBy] < a[sortBy]) {
        return -1;
    }
    if (b[sortBy] > a[sortBy]) {
        return 1;
    }

    return 0;
}

function getComparator(sortBy, sortOrder) {
    const dataSortKey = dlv(HEADER_FIELD_DATA_MAP.find(h => h.sortKey === sortBy), 'dataKey');

    return sortOrder === 'desc'
        ? (a, b) => descendingComparator(a, b, dataSortKey)
        : (a, b) => -descendingComparator(a, b, dataSortKey);
}

function stableSort(comparator, data) {
    const stabilizedThis = data.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}

function getSortedData(sortBy, sortOrder, data) {
    return stableSort(getComparator(sortBy, sortOrder), data);
}

function prepareData(data) {
    return data.map(d => {
        if (!exists(d.firstName)) d.firstName = d.username

        if (!exists(d.lastName)) d.lastName = d.username

        if (!exists(d.userId)) d.userId = d.username;

        if (!exists(d.fullName)) d.fullName = d.firstName && d.lastName && `${d.firstName} ${d.lastName}` || d.userId;

        if (!exists(d.userStatus)) d.userStatus = d.attributes?.userStatus?.pop()

        return d;
    })
}

const styles = makeStyles(
    () => ({
        userTable: {
            '& .MuiTableCell-root': {
                padding: 8
            }
        },
        usrRow: {
            cursor: 'pointer'
        },
        firstCell: {
            border: 'none',
            width: 42
        }
    })
)

export default function AdminUsersList({ screenInfo: { filter } = {} }) {
    const classes = styles();
    const [sortBy, setSortBy] = React.useState(null);
    const [sortOrder, setSortOrder] = React.useState(null);
    const [columns, setColumns] = React.useState(DEFAULT_COLUMNS);
    const [data, setData] = React.useState(null);
    const [perPage, setPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);
    const [searchParams, setSearchParams] = React.useState({ username: null, contactEmail: null });
    const [error, setError] = React.useState(null);
    const history = useHistory();
    const { getAccessToken, getRefreshToken } = useAuth();

    const handleOnSort = sortByField => () => {
        setSortBy(sortByField);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    const handlePageChange = (event, value) => {
        setData(null);
        setPage(value);
    };

    const handlePerPageChange = event => {
        setData(null);
        setPage(1);
        setPerPage(event.target.value);
    }

    const handleUserSearch = debounce(event => {
        const value = event.target?.value?.trim();

        setData(null);

        if (!value) {
            setSearchParams({ username: null, contactEmail: null })
        } else if ('{{CLIENT}}' !== CLIENTS.SXM.NAME && isEmail(value)) {
            setSearchParams({ username: null, contactEmail: value })
        } else {
            setSearchParams({ username: value, contactEmail: null })
        }
    }, 1000);

    const handleUserClick = userid => () => {
        history.push(`/admin/users/${userid}`);
    }

    const handleSelectUser = event => {
        event.stopPropagation()
    }

    React.useEffect(() => {
        setError(null);

        const paginationParams = '{{CLIENT}}' !== CLIENTS.SXM.NAME ? [
            !searchParams.username && !searchParams.contactEmail && `index=${page === 1 ? 0 : page}`,
            !searchParams.username && !searchParams.contactEmail &&`numberOfRecords=${perPage}`,
        ].filter(Boolean) : [];

        const params = [
            ...paginationParams,
            searchParams.username && `username=${searchParams.username}`,
            searchParams.contactEmail && `contactEmail=${searchParams.contactEmail}`
        ].filter(Boolean).join('&');

        const apiUrl = `{{CLOUD_ID_API}}/tenants/${getCompNameFromSession()}/users?${params}`;

        params && fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                accessToken: getAccessToken(),
                refreshToken: getRefreshToken()
            }
        }).then(r => r.json()).then(({ users = [], totalNumberOfRecords, message }) => {
            setTotal(exists(totalNumberOfRecords) ? totalNumberOfRecords : users.length);

            if (message) {
                setError(message);
            } else {
                setData(
                    getSortedData(
                        sortBy,
                        sortOrder,
                        prepareData(users)
                    )
                );
            }
        }).catch(e => {
            setError(e.message)
        })
    }, [page, perPage, searchParams]);

    return (
        <Box style={{ width: '100%' }}>
            <Box direction={HORIZONTAL} style={{ justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0 0 0 60px' }}>
                <Box direction={HORIZONTAL} style={{ alignItems: 'center' }}>
                    <Box>
                        <Text style={{
                            color: '#4A4A4A',
                            fontWeight: 300,
                            fontSize: '24px'
                        }}>Users</Text>
                        <Text style={{
                            color: '#888888',
                            fontSize: '14px'
                        }}>Manage Users</Text>
                    </Box>
                </Box>
                <Box direction={HORIZONTAL}>
                    <PrimaryBtn routeTo="/admin/users/add" label="Add User" style={{ marginRight: '1rem', width: 'auto', height: '40px' }} />
                    <PrimaryBtn label="Import from CSV" style={{ width: 'auto', height: '40px' }} />
                </Box>
            </Box>
            <Box direction={HORIZONTAL} style={{ marginBottom: '0.5rem', padding: '0 0 0 60px' }}>
                <Box style={{ marginRight: '1rem' }}>
                    <TextField label="Search" variant="outlined" size="small" onKeyUp={handleUserSearch} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton style={{padding: 0}}><SearchIcon /></IconButton>
                            </InputAdornment>
                        )}}/>
                </Box>
                {filter && filter.map((item, key) => (
                    <Box style={{ marginRight: '1rem' }} key={`filter-item-${key}`}>
                        {generateComponent(item)}
                    </Box>
                ))}
            </Box>
            <Box>
                {error ? (
                    <Box style={{ padding: '0 0 0 60px' }}>
                        <Text color="error" variant="body2">{error}</Text>
                    </Box>
                ) : !exists(data) && '{{CLIENT}}' === CLIENTS.SXM.NAME ? (
                    <Box style={{ padding: '0 0 0 60px' }}>
                        <Text color="textSecondary" variant="body2">Enter something to find the user</Text>
                    </Box>
                ) : (
                    <TableContainer className={classes.userTable}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.firstCell}>
                                        <CheckBox color="primary" />
                                    </TableCell>
                                    {columns.map((c, i) => {
                                        const t = getColumnDetails(c);

                                        return (
                                            <TableCell key={`thead-cell-${i}`}>
                                                <TableSortLabel onClick={handleOnSort(t.sortKey)} active={sortBy === t.sortKey} direction={sortBy === t.sortKey ? sortOrder : 'asc'}>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        fontWeight: 300,
                                                        color: sortBy === t.sortKey ? '#003C79' : '#888888'
                                                    }}>{t.label}</Text>
                                                </TableSortLabel>
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="right">
                                        <TransferList
                                            title="Column Selector"
                                            items={HEADER_FIELD_DATA_MAP.map(({ label, sortKey }) => ({ label, key: sortKey  }))}
                                            selected={columns}
                                            defaultValue={DEFAULT_COLUMNS}
                                            onApply={setColumns}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data ? data.map((d, i) => (
                                    <TableRow key={`tbody-row-${i}`} hover onClick={handleUserClick(d['userId'])} className={classes.usrRow}>
                                        <TableCell className={classes.firstCell}>
                                            <CheckBox color="primary" onClick={handleSelectUser} />
                                        </TableCell>
                                        {columns.map((c, i) => {
                                            const t = getColumnDetails(c);

                                            return (
                                                <TableCell key={`tbody-cell-${i}`}>
                                                    <Text>{d[t.dataKey]}</Text>
                                                    {c === 'FULL_NAME' && <Text style={{ fontSize: '12px', color: '#888888' }}>{d['username']}</Text>}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + 1} align="center">Loading...</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Box style={{ flexDirection: 'row', justifyContent: 'flex-end' }} pt={3} pb={3}>
                    {total > 0 && (<Box style={{ width: 'fit-content' }} pr={3}>
                        <Select value={perPage} onChange={handlePerPageChange} autoWidth variant="outlined">
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                        </Select>
                    </Box>)}
                    {total > 0 && (<Box>
                        <Pagination count={Math.ceil(total/perPage)} page={page} onChange={handlePageChange} />
                    </Box>)}
                </Box>
            </Box>
        </Box>
    )
}