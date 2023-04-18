import React from 'react';
import {Box, Grid, IconButton, Tooltip, Typography} from '@mui/material'
import StarBorderPurple500RoundedIcon from '@mui/icons-material/StarBorderPurple500Rounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useRecoilState} from "recoil";
import {selectedRoomIndexState} from "../State/RoomsState";

const RoomComponent = (props) =>
{
    const [selectedRoomIndex, setSelectedRoomIndex] = useRecoilState(selectedRoomIndexState);

    const handleFetchConversation = () =>
    {
        setSelectedRoomIndex(props.index);
    }

    const handleCloseRoom = () =>
    {
        // TODO
    }
    const handleAddToFavourites = () =>
    {
        // TODO
    }

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
             bgcolor={selectedRoomIndex === props.index ? '#363535' : '#404040'}
             onClick={handleFetchConversation}>
            <Grid container rowSpacing={0} columnSpacing={0}>
                <Grid item  xl>
                    <Typography>{props.roomName}</Typography>
                </Grid>
                <Grid item xl={2}>
                    {(selectedRoomIndex === props.index) &&
                        <Box display="flex" alignItems="center">
                            <Tooltip title={<Typography fontSize={20}>Add chat room to favourites.</Typography>}>
                                <IconButton sx={{ color:'white'}} size='small' onClick={handleAddToFavourites}>
                                    <StarBorderPurple500RoundedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={<Typography fontSize={20}>Hide chat room.</Typography>}>
                                <IconButton sx={{ color:'white'}} size='small' onClick={handleCloseRoom}>
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
