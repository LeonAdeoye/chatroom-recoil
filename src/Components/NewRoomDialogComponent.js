import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {errorDialogDisplayState, newRoomDialogDisplayState} from "../Atoms/DialogsState";
import {loggedInUserIdState} from "../Atoms/UsersState";
import axios from "axios";
import {roomsState} from "../Atoms/RoomsState";
import {errorMessageState} from "../Atoms/ApplicationState";

const NewRoomDialogComponent = () =>
{
    const [newRoomDialogDisplayFlag, setNewRoomDialogDisplayFlag] = useRecoilState(newRoomDialogDisplayState);
    const [rooms, setRooms] = useRecoilState(roomsState);
    const [loggedInUserId] = useRecoilState(loggedInUserIdState);
    const [roomName, setRoomName] = useState('');
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const [errorDialogDisplayFlag, setErrorDialogDisplayFlag] = useRecoilState(errorDialogDisplayState);

    const handleOnChangeEvent = (event) => setRoomName(event.target.value);
    const handleCancel= () => setNewRoomDialogDisplayFlag(false);

    const handleSubmit = () =>
    {
        setNewRoomDialogDisplayFlag(false);
        createNewRoom(roomName, loggedInUserId);
    };

    const handleKeyPress = (event) =>
    {
        if(event.key === 'Enter' && roomName !== '')
        {
            handleSubmit();
            event.preventDefault();
        }
    };

    const createNewRoom = (newRoomName, creatorId) =>
    {
        axios.post('http://localhost:8080/addRoom', { ownerId: creatorId, roomName: newRoomName})
            .then(response =>
            {
                let room = response.data;
                setRooms([...rooms, {id: room.id, name: room.roomName}]);
            })
            .catch(err =>
            {
                setErrorMessage(`Cannot add new room because of: ${err.message}`);
                setErrorDialogDisplayFlag(true);
            });
    };

    return (
        <div>
            <Dialog aria-labelledby='dialog-title'
                    width='400px'
                    height='80px'
                    sx={{ backgroundColor: '#404040'}}
                    open={Boolean(newRoomDialogDisplayFlag)}>
                <DialogTitle id='dialog-title' sx={{ backgroundColor: 'white', color: '#404040'}} >Add New Chat Room</DialogTitle>
                <DialogContent sx={{ width: '400px', height: '80px', backgroundColor: '#404040', color: 'lightgrey'}} onKeyPress={handleKeyPress}>
                    <TextField label='Enter the name of the chat room...'
                               variant='outlined'
                               width='70%'
                               size="small"
                               onChange={handleOnChangeEvent}
                               InputLabelProps={{ style: { color: 'white' } }}
                               inputProps={{ style: { color: 'white'} }}
                               sx={{mt:2, mb:2, mr:2, ml:2, width:'90%', backgroundColor:'#575555', borderColor:'white'}}/>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#404040'}}>
                    <Button variant='outlined' sx={{ backgroundColor: '#404040', borderColor:'white', color: 'white', '&:hover': {
                            backgroundColor: '#4f4e4e',
                            borderColor:'white'
                        }}} onClick={handleCancel}>Cancel</Button>
                    <Button disabled={roomName === ""} variant='outlined' sx={{ backgroundColor: '#404040', borderColor:'white', color: 'white', '&:hover': {
                            backgroundColor: '#4f4e4e',
                            borderColor:'white'
                        }}} autoFocus onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewRoomDialogComponent;
