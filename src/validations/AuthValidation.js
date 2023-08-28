import * as Yup from 'yup';

export const AuthValidation = Yup.object().shape({
    username: Yup.string()
        .min(5, 'Username must be at least 5 characters')
        .required('Username is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z0-9]).{8,}$/,
            'Password must be 8 characters with alpha numerics and capital letters'
        )
        .required('Password is required'),
});


