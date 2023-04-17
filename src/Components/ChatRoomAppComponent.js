import React, {useState} from 'react';
import {RecoilRoot} from "recoil";
import RoomListComponent from "./RoomListComponent";
import ConversationComponent from "./ConversationComponent";
import ChatEntryComponent from "./ChatEntryComponent";
import {Grid, Box, Stack} from '@mui/material'

function ChatRoomAppComponent(props)
{
    const [chatEntryHeight, setChatEntryHeight] = useState('50px');

    const changeHeight = (value) =>
    {
        setChatEntryHeight(value);
    }

    return (
        <>
            <RecoilRoot>
                <Grid container rowSpacing={0}
                      columnSpacing={0.25}
                      style={{ backgroundColor:'#404040', color:'white' }}
                      height='1000px'>
                    <Grid item  xl={2} style={{ borderRight: '2px solid white' }}>
                        <Box><RoomListComponent/></Box>
                    </Grid>
                    <Grid item xl>
                        <Stack>
                            <Box sx={{height: this.state.heightValue === 100 ? '900px' : '950px'}}>
                                <ConversationComponent/>
                            </Box>
                            <Box sx={{height: this.state.heightValue === 100 ? '100px' : '50px'}}>
                                <ChatEntryComponent changeHeight={changeHeight}/>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </RecoilRoot>
        </>
    );
}

export default ChatRoomAppComponent;
