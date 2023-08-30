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
    width: { md: 600, xs: "100vw" },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '1.25rem !important',
    maxHeight: "100vh",
    overflowY: 'scroll'
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
