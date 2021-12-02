import React from 'react';
import Box, { HORIZONTAL } from '../../../../components/box';
import { TableContainer, Table, TableBody, TableRow, TableCell, TableHead, IconButton, TableSortLabel } from '@material-ui/core';
import Text from '../../../../components/text';
import Button from '../../../../components/button';

function createData(fullName, userName, email, status) {
    return { fullName, userName, email, status }
}

const DATA = [
    createData('John Doe', 'Joedaa', 'joe@cableco.zimbra.cloud', 'Active'),
    createData('Robert Lastname', 'Robbiee', 'rob@xyz.com', 'Active'),
    createData('Joe Kayle', 'Joe', 'jk@xyz.com', 'Inactive'),
    createData('Aston Martin', 'Martin', 'amart@xyz.com', 'Active'),
    createData('John Doe', 'Joedaa', 'joe@cableco.zimbra.cloud', 'Active'),
    createData('Robert Lastname', 'Robbiee', 'rob@xyz.com', 'Active'),
    createData('Joe Kayle', 'Joe', 'jk@xyz.com', 'Inactive'),
    createData('Aston Martin', 'Martin', 'amart@xyz.com', 'Supsended'),
    createData('John Doe', 'Joedaa', 'joe@cableco.zimbra.cloud', 'Active'),
    createData('Robert Lastname', 'Robbiee', 'rob@xyz.com', 'Active'),
    createData('Joe Kayle', 'Joe', 'jk@xyz.com', 'Inactive'),
    createData('Aston Martin', 'Martin', 'amart@xyz.com', 'Active'),
    createData('John Doe', 'Joedaa', 'joe@cableco.zimbra.cloud', 'Active'),
    createData('Robert Lastname', 'Robbiee', 'rob@xyz.com', 'Active'),
    createData('Joe Kayle', 'Joe', 'jk@xyz.com', 'Inactive'),
    createData('Aston Martin', 'Martin', 'amart@xyz.com', 'Active')
];

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
    return sortOrder === 'desc'
        ? (a, b) => descendingComparator(a, b, sortBy)
        : (a, b) => -descendingComparator(a, b, sortBy);
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

export default function Users() {
    const [sortBy, setSortBy] = React.useState('fullName');
    const [sortOrder, setSortOrder] = React.useState('asc');

    const handleOnSort = sortByField => () => {
        setSortBy(sortByField);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    const data = getSortedData(sortBy, sortOrder);

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
            <Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel onClick={handleOnSort('fullName')} active={sortBy === 'fullName'} direction={sortBy === 'fullName' ? sortOrder : 'asc'}>
                                        <Text color="secondary">FULL NAME AND USERNAME</Text>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel onClick={handleOnSort('email')} active={sortBy === 'email'} direction={sortBy === 'email' ? sortOrder : 'asc'}>
                                        <Text color="secondary">PRIMARY EMAIL</Text>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel onClick={handleOnSort('status')} active={sortBy === 'status'} direction={sortBy === 'status' ? sortOrder : 'asc'}>
                                        <Text color="secondary">STATUS</Text>
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(({ fullName, userName, email, status }, i) => (
                                <TableRow key={`table-row-${i}`} hover>
                                    <TableCell>
                                        <Box>
                                            <Text>{fullName}</Text>
                                            <Text color="secondary" variant="caption">{userName}</Text>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{email}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{status}</Text>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}