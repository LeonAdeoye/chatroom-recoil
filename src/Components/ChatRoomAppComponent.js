import React, {useState, useEffect} from 'react';
import {useRecoilState} from "recoil";
import RoomListComponent from "./RoomListComponent";
import ConversationComponent from "./ConversationComponent";
import ChatEntryComponent from "./ChatEntryComponent";
import {Grid, Box, Stack} from '@mui/material'
import {usersState} from "../State/UsersState";
import axios from "axios";

const ChatRoomAppComponent = () =>
{
    const [chatEntryHeight, setChatEntryHeight] = useState(50);
    const changeHeight = (value) => setChatEntryHeight(value);
    // eslint-disable-next-line no-unused-vars
    const [users, setUsers] = useRecoilState(usersState);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => console.log(err.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid container rowSpacing={0}
                  columnSpacing={0.25}
                  style={{ backgroundColor:'#404040', color:'white' }}
                  height='1000px'>
                <Grid item  xl={2} style={{ borderRight: '2px solid white' }}>
                    <Box><RoomListComponent/></Box>
                </Grid>
                <Grid item xl>
                    <Stack>
                        <Box sx={{height: chatEntryHeight === 100 ? '900px' : '950px'}}>
                            <ConversationComponent/>
                        </Box>
                        <Box sx={{height: chatEntryHeight === 100 ? '100px' : '50px'}}>
                            <ChatEntryComponent changeHeight={changeHeight}/>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default ChatRoomAppComponent;
