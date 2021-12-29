import React from 'react';
import dlv from 'dlv';
import Box, { HORIZONTAL } from '../../../../components/box';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import { generateComponent } from '../../../../utils/component';
import { TableContainer, TableHead, TableRow, Table, TableCell, TableSortLabel, TableBody } from '@material-ui/core';

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

// Data received from server
const DATA = [
    {
        userId: "willow_test",
        userStatus: "ACTIVE",
        fullName: "willow_test"
    },
    {
        contactEmail: "roytestuser1@cableco.com",
        userId: "roytestuser1",
        userStatus: "INACTIVE",
        fullName: "roytestuser1"
    },
    {
        contactEmail: "bobuser20@hughes.net",
        firstName: "Bob",
        lastName: "Durgin",
        userId: "bobuser20",
        userStatus: "ACTIVE",
        fullName: "Bob Durgin"
    },
    {
        userId: "tvecableco_3",
        userStatus: "SUSPENDED",
        fullName: "tvecableco_3"
    },
    {
        userId: "peacock4_vp",
        userStatus: "ACTIVE",
        fullName: "peacock4_vp"
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

function stableSort(comparator) {
    const stabilizedThis = DATA.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}

function getSortedData(sortBy, sortOrder) {
    return stableSort(getComparator(sortBy, sortOrder));
}

export default function Users({ info: { filter } = {} }) {
    const [sortBy, setSortBy] = React.useState(null);
    const [sortOrder, setSortOrder] = React.useState(null);

    const handleOnSort = sortByField => () => {
        setSortBy(sortByField);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    const data = sortBy && sortOrder ? getSortedData(sortBy, sortOrder) : DATA;
    const columns = [...DEFAULT_COLUMNS];

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
                {data.length && (
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((d, i) => (
                                    <TableRow key={`tbody-row-${i}`} hover>
                                        {columns.map((c, i) => {
                                            const t = getColumnDetails(c);

                                            return (
                                                <TableCell key={`tbody-cell-${i}`}>
                                                    <Text>{d[t.dataKey]}</Text>
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box>
    )
}