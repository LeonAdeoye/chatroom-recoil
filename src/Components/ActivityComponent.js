import React from 'react';
import {useRecoilValue} from "recoil";
import {Box, Typography} from "@mui/material";
import activitySelector from "../Selectors/ActivitySelector";

const ActivityComponent = ({activity}) =>
{
    const activityText = useRecoilValue(activitySelector(activity));
    return (
        <div>
            <Box sx={{backgroundColor:'#404040', height: '30px', color: 'orange'}}>
                <Typography >{activityText}</Typography>
            </Box>
        </div>
    );
};

export default ActivityComponent;
