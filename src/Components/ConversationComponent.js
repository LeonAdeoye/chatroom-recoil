import React from 'react';
import {Box, Typography} from "@mui/material";
import RoomHeaderComponent from "./RoomHeaderComponent";
import ActivityComponent from "./ActivityComponent";
import ChatMessageComponent from "./ChatMessageComponent";
import {useRecoilState} from "recoil";
import {realtimeMessageState, selectedRoomState} from "../Atoms/RoomsState";

const ConversationComponent = () =>
{
    const createDates = (inputList) =>
    {
        // Add zero padding - used for month.
        const zeroPadDigits = (number, digits) =>
        {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        };

        const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let result = [];

        for(let index = 0; index < inputList.length; ++index)
        {
            let currentDate = new Date(inputList[index]["timeStamp"]);
            let month = months[currentDate.getMonth()];
            let weekday = weekdays[currentDate.getDay()];
            let year = currentDate.getFullYear();
            let day = currentDate.getDate();
            let contentDate = `${weekday} ${day} ${month} ${year}`;
            let timeStampDate = `${year}-${zeroPadDigits(currentDate.getMonth() + 1, 2)}-${day}T00:00:00.000`;
            result.push({content: contentDate, id: contentDate, contentType: 'date-divider', timeStamp: timeStampDate});
        }

        // Remove duplicates
        return Array.from(new Set(result.map(a => a.id)))
            .map(id => {
                return result.find(a => a.id === id);
            });
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
    const [room] = useRecoilState(selectedRoomState);
    const [realtimeMessage] = useRecoilState(realtimeMessageState);

    if(room !== null)
    {
        let intermediateResult = room.conversation.concat(room.activities);
        let uniqueDates = createDates(intermediateResult);
        result = intermediateResult.concat(uniqueDates).sort((a, b) => new Date(a["timeStamp"]).getTime() - new Date(b["timeStamp"]).getTime());
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
