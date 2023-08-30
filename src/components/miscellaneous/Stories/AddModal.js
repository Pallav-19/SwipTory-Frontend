import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddForm from './AddForm';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '1.25rem !important'
};

export default function AddModal({ open, handleClose }) {
    return (
        <div>
            <Modal

                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        sx={{ marginRight: 0 }}
                        edge="end"
                        color="inherit"
                        onClick={() => {
                            handleClose();

                        }}
                        aria-label="close"
                        style={{ position: 'absolute', top: 5, right: 5 }}

                    >
                        <Close />
                    </IconButton>

                    <AddForm handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}
