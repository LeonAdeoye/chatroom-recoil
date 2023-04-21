import React from 'react';
import {Stack, Typography} from "@mui/material";
import FolderSharedIcon from '@mui/icons-material/FolderShared';

const NonFavouritesFolderComponent = () =>
{
    return (
        <>
            <Stack direction='row' sx={{ color: 'white'}}><FolderSharedIcon/><Typography sx={{ml:2}}>Recent</Typography></Stack>
        </>
    );
};

export default NonFavouritesFolderComponent;
