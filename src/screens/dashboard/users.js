import React from 'react';
import Box, { HORIZONTAL } from '../../components/box';
import { TableContainer, Table, TableBody, TableRow, TableCell, TableHead, IconButton } from '@material-ui/core';
import Text from '../../components/text';
import Button from '../../components/button';
import FilterList from '@material-ui/icons/FilterList';

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

export default function Users() {
    return (
        <Box style={{ width: 824 }}>
            <Box type={HORIZONTAL} style={{ justifyContent: 'space-between', paddingBottom: '1.5rem' }}>
                <Box type={HORIZONTAL}>
                    <Box>
                        <Text color="secondary">Users</Text>
                        <Text color="secondary" variant="caption">Manage Users</Text>
                    </Box>
                    <IconButton>
                        <FilterList color="secondary" />
                    </IconButton>
                </Box>
                <Box type={HORIZONTAL}>
                    <Button label="Add User" />
                    <Button label="Import from CSV" />
                </Box>
            </Box>
            <Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Text color="secondary">FULL NAME AND USERNAME</Text>
                                </TableCell>
                                <TableCell>
                                    <Text color="secondary">PRIMARY EMAIL</Text>
                                </TableCell>
                                <TableCell>
                                    <Text color="secondary">STATUS</Text>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DATA.map(({ fullName, userName, email, status }, i) => (
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