import React, {useState} from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'
import {Autocomplete } from '@mui/material'
import {useRecoilState} from "recoil";
import {newAdminDialogDisplayState} from "../Atoms/DialogsState";
import {loggedInUserIdState, usersState} from "../Atoms/UsersState";
import {selectedRoomIndexState, selectedRoomState} from "../Atoms/RoomsState";
import axios from "axios";

const NewAdminDialogComponent = () =>
{
    const [newAdminDialogDisplayFlag, setNewAdminDialogDisplayFlag] = useRecoilState(newAdminDialogDisplayState);
    const [users] = useRecoilState(usersState);
    const [loggedInUserId] = useRecoilState(loggedInUserIdState);
    const [selectedRoom, setSelectedRoom] = useRecoilState(selectedRoomState);
    const [selectedRoomIndex] = useRecoilState(selectedRoomIndexState);
    const [adminFullName, setAdminFullName] = useState('');
    const handleOnChangeEvent = (event, newValue) => setAdminFullName(newValue);
    const handleCancel= () => setNewAdminDialogDisplayFlag(false);

    const handleSubmit = () =>
    {
        setNewAdminDialogDisplayFlag(false);
        let newRoomAdmin = users.find(user => user.fullName === adminFullName);

        if(newRoomAdmin)
            addAdminToRoom(newRoomAdmin.id);
        else
            console.log("New Admin user of a room must be an existing user.");
    }

    const addAdminToRoom = (newRoomAdminId) =>
    {
        axios.post(`http://localhost:8080/addAdmin?roomId=${selectedRoomIndex}&newAdminId=${newRoomAdminId}&instigatorId=${loggedInUserId}`)
            .then(response =>
            {
                let updatedAdministrators = response.data;
                setSelectedRoom({...selectedRoom, updatedAdministrators});
            })
            .catch(err =>
            {
                console.log(err.message);
            });
    }

    const handleKeyPress = (event) =>
    {
        if(event.key === 'Enter' && adminFullName !== '')
        {
            handleSubmit();
            event.preventDefault();
        }
    }

    return (
        <div>
            <Dialog aria-labelledby='dialog-title'
                    width='500px'
                    height='80px'
                    sx={{ backgroundColor: '#404040'}}
                    open={Boolean(newAdminDialogDisplayFlag)}>
                <DialogTitle id='dialog-title' sx={{ backgroundColor: 'white', color: '#404040'}} >New Admin In { selectedRoom ? selectedRoom.roomName : ''}</DialogTitle>
                <DialogContent sx={{ width: '500px', height: '80px', backgroundColor: '#404040', color: 'lightgrey'}} onKeyPress={handleKeyPress}>
                    <Autocomplete size='small'
                                  renderInput={(params) =>
                                  <TextField {...params}
                                  label='Select administrator to add to room'
                                  InputLabelProps={{ style: { color: 'white' }}}/>}
                                  options={users.map(user => user.fullName)}
                                  value={adminFullName}
                                  onChange={handleOnChangeEvent}
                                  freeSolo
                                  variant='outlined'
                                  width='70%'
                                  sx={{mt:2, mb:2, mr:2, ml:2, width:'90%', backgroundColor:'#575555', borderColor:'white'}}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#404040'}}>
                    <Button variant='outlined'
                            sx={{ backgroundColor: '#404040', borderColor:'white', color: 'white', '&:hover': {
                            backgroundColor: '#4f4e4e',
                            borderColor:'white' }}}
                            onClick={handleCancel}>Cancel</Button>
                    <Button disabled={adminFullName === ''}
                            variant='outlined'
                            sx={{ backgroundColor: '#404040', borderColor:'white', color: 'white', '&:hover': {
                            backgroundColor: '#4f4e4e',
                            borderColor:'white' }}}
                            autoFocus onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewAdminDialogComponent;
