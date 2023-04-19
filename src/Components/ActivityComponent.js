import React from 'react';
import {useRecoilValue} from "recoil";
import {Box} from "@mui/material";
import activitySelector from "../selectors/ActivitySelector";

const ActivityComponent = (props) =>
{
    const activityText = useRecoilValue(activitySelector(props.activity));
    return (
        <div>
            <Box sx={{backgroundColor:'#404040', height: '30px', color: 'orange'}}>
                {activityText}
            </Box>
        </div>
    );
};

export default ActivityComponent;
