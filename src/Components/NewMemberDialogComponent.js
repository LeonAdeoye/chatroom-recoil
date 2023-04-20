import React, {useState} from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material'
import {Autocomplete } from '@mui/material'
import {useRecoilState} from "recoil";
import {errorDialogDisplayState, newMemberDialogDisplayState} from "../Atoms/DialogsState";
import {loggedInUserIdState, usersState} from "../Atoms/UsersState";
import {selectedRoomIndexState, selectedRoomState} from "../Atoms/RoomsState";
import axios from "axios";
import {errorMessageState} from "../Atoms/ApplicationState";

const NewMemberDialogComponent = () =>
{
    const [newMemberDialogDisplayFlag, setNewMemberDialogDisplayFlag] = useRecoilState(newMemberDialogDisplayState);
    const [users] = useRecoilState(usersState);
    const [loggedInUserId] = useRecoilState(loggedInUserIdState);
    const [selectedRoom, setSelectedRoom] = useRecoilState(selectedRoomState);
    const [selectedRoomIndex] = useRecoilState(selectedRoomIndexState);
    const [memberFullName, setMemberFullName] = useState('');
    const handleOnChangeEvent = (event, newValue) => setMemberFullName(newValue);
    const handleCancel= () => setNewMemberDialogDisplayFlag(false);
    // eslint-disable-next-line no-unused-vars
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    // eslint-disable-next-line no-unused-vars
    const [errorDialogDisplayFlag, setErrorDialogDisplayFlag] = useRecoilState(errorDialogDisplayState);

    const handleSubmit = () =>
    {
        setNewMemberDialogDisplayFlag(false);
        let newRoomMember = users.find(user => user.fullName === memberFullName);

        if(newRoomMember)
            addMemberToRoom(newRoomMember.id);
        else
        {
            setErrorMessage("New member user of a room must be an existing user.");
            setErrorDialogDisplayFlag(true);
        }
    }

    const addMemberToRoom = (newRoomMemberId) =>
    {
        axios.post(`http://localhost:8080/addMember?roomId=${selectedRoomIndex}&newMemberId=${newRoomMemberId}&instigatorId=${loggedInUserId}`)
            .then(response =>
            {
                let updatedMembers = response.data;
                setSelectedRoom({...selectedRoom, updatedMembers});
            })
            .catch(err =>
            {
                setErrorMessage(`Cannot add new member: ${memberFullName} because of: ${err.message}`);
                setErrorDialogDisplayFlag(true);
            });
    }

    const handleKeyPress = (event) =>
    {
        if(event.key === 'Enter' && memberFullName !== '')
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
                    open={Boolean(newMemberDialogDisplayFlag)}>
                <DialogTitle id='dialog-title' sx={{ backgroundColor: 'white', color: '#404040'}} >New Member In {selectedRoom ? selectedRoom.roomName : ''}</DialogTitle>
                <DialogContent sx={{ width: '500px', height: '80px', backgroundColor: '#404040', color: 'lightgrey'}} onKeyPress={handleKeyPress}>
                    <Autocomplete size='small'
                                  renderInput={(params) => <TextField {...params}
                                                                      label='Select member to add to room'
                                                                      InputLabelProps={{ style: { color: 'white' }}}
                                  />}
                                  options={users.map(user => user.fullName)}
                                  value={memberFullName}
                                  onChange={handleOnChangeEvent}
                                  freeSolo
                                  variant='outlined'
                                  width='70%'
                                  sx={{mt:2, mb:2, mr:2, ml:2, width:'90%', backgroundColor:'#575555', borderColor:'white', color:'white'}}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#404040'}}>
                    <Button variant='outlined'
                            sx={{ backgroundColor: '#404040', borderColor:'white', color: 'white', '&:hover': {
                            backgroundColor: '#4f4e4e',
                            borderColor:'white' }}}
                            onClick={handleCancel}>Cancel</Button>
                    <Button disabled={memberFullName === ''}
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

export default NewMemberDialogComponent;
