import React, { ReactElement, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

import { APP_LABELS } from '../../constants/labels';
import PermissionsApi from '../../__fakeapi__/PermissionsApi';
import { Structures as StructuresType } from '../../types';
import Roles, { ClassificationType } from '../Roles';
import { usePersmissionContext } from '../../Context/PermissionsContext';

const SearchToolBar = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4),
    margin: `${theme.spacing(2)} 0`,
}));

const Structures = (): ReactElement => {
    const [structures, setStructures] = useState<StructuresType>([]);
    const { permissionState } = usePersmissionContext();

    useEffect(() => {
        const fetchStructures = async () => {
            const allStructures = await PermissionsApi.getStructures();
            setStructures(allStructures);
        }
        fetchStructures();
    }, []);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                {APP_LABELS.structures_step.title}
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
                {APP_LABELS.structures_step.helper_text}
            </Typography>
            <SearchToolBar>
                <TextField
                    sx={{ flex: 1 }}
                    label="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
                <Typography variant="body2" gutterBottom>{structures.length}</Typography>
            </SearchToolBar>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell>Structure</TableCell>
                            <TableCell align="right">Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            structures.map((curStructure, index) => {
                                return (
                                    <TableRow
                                        key={`${curStructure}-${index}`}
                                        hover
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={`${curStructure}-${index}`}
                                            scope="row"
                                        >
                                            {curStructure}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Roles classification={ClassificationType.STRUCTURE} name={curStructure} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Structures;