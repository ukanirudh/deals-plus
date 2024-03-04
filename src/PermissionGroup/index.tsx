import React, { useState } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import GroupName from './GroupName';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { DIALOG_STEPS } from '../constants';
import Structures from './Structures';
import Members from './Members';
import Entities from './Entities';
import { usePersmissionContext } from '../Context/PermissionsContext';


const PermissionGroup = () => {
    const { permissionState } = usePersmissionContext();
    const [open, setOpen] = useState<boolean>(true);
    const [curStep, setCurrentStep] = useState<number>(0);
    const handleNext = () => setCurrentStep((prev) => prev + 1);
    const handleClose = () => setOpen(false);

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={open}
            disableEscapeKeyDown
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    console.log("permissionState", permissionState)
                    if (curStep === 3) {
                        handleClose()
                    } else {
                        handleNext();
                    }
                },
            }}
        >
            <DialogTitle>
                <IconButton color="primary">
                    <GroupAddIcon />
                </IconButton>
                Create a new permissions group
            </DialogTitle>
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Stepper activeStep={curStep} alternativeLabel>
                    {DIALOG_STEPS.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </DialogContent>
            <DialogContent dividers>
                {
                    curStep === 0 && <GroupName />
                }
                {
                    curStep === 1 && <Structures />
                }
                {
                    curStep === 2 && <Entities />
                }
                {
                    curStep === 3 && <Members />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}> Cancel </Button>
                <Button variant="contained" type="submit">Next</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PermissionGroup;