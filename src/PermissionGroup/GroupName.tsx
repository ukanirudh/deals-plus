import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { usePersmissionContext } from '../Context/PermissionsContext';
import { styled } from '@mui/material/styles';

const GroupNameDiv = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

const GroupName = () => {
    const { permissionState, setPermissionsState } = usePersmissionContext();
    return (
        <GroupNameDiv>
            <div>
                <Typography variant="h6" gutterBottom>
                    Name your permissions group
                </Typography>

                <p>Permissions group name *</p>
                <TextField
                    required
                    label="Group Name"
                    helperText="A descriptive name will help identify it in the future"
                    value={permissionState?.groupName}
                    onChange={(e) => setPermissionsState((prev) => ({ ...prev, groupName: e.target.value }))}
                />
            </div>
        </GroupNameDiv>
    )
}

export default GroupName;