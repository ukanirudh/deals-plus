import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { APP_LABELS } from '../../constants/labels';
import PermissionsApi from '../../__fakeapi__/PermissionsApi';
import { User as UserType } from '../../types';
import Switch from '@mui/material/Switch';
import { usePersmissionContext } from '../../Context/PermissionsContext';


const Members = (): ReactElement => {
    const { permissionState, setPermissionsState } = usePersmissionContext();
    const [users, setUsers] = useState<Array<UserType>>([]);

    useEffect(() => {
        const fetchStructures = async () => {
            const allUsers = await PermissionsApi.getUsers();
            setUsers(allUsers);
        }
        fetchStructures();
    }, []);

    const handleToggle = (event: ChangeEvent<HTMLInputElement>, userEmail: string) => {
        const curUsers = permissionState?.users || {};
        const updatedUsers = { ...curUsers, [userEmail]: event.target.checked }
        setPermissionsState((prev: any) => ({ ...prev, users: updatedUsers }))
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                {APP_LABELS.members_step.title}
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
                {APP_LABELS.members_step.helper_text}
            </Typography>
            {
                <List disablePadding sx={{}}>
                    {users.map((user) => {
                        return (
                            <ListItem
                                key={`${user.email}-${user.user}`}
                                secondaryAction={
                                    <Switch
                                        edge="end"
                                        onChange={(e) => handleToggle(e, user.email)}
                                        checked={permissionState?.users[user.email] || false}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemText id={`${user.email}-${user.user}`} primary={user.user} secondary={`${user.email}.${user.organisation}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            }
        </>
    )
}

export default Members;