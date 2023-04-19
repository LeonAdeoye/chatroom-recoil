import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {usersState} from "../State/UsersState";
import {loginDialogDisplayState} from "../State/DialogsState";

const LoginDialogComponent = () =>
{
    const [fullName] = useState('');
    const [users] = useRecoilState(usersState);
    const [loginDialogDisplayFlag, setLoginDialogDisplayFlag] = useRecoilState(loginDialogDisplayState)

    const handleOnChangeEvent = (event) =>
    {
        this.setState({fullName: event.target.value});
    }

    const handleSubmit = () =>
    {
        let loginFullName = fullName;
        let result = users.find(user => user.fullName === loginFullName);

        if(result !== undefined)
            //loginUser(result.id);
            console.log("found user", result)
        else
            //addUser(loginFullName);
            console.log("not found user", result)

        setLoginDialogDisplayFlag(false);
    }

    const handleKeyPress = (event) =>
    {
        if(event.key === 'Enter' && fullName !== '')
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
                    open={loginDialogDisplayFlag}>
                <DialogTitle id='dialog-title' sx={{ backgroundColor: 'white', color: '#404040'}} >Login To Chat Rooms</DialogTitle>
                <DialogContent sx={{ width: '400px', height: '80px', backgroundColor: '#404040', color: 'lightgrey'}} onKeyPress={handleKeyPress}>
                    <TextField label='Enter your full name...'
                               variant='outlined'
                               width='70%'
                               size="small"
                               onChange={handleOnChangeEvent}
                               InputLabelProps={{ style: { color: 'white' } }}
                               inputProps={{ style: { color: 'white'} }}
                               sx={{mt:2, mb:2, mr:2, ml:2, width:'90%', backgroundColor:'#575555', borderColor:'white'}}/>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#404040'}}>
                    <Button disabled={fullName === ""} variant='outlined' sx={{ backgroundColor: '#404040', borderColor:'white', color: 'white', '&:hover': {
                            backgroundColor: '#4f4e4e',
                            borderColor:'white'
                        }}} autoFocus onClick={handleSubmit}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginDialogComponent;
