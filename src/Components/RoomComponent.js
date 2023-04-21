import React from 'react';
import {Box, Grid, IconButton, Tooltip, Typography} from '@mui/material';
import StarBorderPurple500RoundedIcon from '@mui/icons-material/StarBorderPurple500Rounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useRecoilState} from "recoil";
import {selectedRoomIndexState, selectedRoomState} from "../Atoms/RoomsState";
import axios from "axios";
import {errorDialogDisplayState} from "../Atoms/DialogsState";
import {errorMessageState} from "../Atoms/ApplicationState";
import {loggedInUserIdState, usersState} from "../Atoms/UsersState";

const RoomComponent = ({index, roomName}) =>
{
    const [selectedRoomIndex, setSelectedRoomIndex] = useRecoilState(selectedRoomIndexState);
    const [users,setUsers] = useRecoilState(usersState);
    const [loggedInUserId] = useRecoilState(loggedInUserIdState);
    const [selectedRoom, setSelectedRoom] = useRecoilState(selectedRoomState);
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const [errorDialogDisplayFlag, setErrorDialogDisplayFlag] = useRecoilState(errorDialogDisplayState);

    const handleFetchConversation = () =>
    {
        setSelectedRoomIndex(index);
        if(index !== -1)
        {
            axios.get('http://localhost:8080/room?roomId=' + index)
                .then(response =>
                {
                    setSelectedRoom(response.data);
                })
                .catch(err =>
                {
                    setErrorMessage(`Cannot load selected room because of: ${err.message}`);
                    setErrorDialogDisplayFlag(true);
                });
        }
    };

    const handleCloseRoom = () =>
    {
        // TODO close room.
    };

    const handleAddToFavourites = () =>
    {
        axios.put('http://localhost:8080/addToFavourites?userId=' + loggedInUserId + '&roomId=' + selectedRoomIndex)
            .then(response =>
            {
                let loggedInUser = users.find(user => user.id === loggedInUserId);
                let unchangedUsers = users.filter(user => user.id  !== loggedInUserId);
                if(loggedInUser)
                {
                    let favouriteRooms = response.data;
                    setUsers([...unchangedUsers, {...loggedInUser, favouriteRooms}]);
                }
            })
            .catch(err =>
            {
                setErrorMessage(`Cannot add room to favourites because of: ${err.message}`);
                setErrorDialogDisplayFlag(true);
            });
    };

    return (
        <Box sx={{
            borderRadius: '7px',
            color:'white',
            height: '20px',
            padding: '10px',
            textOverflow: 'ellipsis',
            textAlign: 'center',
            '&:hover': {
                backgroundColor: '#4f4e4e',
                borderColor:'white',
                border:1
            }}}
             bgcolor={selectedRoomIndex === index ? '#363535' : '#404040'}
             onClick={handleFetchConversation}>
            <Grid container rowSpacing={0} columnSpacing={0}>
                <Grid item  xl>
                    <Typography align="left">{roomName}</Typography>
                </Grid>
                <Grid item xl={2}>
                    {(selectedRoomIndex === index) &&
                        <Box display="flex">
                            <Tooltip title={<Typography fontSize={20}>Add chat room to favourites.</Typography>}>
                                <IconButton sx={{ color:'white', ml:-1}} size='small' onClick={handleAddToFavourites}>
                                    <StarBorderPurple500RoundedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={<Typography fontSize={20}>Hide chat room.</Typography>}>
                                <IconButton sx={{ color:'white', ml:-1}} size='small' onClick={handleCloseRoom}>
                                    <CloseRoundedIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>}
                </Grid>
            </Grid>
        </Box>
    );
};

export default RoomComponent;
