import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Roles as RolesType, AllRoles } from '../types';
import permissionsApi from '../__fakeapi__/PermissionsApi';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { usePersmissionContext } from '../Context/PermissionsContext';

export enum ClassificationType {
    STRUCTURE = 'STRUCTURE',
    ENTITY = 'ENTITY'
}

interface RolesProps {
    classification: ClassificationType;
    name: string;
}

const Roles = ({ classification, name }: RolesProps): ReactElement => {
    const { setPermissionsState, permissionState } = usePersmissionContext();
    const curStructuresData = permissionState?.structuresData || {};
    const currentRole = curStructuresData[name]?.selectedRole;

    const [roles, setRoles] = useState<RolesType>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        selectedRole: AllRoles,
    ) => {
        const updatedStrutures = { ...curStructuresData, [name]: { ...curStructuresData[name], selectedRole } }
        setPermissionsState((prev) => ({ ...prev, structuresData: updatedStrutures }))
        setAnchorEl(null);
    };

    const fetchRoles = useCallback(async () => {
        let fetchedRoles: RolesType = [];
        if (classification === ClassificationType.ENTITY) {
            fetchedRoles = await permissionsApi.getRolesForEntity(name);
        } else if (classification === ClassificationType.STRUCTURE) {
            fetchedRoles = await permissionsApi.getRolesForStructure(name);
        }
        setRoles(fetchedRoles);
    }, [setRoles]);

    useEffect(() => {
        if (classification && name) {
            fetchRoles();
        }
    }, [fetchRoles, classification, name]);

    return (
        <>
            <List component="nav" sx={{ maxWidth: 160, float: 'right' }}>
                <ListItemButton onClick={handleClickListItem}>
                    <ListItemText primary={currentRole} />
                    <ExpandMore />
                </ListItemButton>
            </List>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                }}
            >
                {roles.map((curRole) => (
                    <MenuItem
                        key={curRole}
                        selected={currentRole === curRole}
                        onClick={(event) => handleMenuItemClick(event, curRole)}
                    >
                        {curRole}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default Roles;