import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {  useSelector } from 'react-redux';
import { currentEditing,  } from '../features/storySlice';
import EditForm from './miscellaneous/Stories/EditForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: 500, xs: '95vw' },
    bgcolor: 'background.paper',
    border: '1px solid rgba(0,0,0,0.3)',
    boxShadow: '1px 2px 5px rgba(0,0,0,0.4)',
    p: 4,
    borderRadius: '1.2rem',

};

export default function EditModal() {
    const editing = useSelector(currentEditing)

    return (
        <div>
            <Modal
                open={editing}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditForm />
                </Box>
            </Modal>
        </div>
    );
}
