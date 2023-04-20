import React, {useState, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {loggedInUserIdState, usersState} from "../Atoms/UsersState";
import {errorDialogDisplayState, loginDialogDisplayState} from "../Atoms/DialogsState";
import axios from "axios";
import {errorMessageState} from "../Atoms/ApplicationState";

const LoginDialogComponent = () =>
{
    const [fullName, setFullName] = useState('');
    const [users,setUsers] = useRecoilState(usersState);
    const [loginDialogDisplayFlag, setLoginDialogDisplayFlag] = useRecoilState(loginDialogDisplayState);
    // eslint-disable-next-line no-unused-vars
    const [loggedInUserId, setLoggedInUserId] = useRecoilState(loggedInUserIdState);
    // eslint-disable-next-line no-unused-vars
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    // eslint-disable-next-line no-unused-vars
    const [errorDialogDisplayFlag, setErrorDialogDisplayFlag] = useRecoilState(errorDialogDisplayState);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response =>
            {
                setUsers(response.data);
            })
            .catch(err =>
            {
                setErrorMessage(`Cannot load all existing users because of: ${err.message}`);
                setErrorDialogDisplayFlag(true);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChangeEvent = (event) =>
    {
        setFullName(event.target.value);
    }

    const addUser = (fullName) =>
    {
        axios.post('http://localhost:8080/addUser?fullName='+fullName)
            .then(response =>
            {
                setUsers(response.data);
            })
            .catch(err =>
            {
                setErrorMessage(`Cannot add new user: ${fullName} because of: ${err.message}`);
                setErrorDialogDisplayFlag(true);
            });
    }

    const handleSubmit = () =>
    {
        let existingUser = users.find(user => user.fullName.toUpperCase() === fullName.toUpperCase());

        if(existingUser)
            setLoggedInUserId(existingUser.id);
        else
            addUser(fullName);

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
                    open={Boolean(loginDialogDisplayFlag)}>
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
