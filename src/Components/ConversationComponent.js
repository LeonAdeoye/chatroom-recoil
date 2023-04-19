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
            })
            .catch(err => console.log(err.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedRoomIndex]);

    return (
        <div>
            {room !== null && room.conversation !== null
            ?
            (<Box>
                <RoomHeaderComponent/>
                { room.conversation.map(content => <ChatMessageComponent key={content['id']} chatMessage={content}/>)}
            </Box>)
            :
            null}
        </div>
    );
};

/*
{ room.conversation.map(content => content['activity'] ?
    <ActivityComponent key={content['id']} activity={content}/> :
    (content["contentType"] === "date-divider" ?
        <Typography sx={{ borderRadius: '7px', backgroundColor:'lightblue', color: "black", borderColor:'white', border:1}} variant="h6" key={content['id']}>{content["content"]}</Typography> :
        <ChatMessageComponent key={content['id']} chatMessage={content}/>))
}
*/

export default ConversationComponent;
