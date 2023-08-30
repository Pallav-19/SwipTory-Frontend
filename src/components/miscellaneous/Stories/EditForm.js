import React from 'react';
import { Button, MenuItem, Select, TextField, Typography, Box, } from '@mui/material';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../../features/notificationSlice';
import { useEditStoryMutation } from '../../../features/api/storyApiSlice';
import Loader from '../Loader';
import { currentEditing, setEditing, updateCurrentStory, updateMyStories, updateStories } from '../../../features/storySlice';

const categories = ["FOOD", 'TRAVEL', 'WORLD', 'EDUCATION', 'HEALTH', 'FITNESS', "ENTERTAINMENT"];

const EditForm = () => {
    const validationSchema = Yup.object().shape({
        heading: Yup.string().required('Heading is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.string().required('Image URL is required'),
        category: Yup.string().required('Category is required'),
    });
    const dispatch = useDispatch()
    const [editStory, { isLoading }] = useEditStoryMutation()
    const editing = useSelector(currentEditing)
    return (
        <Formik
            initialValues={{
                heading: editing.heading,
                description: editing.description,
                image: editing.image,
                category: editing.category,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const { data } = await editStory({ ...values, id: editing._id })
                    if (data) {
                        dispatch(updateCurrentStory({ story: data?.story }))
                        dispatch(updateStories({ result: data?.story, id: editing._id }))
                        dispatch(updateMyStories({ result: data?.story, id: editing._id }))
                        dispatch(setEditing({ editing: null }))
                        dispatch(addNotification({ mesasge: "Updated Story!", id: Date.now() }))

                    }
                    if (!data) dispatch(addNotification({ id: Date.now(), message: "Something went wrong!" }))
                } catch (error) {
                    dispatch(addNotification({ mesasge: "Something Went Wrong", id: Date.now() }))
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ handleSubmit, isSubmitting, values }) => (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!values.heading || !values.description || !values.category || !values.image) {
                        dispatch(addNotification({ id: Date.now(), message: "Some values are missing!" }));
                    } else {
                        handleSubmit();
                    }
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Heading</Typography>
                                <Field name="heading" as={TextField} fullWidth />
                                <ErrorMessage render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>} name="heading" component="div" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Description</Typography>
                                <Field name="description" as={TextField} fullWidth />
                                <ErrorMessage render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>} name="description" component="div" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Image URL</Typography>
                                <Field name="image" as={TextField} fullWidth />
                                <ErrorMessage render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>} name="image" component="div" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Category</Typography>
                                <Field name="category" as={Select} label="Category">
                                    {categories.map((category, categoryIndex) => (
                                        <MenuItem key={categoryIndex} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Field>
                                <ErrorMessage render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>} name="category" component="div" />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", gap: 5, width: "100%", marginTop: 3, }}>
                            <Button
                                onClick={() => dispatch(setEditing({ editing: null }))}
                                variant='contained'
                                color='error'
                                type="button"
                                size='large'
                                disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                color='success'
                                type="submit"
                                size='large'
                                disabled={isSubmitting}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                    {isLoading && <Loader />}
                </form>
            )}
        </Formik>
    );
};

export default EditForm;
