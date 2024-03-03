import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const GroupName = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Name your permissions group
            </Typography>
            <TextField
                label="Group Name"
                helperText="A descriptive name will help identify it in the future"
            />
        </>
    )
}

export default GroupName;