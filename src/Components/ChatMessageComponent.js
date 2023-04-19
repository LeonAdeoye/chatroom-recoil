import React from 'react';
import {Grid, InputBase, Stack, Typography} from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectedChatMessageIndexState} from "../State/RoomsState";
import fullNameSelector from "../selectors/FullNameSelector"
import shorterTimeStampSelector from "../selectors/ShorterTimeStampSelector";

const ChatMessageComponent = (props) =>
{
    const [setSelectedChatMessageIndex] = useRecoilState(selectedChatMessageIndexState); // TODO
    const {chatMessage} = props;
    const fullName = useRecoilValue(fullNameSelector(chatMessage.authorId));
    const shorterTimeStamp = useRecoilValue(shorterTimeStampSelector(chatMessage.timeStamp));
    const handleSelectChatMessage = () => setSelectedChatMessageIndex(chatMessage.id);

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
                                   multiline={true} value={chatMessage.content} fullWidth/>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
};

export default ChatMessageComponent;
