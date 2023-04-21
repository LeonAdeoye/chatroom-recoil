import React from 'react';
import {Grid, InputBase, Stack, Typography} from "@mui/material";
import {useRecoilValue} from "recoil";
import fullNameSelector from "../Selectors/FullNameSelector";
import shorterTimeStampSelector from "../Selectors/ShorterTimeStampSelector";

const ChatMessageComponent = ({authorId, timeStamp, message}) =>
{
    const fullName = useRecoilValue(fullNameSelector(authorId));
    const shorterTimeStamp = useRecoilValue(shorterTimeStampSelector(timeStamp));
    const handleSelectChatMessage = () => {}; // TODO

    return (
        <div>
            <Stack sx={{color:'white'}} direction='row' onClick={handleSelectChatMessage}>
                <Grid container>
                    <Grid item xs={0.75}>
                        <Typography fontSize='4' fontFamily='Arial' color='lightblue'>{shorterTimeStamp}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{fontWeight: 'bold'}}>{fullName}:</Typography>
                    </Grid>
                    <Grid item xs={10.25}>
                        <InputBase sx={{ padding: 0, backgroundColor: '#404040', color:'lightgray', fontFamily: 'cursive'}}
                                   multiline={true} value={message} fullWidth/>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
};

export default React.memo(ChatMessageComponent);
