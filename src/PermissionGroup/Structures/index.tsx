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


import { APP_LABELS } from '../../constants/labels';
import PermissionsApi from '../../__fakeapi__/PermissionsApi';
import { Structures as StructuresType } from '../../types';
import Roles, { ClassificationType } from '../Roles';
import { usePersmissionContext } from '../../Context/PermissionsContext';

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