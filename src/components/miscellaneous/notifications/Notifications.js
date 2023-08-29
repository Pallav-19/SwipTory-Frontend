import React from 'react';
import { Snackbar, SnackbarContent, IconButton, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../../../features/notificationSlice';
import CloseIcon from '@mui/icons-material/Close';
const Notifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notification.notifications);

    const handleClose = (id) => {
        dispatch(removeNotification(id));
    };

    return (
        <Box>
            {
                notifications.map((notification) => (
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} key={notification.id} open={true} onClose={() => handleClose(notification.id)}>
                        <SnackbarContent
                            message={notification.message}
                            action={
                                <IconButton size="small" color="inherit" onClick={() => handleClose(notification.id)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        />
                    </Snackbar>
                ))
            }
        </Box >
    );
};

export default Notifications;
