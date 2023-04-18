import React, {useEffect} from 'react';
import {Box, Typography} from "@mui/material";
import RoomHeaderComponent from "./RoomHeaderComponent";
import ActivityComponent from "./ActivityComponent";
import ChatMessageComponent from "./ChatMessageComponent";
import {useRecoilState} from "recoil";
import {selectedRoomIndexState, selectedRoomState} from "../State/RoomsState";
import axios from "axios";

const ConversationComponent = () =>
{
    const [room, setRoom] = useRecoilState(selectedRoomState);
    const [selectedRoomIndex] = useRecoilState(selectedRoomIndexState);

    useEffect(() =>
    {
        axios.get('http://localhost:8080/room?roomId=' + selectedRoomIndex)
            .then(response => {
                setRoom(response.data);
                console.log("room: ", room);
            })
            .catch(err => console.log(err.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedRoomIndex]);

    return (
        <div>
            (room && room.conversation)
            ?
            (<Box>
            <RoomHeaderComponent/>
                { room.conversation.map(content => content['activity'] ?
                    <ActivityComponent key={content['id']} activity={content}/> :
                    (content["contentType"] === "date-divider" ?
                        <Typography sx={{ borderRadius: '7px', backgroundColor:'lightblue', color: "black", borderColor:'white', border:1}} variant="h6" key={content['id']}>{content["content"]}</Typography> :
                        <ChatMessageComponent key={content['id']} chatMessage={content}/>))
                }
            </Box>)
            :
            null
        </div>
    );
};

export default ConversationComponent;
