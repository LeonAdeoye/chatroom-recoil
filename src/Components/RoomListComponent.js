import React, {useState} from 'react';
import RoomComponent from "./RoomComponent";
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, TextField, Tooltip, Typography} from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import FavouritesFolderComponent from "./FavouritesFolderComponent";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {favouriteRoomsState, roomsState} from "../State/RoomsState";
import {useRecoilState} from "recoil";
import {loggedInUserIdState, usersState} from "../State/UsersState";
import NonFavouritesFolderComponent from "./NonFavouritesFolderComponent";


const RoomListComponent = () =>
{
    const favouriteRooms = useRecoilState(favouriteRoomsState);
    const rooms = useRecoilState(roomsState);
    const loggedInUserId = useRecoilState(loggedInUserIdState);
    const users = useRecoilState(usersState);

    const [nonFavouriteExpansionToggle, setNonFavouriteExpansionToggle] = useState(false);
    const [favouriteExpansionToggle, setFavouriteExpansionToggle] = useState(false);
    const [filterText, setFilterText] = useState('');

    const handleClick = () =>
    {
        // TODO - toggle open new chat room dialog.
    }

    const handleOnChange = (event) =>
    {
        setFilterText(event.target.value);
    }

    const handleAccordionFavouritesClick = (event) =>
    {
        let value = !favouriteExpansionToggle;
        setFavouriteExpansionToggle(value)
    }

    const handleAccordionRecentClick = (event) =>
    {
        let value = !nonFavouriteExpansionToggle;
        setNonFavouriteExpansionToggle(value);
    }

    const filterRooms = (func) =>
    {
        if (favouriteRooms.length > 0 && rooms.length > 0)
            return rooms.filter(room => func(favouriteRooms, room.id)).filter(room => filterText === '' || room.name.toUpperCase().includes(filterText.toUpperCase()));

        /*if (users.length > 0 && loggedInUserId !== '' && rooms.length > 0)
        {
            const user = users.find(user => user.id === loggedInUserId);
            if (user && user.favouriteRooms.length > 0)
                return rooms.filter(room => func(user.favouriteRooms, room.id)).filter(room => filterText === '' || room.name.toUpperCase().includes(filterText));
        }*/

        return rooms;
    };

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
                {favouriteRooms.length > 0 ? <Accordion disableGutters sx={{ backgroundColor:'#404040'}} expanded={favouriteExpansionToggle} TransitionProps={{ unmountOnExit: true }} >
                    <AccordionSummary sx={{ backgroundColor:'#575555', height:'25px', margin:0.5, borderRadius: '5px'}}
                                      onClick={handleAccordionFavouritesClick}
                                      id='panel-1-header'
                                      aria-controls='panel1-content'
                                      expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}><FavouritesFolderComponent/></AccordionSummary>
                    <AccordionDetails sx={{padding:0.5, margin:0, border: '0px'}}>{favouriteRooms.map((room) => <RoomComponent key={room.id} index={room.id} roomName={room.name}/>)}</AccordionDetails>
                </Accordion> : null}
                {favouriteRooms.length > 0 ? <Accordion disableGutters  sx={{ backgroundColor:'#404040', border:'0px'}} expanded={nonFavouriteExpansionToggle} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary sx={{ backgroundColor:'#575555', height:'25px', margin:0.5, borderRadius: '5px'}}
                                      id='panel-2-header'
                                      aria-controls='panel2-content'
                                      onClick={handleAccordionRecentClick}
                                      expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}><NonFavouritesFolderComponent/></AccordionSummary>
                    <AccordionDetails sx={{padding:0.5, margin:0, border: '0px'}}>{favouriteRooms.filter(room => !room.isValid).map((room) => <RoomComponent key={room.id} index={room.id} roomName={room.name}/>)}</AccordionDetails>
                </Accordion> : null}
            </Stack>
        </div>
    );
};

export default RoomListComponent;
