/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEditing, setStory, setViewContext } from '../../../features/storySlice';
import { EditOutlined } from '@mui/icons-material';
import { currentUser } from '../../../features/authSlice';
import { useLocation } from 'react-router-dom';
import EditModal from '../../EditModal';
export const singleStoryStyle = {
    height: "28rem",
    flexBasis: '16rem',
    borderRadius: "1rem",
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    border: '1px solid rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '1rem'
    },
    cursor: 'pointer'
}
const SingleStory = ({ story, viewContext, viewContextTotal }) => {
    const location = useLocation()

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setStory({ story }))
        dispatch(setViewContext({ context: viewContext, total: viewContextTotal }))
    }
    const user = useSelector(currentUser)
    return (
        <Box

            sx={{
                ...singleStoryStyle, backgroundImage: `url(${story?.image})`,
            }}
            onClick={() => {
                handleClick()
            }}
        >

            <Box sx={{ position: 'absolute', bottom: 0, left: 10, display: 'flex', flexDirection: 'column', padding: 2, gap: 1, textAlign: 'left' }} >
                <Typography sx={{ color: 'white' }} variant='h6'>{story?.heading}</Typography>
                <Typography sx={{ color: 'white' }}>
                    {story?.description.slice(0, 40)}...
                </Typography>

            </Box>
            {story.createdBy?._id === user?._id && location?.pathname !== "/bookmarks" && <Button onClick={() => { dispatch(setEditing({ editing: story })) }} startIcon={<EditOutlined />} size='small' variant='contained' sx={{ position: 'absolute', bottom: "-3%", left: "50%", transform: 'translate(-50%,3%)', color: 'primary.main', bgcolor: 'white', '&:hover': { color: 'primary.main', bgcolor: 'white' }, zIndex: 50 }}>
                edit
            </Button>}
        </Box >
    )
}

export default SingleStory