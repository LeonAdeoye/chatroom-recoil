import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useRecoilState} from "recoil";
import {errorDialogDisplayState} from "../Atoms/DialogsState";
import {errorMessageState} from "../Atoms/UsersState";

const ErrorMessageDialogComponent = () =>
{
    const [errorDialogDisplayFlag, setErrorDialogDisplayFlag] = useRecoilState(errorDialogDisplayState);
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);

    const handleSubmit = () =>
    {
        setErrorDialogDisplayFlag(false);
        setErrorMessage('');
    }

    const handleKeyPress = (event) =>
    {
        if(event.key === 'Enter')
        {
            handleSubmit();
            event.preventDefault();
        }
    }

    return (
        <div>
            <Dialog aria-labelledby='dialog-title'
                    width='400px'
                    height='80px'
                    sx={{ backgroundColor: '#404040'}}
                    open={Boolean(errorDialogDisplayFlag)}>
                <DialogTitle id='dialog-title' sx={{ backgroundColor: 'white', color: '#404040'}} >Error Occurred</DialogTitle>
                <DialogContent sx={{ width: '400px', height: '80px', backgroundColor: '#404040', color: 'lightgrey', alignContent: 'center'}} onKeyPress={handleKeyPress}>
                    <Typography variant="subtitle1">{errorMessage}</Typography>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#404040'}}>
                    <Button variant='outlined'
                            sx={{ backgroundColor: '#404040', borderColor:'white', color: 'white', '&:hover': {
                            backgroundColor: '#4f4e4e',
                            borderColor:'white'}}}
                            autoFocus onClick={handleSubmit}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ErrorMessageDialogComponent;
