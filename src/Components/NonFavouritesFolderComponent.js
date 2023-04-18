import React from 'react';
import {Stack, Typography} from "@mui/material";
import FolderSharedIcon from '@mui/icons-material/FolderShared';

function NonFavouritesFolderComponent(props) {
    return (
        <div>
            <Stack direction='row' sx={{ color: 'white'}}><FolderSharedIcon/><Typography sx={{ml:2}}>Recent</Typography></Stack>
        </div>
    );
}

export default NonFavouritesFolderComponent;
