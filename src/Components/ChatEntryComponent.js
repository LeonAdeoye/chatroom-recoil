import React, {useState} from 'react';
import {IconButton, InputBase, Stack, Tooltip, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ArticleIcon from '@mui/icons-material/Article';
import Paper from '@mui/material/Paper';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';


const ChatEntryComponent = () =>
{
    const [newChatMessage, setNewChatMessage] = useState('');
    const [multiLineFlag, setMultiLineFlag] = useState(false);

    const submitNewChatMessage = () =>
    {
        // TODO createChatMessage(selectedRoom.id, this.state.newChatMessage, loggedInUserId);
        setNewChatMessage('');
    }

    const handleOnChangeNewChatMessage = (event) =>
    {
        setNewChatMessage(event.target.value);
    }

    const handleKeyPress = (event) =>
    {
        if(event.key === 'Enter' && newChatMessage !== '')
            submitNewChatMessage();

        event.preventDefault();
    }

    const switchToMultiline = () =>
    {
        const value = !multiLineFlag;
        setMultiLineFlag(value);
        // TODO changeHeight(value?100:50);
    }

    return (
        <>
            <Stack bgcolor='#104040' width='100%' direction='row' sx={{ height: multiLineFlag ? '100px' : '50px' }}>
                <Paper component="form"  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'100%', backgroundColor: '#404040', border: '1.5px solid white' }}>
                    {multiLineFlag ?
                        <Tooltip title={<Typography fontSize={20}>Switch back to single-line edit mode.</Typography>}>
                            <IconButton sx={{color:'white'}} size='small' onClick={switchToMultiline}>
                                <FilterListOffIcon/>
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title={<Typography fontSize={20}>Switch back to multi-line edit mode.</Typography>}>
                            <IconButton sx={{color:'white'}} size='small' onClick={switchToMultiline}>
                                <ArticleIcon/>
                            </IconButton>
                        </Tooltip>}
                    {multiLineFlag ?
                        <InputBase onChange={handleOnChangeNewChatMessage}
                                   sx={{ ml: 1, flex: 1, backgroundColor: '#404040', color:'white'}}
                                   placeholder="Enter your chat message here..."
                                   multiline
                                   value={newChatMessage}
                                   inputProps={{ 'aria-label': 'enter chat', style: { maxHeight: '85px' } }}
                        />
                        :
                        <InputBase onChange={handleOnChangeNewChatMessage}
                                   sx={{ ml: 1, flex: 1, backgroundColor: '#404040', color:'white'}}
                                   placeholder="Enter your chat message here..."
                                   value={newChatMessage}
                                   inputProps={{ 'aria-label': 'enter chat' }}
                        />}
                    <Tooltip title={<Typography fontSize={20}>Send your chat message.</Typography>}>
                            <span onKeyPress={handleKeyPress}>
                                <IconButton disabled={newChatMessage === ''} size='small' onClick={submitNewChatMessage} sx={{color:'white'}}>
                                    <SendIcon/>
                                </IconButton>
                            </span>
                    </Tooltip>
                </Paper>
            </Stack>
        </>
    );
};

export default ChatEntryComponent;
