import React from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {administratorsState, roomNameState} from "../State/RoomsState";
import {Box, Grid, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import membersCountState from "../selectors/MembersCountState";

const RoomHeaderComponent = () =>
{
    const [roomName] = useRecoilState(roomNameState);
    const [administrators] = useRecoilState(administratorsState);
    const membersCount = useRecoilValue(membersCountState);

    const handleAddAdminClick = () =>
    {
        // TODO
    }

    const handleAddMemberClick = () =>
    {
        // TODO
    }

    return (
        <div>
            <Stack width={'100%'} sx={{ border:1, borderColor:'white', backgroundColor:'#363535'}}>
                <Box ><Typography variant='h5' fontFamily='Cursive' sx={{color:'lightgrey'}}>{roomName}</Typography></Box>
                <Grid container>
                    <Grid item xs={0.5}>
                        <Box>
                            <Tooltip title={<Typography fontSize={20}>Add a new member to the chat room.</Typography>}>
                                <IconButton size='small' onClick={handleAddMemberClick} sx={{ color: 'white'}}>
                                    <PersonAddIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                    <Grid item xs={0.25}>
                        <Box>
                            <Tooltip title={<Typography fontSize={20}>Add a new administrator to the chat room.</Typography>}>
                                <IconButton size='small' onClick={handleAddAdminClick} sx={{ color: 'white'}}>
                                    <AddModeratorIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                    <Grid item xs={9.75}>

                    </Grid>
                    <Grid item xs={0.75}>
                        <Box>
                            <Typography sx={{color:'lightgreen'}}  variant="subtitle2">Members: {membersCount}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={0.75}>
                        <Box>
                            <Typography sx={{color:'red'}}  variant="subtitle2">Admins: {administrators.length}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
};

export default RoomHeaderComponent;
