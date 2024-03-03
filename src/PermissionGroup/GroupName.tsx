import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { usePersmissionContext } from '../Context/PermissionsContext';


const GroupName = () => {
    const { permissionState, setPermissionsState } = usePersmissionContext();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Name your permissions group
            </Typography>
            <TextField
                label="Group Name"
                helperText="A descriptive name will help identify it in the future"
                value={permissionState?.groupName}
                onChange={(e) => setPermissionsState((prev: any) => ({ ...prev, groupName: e.target.value }))}
            />
        </>
    )
}

export default GroupName;