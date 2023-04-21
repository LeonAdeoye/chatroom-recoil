import React from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {selectedRoomState} from "../Atoms/RoomsState";
import {Box, Grid, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import membersCountSelector from "../Selectors/MembersCountSelector";
import adminsCountSelector from "../Selectors/AdminsCountSelector";
import {newAdminDialogDisplayState, newMemberDialogDisplayState} from "../Atoms/DialogsState";

const RoomHeaderComponent = () =>
{
    const [room] = useRecoilState(selectedRoomState);
    const membersCount = useRecoilValue(membersCountSelector);
    const adminsCount = useRecoilValue(adminsCountSelector);
    const [newAdminDialogDisplayFlag, setNewAdminDialogDisplayFlag] = useRecoilState(newAdminDialogDisplayState);
    const [newMemberDialogDisplayFlag, setNewMemberDialogDisplayFlag] = useRecoilState(newMemberDialogDisplayState);
    const handleAddAdminClick = () => setNewAdminDialogDisplayFlag(true);
    const handleAddMemberClick = () => setNewMemberDialogDisplayFlag(true);

    return (
        <div>
            <Stack width={'100%'} sx={{ border:1, borderColor:'white', backgroundColor:'#363535'}}>
                <Box ><Typography align="center" variant='h5' fontFamily='Cursive' sx={{color:'lightgrey'}}>{room.roomName}</Typography></Box>
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
                            <Typography sx={{color:'lightgreen'}}  variant="subtitle2">{membersCount}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={0.75}>
                        <Box>
                            <Typography sx={{color:'red'}}  variant="subtitle2">{adminsCount}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
};

export default RoomHeaderComponent;
