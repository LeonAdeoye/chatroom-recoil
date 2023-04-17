import React from 'react';
import {Box, Typography} from "@mui/material";
import RoomHeaderComponent from "./RoomHeaderComponent";
import ActivityComponent from "./ActivityComponent";
import ChatMessageComponent from "./ChatMessageComponent";
import {useRecoilState} from "recoil";
import {conversationState} from "../State/RoomsState";

const ConversationComponent = () =>
{
    const [conversation] = useRecoilState(conversationState);
    return (
        <div>
            <Box>
                <RoomHeaderComponent/>
                { conversation.map(content => content['activity'] ?
                    <ActivityComponent key={content['id']} activity={content}/> :
                    (content["contentType"] === "date-divider" ?
                        <Typography sx={{ borderRadius: '7px', backgroundColor:'lightblue', color: "black", borderColor:'white', border:1}} variant="h6" key={content['id']}>{content["content"]}</Typography> :
                        <ChatMessageComponent key={content['id']} chatMessage={content}/>))
                }
            </Box>
        </div>
    );
};

export default ConversationComponent;
