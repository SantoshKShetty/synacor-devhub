import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import dlv from 'dlv';
import Box, { HORIZONTAL } from '../../../../components/box';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import { generateComponent } from '../../../../utils/component';
import { TableContainer, TableHead, TableRow, Table, TableCell, TableSortLabel, TableBody, TablePagination, Select, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import TransferList from '../../../../components/transfer-list';

// To render header/pick data key for sorting, keep a good sort key name etc...
const HEADER_FIELD_DATA_MAP = [
    {
        label: "FULL NAME",
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
        label: "EMAIL",
        sortKey: "CONTACT_EMAIL",
        dataKey: "contactEmail"
    },
    {
        label: "STATUS",
        sortKey: "USER_STATUS",
        dataKey: "userStatus"
    },
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
        d.fullName = d.firstName && d.lastName && `${d.firstName} ${d.lastName}` || d.userId;
        return d;
    })
}

export default function Users({ info: { filter } = {} }) {
    const [sortBy, setSortBy] = React.useState(null);
    const [sortOrder, setSortOrder] = React.useState(null);
    const [columns, setColumns] = React.useState(DEFAULT_COLUMNS);
    const [data, setData] = React.useState(null);
    const [perPage, setPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);

    const usersAPIList = {
        tenantUsersApi: {
            endpoint: `http://tenant-service01.cloudid.ci.opal.synacor.com:4080/orgs/cableco_rt/users?index=${page}&numberOfRecords=${perPage}`,
            params: { method: 'POST' }
        },
        ldapUsersApi: {
            endpoint: sessionStorage.getItem('ldapUsersApiEndpoint'),
            params: {}
        }
    };
    const [usersApi, setUsersApi] = React.useState('tenantUsersApi');

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

    const handleUsersApiChange = event => {
        setUsersApi(event.target.value);
    }

    React.useEffect(() => {
        const { endpoint, params } = usersAPIList[usersApi];

        !endpoint && alert('API Endpoint not set properly!')

        fetch(endpoint, params).then(r => r.json()).then(data => {
            setTotal(data.totalNumberOfRecords);

            setData(
                getSortedData(
                    sortBy,
                    sortOrder,
                    prepareData(data.users)
                )
            );
        }).catch(e => console.log(e))
    }, [page, perPage, usersApi]);

    return (
        <Box style={{ width: '100%' }}>
            <Box type={HORIZONTAL} style={{ justifyContent: 'space-between', paddingBottom: '1.5rem' }}>
                <Box type={HORIZONTAL} style={{ alignItems: 'center' }}>
                    <Box>
                        <Text color="secondary">Users</Text>
                        <Text color="secondary" variant="caption">Manage Users</Text>
                    </Box>
                </Box>
                <Box type={HORIZONTAL}>
                    <Button label="Add User" style={{ paddingLeft: '1rem', paddingRight: '1rem', marginRight: '1rem' }} />
                    <Button label="Import from CSV" style={{ paddingLeft: '1rem', paddingRight: '1rem' }} />
                </Box>
            </Box>
            <Box type={HORIZONTAL}>
                {filter && filter.map((item, key) => (
                    <Box style={{ marginRight: '1rem' }} key={`filter-item-${key}`}>
                        {generateComponent(item)}
                    </Box>
                ))}
            </Box>
            <Box>
                <FormControl>
                    <FormLabel component="legend">Select API to pull Users.</FormLabel>
                    <RadioGroup name="usersApi" value={usersApi} onChange={handleUsersApiChange}>
                        <FormControlLabel value="tenantUsersApi" control={<Radio />} label="Tenant Api" />
                        <FormControlLabel value="ldapUsersApi" control={<Radio />} label="LDAP Api" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((c, i) => {
                                    const t = getColumnDetails(c);

                                    return (
                                        <TableCell key={`thead-cell-${i}`}>
                                            <TableSortLabel onClick={handleOnSort(t.sortKey)} active={sortBy === t.sortKey} direction={sortBy === t.sortKey ? sortOrder : 'asc'}>
                                                <Text variant="h6">{t.label}</Text>
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
                                <TableRow key={`tbody-row-${i}`} hover>
                                    {columns.map((c, i) => {
                                        const t = getColumnDetails(c);

                                        return (
                                            <TableCell key={`tbody-cell-${i}`}>
                                                <Text>{d[t.dataKey]}</Text>
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
                <Box style={{ flexDirection: 'row', justifyContent: 'flex-end' }} pt={3} pb={3}>
                    <Box style={{ width: 'fit-content' }} pr={3}>
                        <Select value={perPage} onChange={handlePerPageChange} autoWidth variant="outlined">
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <Pagination count={Math.ceil(total/perPage)} page={page} onChange={handlePageChange} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}