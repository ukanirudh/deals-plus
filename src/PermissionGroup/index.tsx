import React, { useState } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import GroupName from './GroupName';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { DIALOG_STEPS } from '../constants';
import Structures from './Structures';
import Members from './Members';


const PermissionGroup = () => {
    const [open, setOpen] = useState<boolean>(true);
    const [curStep, setCurrentStep] = useState<number>(0);
    const handleNext = () => setCurrentStep((prev) => prev + 1);
    const handleClose = () => setOpen(false);

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            onClose={() => setOpen(false)}
            open={open}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    // const formData = new FormData(event.currentTarget);
                    // const formJson = Object.fromEntries((formData as any).entries());
                    // const email = formJson.email;
                    console.log("event", event);
                    if (curStep === 3) {
                        handleClose()
                    } else {
                        handleNext();
                    }
                },
            }}
        >
            <DialogTitle>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <GroupAddIcon />
                </IconButton>
                Create a new permissions group
            </DialogTitle>
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
                    curStep === 2 && <>2</>
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