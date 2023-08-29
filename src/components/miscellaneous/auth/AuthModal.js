/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { AuthValidation } from '../../../validations/AuthValidation';
import { useFormik } from 'formik';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { useLoginMutation, useRegisterMutation } from '../../../features/api/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../features/authSlice';
import { close, currentContext, currentOpenStatus } from '../../../features/authModalSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: 500, xs: '90vw' },
    bgcolor: 'background.paper',
    border: '1px solid rgba(0,0,0,0.3)',
    boxShadow: '1px 2px 5px rgba(0,0,0,0.4)',
    p: 4,
    borderRadius: '1.2rem'
};

export default function AuthModal() {
    const [login, { isLoading }] = useLoginMutation()
    const [register] = useRegisterMutation()
    const isOpen = useSelector(currentOpenStatus)
    const context = useSelector(currentContext)
    const dispatch = useDispatch()
    const handleClose = () => dispatch(close())

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: AuthValidation,
        onSubmit: async (values) => {
            try {

                const { data } = context === 'login' ? await login({ ...values }) : await register({ ...values })
                dispatch(setCredentials({ token: data.token, user: data.user }))
            } catch (error) {

            } finally {
                handleClose()
                formik.resetForm({
                    values: { username: '', password: '' },
                    errors: {},
                    touched: {},
                });
            }
        },
    });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={() => {
                    handleClose();
                    formik.resetForm({
                        values: { username: '', password: '' },
                        errors: {},
                        touched: {},
                    });
                }}
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
                            formik.resetForm({
                                values: { username: '', password: '' },
                                errors: {},
                                touched: {},
                            });
                        }}
                        aria-label="close"
                        style={{ position: 'absolute', top: 0, right: 0 }}

                    >
                        <Close />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 600, letterSpacing: 1, textAlign: 'center' }} >
                        {context === "login" ? "Login to SwipTory" : "Register to SwipTory"}
                    </Typography>
                    <Container sx={{ mt: 3 }} maxWidth="sm">
                        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit() }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 3 }, flexDirection: { md: 'row', xs: 'column' } }}>
                                <Typography>Username</Typography>
                                <TextField
                                    id="username"
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />

                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 3 }, flexDirection: { md: 'row', xs: 'column' } }}>
                                <Typography>Password</Typography>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleTogglePassword}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center', width
                                    : '100%',
                                mt: 3
                            }}>
                                <Button type="submit" variant="contained" sx={{ borderRadius: '1.25rem', bgcolor: '#73ABFF', '&:hover': { bgcolor: '#73ABFF', } }}>
                                    {context === "login" ? "Login" : "Register"}
                                </Button>
                            </Box>
                        </form>
                    </Container>
                </Box>
            </Modal>
        </div>
    );
}
