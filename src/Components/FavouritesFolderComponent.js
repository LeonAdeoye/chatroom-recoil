import React from 'react';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import {Stack, Typography} from "@mui/material";

const FavouritesFolderComponent = () =>
{
    return (
        <>
            <Stack direction='row' sx={{ color: 'white' }}><FolderSpecialIcon/><Typography sx={{ml:2}}>Favourites</Typography></Stack>
        </>
    );
};

export default FavouritesFolderComponent;
