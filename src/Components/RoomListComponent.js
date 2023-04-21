import React, {useEffect, useState} from 'react';
import RoomComponent from "./RoomComponent";
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, TextField, Tooltip, Typography} from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavouritesFolderComponent from "./FavouritesFolderComponent";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {roomsState} from "../Atoms/RoomsState";
import {useRecoilState} from "recoil";
import {loggedInUserIdState, usersState} from "../Atoms/UsersState";
import NonFavouritesFolderComponent from "./NonFavouritesFolderComponent";
import axios from "axios";
import {errorDialogDisplayState, newRoomDialogDisplayState} from "../Atoms/DialogsState";
import {errorMessageState} from "../Atoms/ApplicationState";


const RoomListComponent = () =>
{
    const [rooms, setRooms] = useRecoilState(roomsState);
    const [loggedInUserId] = useRecoilState(loggedInUserIdState);
    const [users] = useRecoilState(usersState);
    const [nonFavouriteExpansionToggle, setNonFavouriteExpansionToggle] = useState(false);
    const [favouriteExpansionToggle, setFavouriteExpansionToggle] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [newRoomDialogDisplayFlag, setNewRoomDialogDisplayFlag] = useRecoilState(newRoomDialogDisplayState);
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const [errorDialogDisplayFlag, setErrorDialogDisplayFlag] = useRecoilState(errorDialogDisplayState);

    useEffect(() =>
    {
        axios.get('http://localhost:8080/rooms')
            .then(response =>
            {
                setRooms(response.data);
            })
            .catch(err =>
            {
                setErrorMessage(`Cannot load all existing rooms because of: ${err.message}`);
                setErrorDialogDisplayFlag(true);
            });
    }, []);

    const handleClick = () =>
    {
        setNewRoomDialogDisplayFlag(true);
    };

    const handleOnChange = (event) => setFilterText(event.target.value);

    const handleAccordionFavouritesClick = () =>
    {
        let value = !favouriteExpansionToggle;
        setFavouriteExpansionToggle(value);
    };

    const handleAccordionRecentClick = () =>
    {
        let value = !nonFavouriteExpansionToggle;
        setNonFavouriteExpansionToggle(value);
    };

    const filterRooms = (func) =>
    {
        const filterToApply = filterText.toUpperCase();

        if (users.length > 0 && loggedInUserId && rooms.length > 0)
        {
            const user = users.find(user => user.id === loggedInUserId);
            if (user && user.favouriteRooms.length > 0)
                return rooms.filter(room => func(user.favouriteRooms, room.id)).filter(room => filterToApply === '' || room.name.toUpperCase().includes(filterToApply));
        }

        return rooms;
    };

    const myFavouriteRooms = filterRooms((room, id) => { return room.includes(id); });
    const myNonFavouriteRooms = filterRooms((room, id) => { return !room.includes(id); });

    return (
        <div>
            <Stack direction='row'>
                <TextField label='Enter text to filter'
                           variant='outlined'
                           size="small"
                           onChange={handleOnChange}
                           InputLabelProps={{ style: { color: 'white' } }}
                           inputProps={{ style: { color: 'white', borderColor: 'white'} }}
                           sx={{mt:2, mb:2, mr:0, ml:2, width:'85%', backgroundColor:'#575555'}}/>
                <Tooltip title={<Typography fontSize={20}>Add a new chat room.</Typography>}>
                    <IconButton size='small' onClick={handleClick} sx={{ color: 'white'}}>
                        <AddCommentIcon/>
                    </IconButton>
                </Tooltip>
            </Stack>
            <Stack>
                {myFavouriteRooms.length > 0 ? <Accordion disableGutters sx={{ backgroundColor:'#404040'}} expanded={favouriteExpansionToggle} TransitionProps={{ unmountOnExit: true }} >
                    <AccordionSummary sx={{ backgroundColor:'#575555', height:'25px', margin:0.5, borderRadius: '5px'}}
                                      onClick={handleAccordionFavouritesClick}
                                      id='panel-1-header'
                                      aria-controls='panel1-content'
                                      expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}><FavouritesFolderComponent/></AccordionSummary>
                    <AccordionDetails sx={{padding:0.5, margin:0, border: '0px'}}>{myFavouriteRooms.map(room => <RoomComponent key={room.id} index={room.id} roomName={room.name}/>)}</AccordionDetails>
                </Accordion> : null}
                {myNonFavouriteRooms.length > 0 ? <Accordion disableGutters  sx={{ backgroundColor:'#404040', border:'0px'}} expanded={nonFavouriteExpansionToggle} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary sx={{ backgroundColor:'#575555', height:'25px', margin:0.5, borderRadius: '5px'}}
                                      id='panel-2-header'
                                      aria-controls='panel2-content'
                                      onClick={handleAccordionRecentClick}
                                      expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}><NonFavouritesFolderComponent/></AccordionSummary>
                    <AccordionDetails sx={{padding:0.5, margin:0, border: '0px'}}>{myNonFavouriteRooms.map(room => <RoomComponent key={room.id} index={room.id} roomName={room.name}/>)}</AccordionDetails>
                </Accordion> : null}
            </Stack>
        </div>
    );
};

export default RoomListComponent;
