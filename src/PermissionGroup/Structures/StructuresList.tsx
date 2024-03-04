import React, { ChangeEvent } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Structures as StructuresType } from '../../types';
import Roles, { ClassificationType } from '../Roles';
import { StructuresContextData, usePersmissionContext } from '../../Context/PermissionsContext';
import { getUpdatedStructuresData } from './utils';

interface ListProps {
    structuresToDsiplay: StructuresType
}

const StructuresList = ({ structuresToDsiplay }: ListProps) => {
    const { permissionState, setPermissionsState } = usePersmissionContext();

    const headerChecked = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        let updatedStructuresData = permissionState?.structuresData as StructuresContextData;
        structuresToDsiplay.forEach((structureName) => {
            updatedStructuresData = getUpdatedStructuresData(
                updatedStructuresData,
                {
                    structureName: structureName,
                    propertyName: 'isSelected',
                    propertyValue: checked
                }
            );
        });
        setPermissionsState((prev) => ({ ...prev, structuresData: updatedStructuresData }));
    }

    const handleSingleCellToggled = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const updatedStructuresData = getUpdatedStructuresData(
            permissionState?.structuresData as StructuresContextData,
            {
                structureName: event.target.name,
                propertyName: 'isSelected',
                propertyValue: checked
            }
        );
        setPermissionsState((prev) => ({ ...prev, structuresData: updatedStructuresData }));
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                onChange={headerChecked}
                            />
                        </TableCell>
                        <TableCell>Structure</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        structuresToDsiplay.map((curStructure, index) => {
                            return (
                                <TableRow
                                    key={`${curStructure}-${index}`}
                                    hover
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            name={curStructure}
                                            color="primary"
                                            onChange={handleSingleCellToggled}
                                            checked={permissionState?.structuresData[curStructure]?.isSelected}
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
    )
}

export default StructuresList;