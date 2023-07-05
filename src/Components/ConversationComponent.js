import React from 'react';
import {Box, Typography} from "@mui/material";
import RoomHeaderComponent from "./RoomHeaderComponent";
import ActivityComponent from "./ActivityComponent";
import ChatMessageComponent from "./ChatMessageComponent";
import {useRecoilState} from "recoil";
import {realtimeMessageState, selectedRoomState} from "../Atoms/RoomsState";
import {loggedInUserIdState} from "../Atoms/UsersState";

const ConversationComponent = () =>
{
    const [room] = useRecoilState(selectedRoomState);
    const [realtimeMessage] = useRecoilState(realtimeMessageState);
    const [loggedInUserId] = useRecoilState(loggedInUserIdState);

    const zeroPadDigits = (number, digits) =>
    {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    };

    const transformTimestamp = (timestamp) =>
    {
        let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let currentDate = new Date(timestamp);
        let month = months[currentDate.getMonth()];
        let weekday = weekdays[currentDate.getDay()];
        let year = currentDate.getFullYear();
        let day = currentDate.getDate();
        return [`${year}-${zeroPadDigits(currentDate.getMonth() + 1, 2)}-${zeroPadDigits(day, 2)}T00:00:00.000`, `${weekday} ${day} ${month} ${year}`];
    };

    const createDateDividers = (inputList) =>
    {
        let contentArray = [];
        // For each chat message's timestamp create a date divider
        for(let index = 0; index < inputList.length; ++index)
        {
            const [transformedTimestamp, dateDividerContent] = transformTimestamp(inputList[index]["timeStamp"]);
            contentArray.push({content: dateDividerContent, id: dateDividerContent, contentType: 'date-divider', timeStamp: transformedTimestamp});
        }
        return contentArray;
    };

    const renderDifferentMessageTypes = (content) =>
    {
        return content['activity'] ?
            <ActivityComponent key={content['id']} index={content['id']} activity={content}/> :
            (content["contentType"] === "date-divider" ?
                <Typography sx={{ borderRadius: '7px', backgroundColor:'lightblue', color: "black", borderColor:'white', border:1}}
                            align="center" variant="h6" key={content['id']}>{content["content"]}</Typography> :
                <ChatMessageComponent key={content['id']} authorId={content.authorId} timeStamp={content.timeStamp} message={content.content}/>);
    };

    let result = [];
    if(room !== null)
    {
        // Merge conversation and activities into one array.
        let intermediateResult = room.conversation.concat(room.activities);
        // Add any realtime message received via the WebSocket topic broadcast to the conversation.
        if(JSON.stringify(realtimeMessage) !== "{}")
        {
            let realtimeMessageObject = JSON.parse(realtimeMessage.toString());
            // Only add the message if it is from the current room and not from the logged-in user.
            if(realtimeMessageObject.roomId === room.id && realtimeMessageObject.authorId !== loggedInUserId)
            {
                // Convert the timestamp to ISO format.
                realtimeMessageObject.timeStamp = new Date(realtimeMessageObject.timeStamp).toISOString();
                intermediateResult.push(realtimeMessageObject);
            }
        }
        // Using the timestamp create the date dividers
        let uniqueDates = createDateDividers(intermediateResult);
        // Sort all conversation elements by timestamp.
        result = intermediateResult.concat(uniqueDates).sort((a, b) => new Date(a["timeStamp"]).getTime() - new Date(b["timeStamp"]).getTime());
        // Remove duplicates conversation content using the ID.
        result = Array.from(new Set(result.map(a => a.id)))
            .map(id => {
                return result.find(a => a.id === id);
            });
    }

    return (
        <div>
            {
                room !== null ?
                (<Box>
                    <RoomHeaderComponent/>
                    {
                        result.map(content => renderDifferentMessageTypes(content))
                    }
                </Box>)
                : null
            }
        </div>
    );
};

export default ConversationComponent;
