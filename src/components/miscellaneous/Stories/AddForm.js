import React from 'react';
import { Button, MenuItem, Select, TextField, Tabs, Tab, Typography, Box, useMediaQuery } from '@mui/material';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { Add, Close } from '@mui/icons-material';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../features/notificationSlice';
import { useAddStoryMutation } from '../../../features/api/storyApiSlice';
import Loader from '../Loader';
import { addStory as afterAdding } from '../../../features/storySlice';

const categories = ["FOOD", 'TRAVEL', 'WORLD', 'EDUCATION', 'HEALTH', 'FITNESS', "ENTERTAINMENT"];

const AddForm = ({ handleClose }) => {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const validationSchema = Yup.object().shape({
        stories: Yup.array()
            .of(
                Yup.object().shape({
                    heading: Yup.string().required('Heading is required'),
                    description: Yup.string().required('Description is required'),
                    image: Yup.string().required('Image URL is required'),
                    category: Yup.string().required('Category is required'),
                })
            )
            .min(3, 'You need to have at least 3 stories'),
    });
    const dispatch = useDispatch()
    const [addStory, { isLoading }] = useAddStoryMutation()
    return (
        <Formik
            initialValues={{
                stories:
                    [{ heading: '', description: '', image: '', category: '' },
                    { heading: '', description: '', image: '', category: '' },
                    { heading: '', description: '', image: '', category: '' }],
                activeTabIndex: 0
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                const { stories } = values
                try {
                    const { data } = await addStory({ stories })
                    if (data) {
                        dispatch(afterAdding({ story: data.result }));
                    }
                    if (!data) dispatch(addNotification({ id: Date.now(), message: "Something went wrong!" }))
                    handleClose()
                } catch (error) {
                    dispatch(addNotification({ mesasge: "Something Went Wrong", id: Date.now() }))
                } finally {

                    setSubmitting(false);
                }
            }}
        >
            {({ values, handleSubmit, isSubmitting, setFieldValue, errors }) => (
                <form onSubmit={(e) => {
                    e.preventDefault()
                    values.stories.forEach((x, index) => {
                        if (!x.heading || !x.description || !x.category || !x.image) {
                            return dispatch(addNotification({ id: Date.now(), message: "Some values are missing! make sure you are adding atleast 3 slides!" }))
                        }
                    })
                    handleSubmit()
                }}>
                    <FieldArray name="stories">
                        {({ push, remove }) => (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',


                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 5,
                                    flexDirection: { md: 'column', xs: 'row' },

                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        maxWidth: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexDirection: { md: 'row', xs: 'column' }
                                    }}>

                                        <Tabs
                                            orientation={isMobile ? 'vertical' : 'horizontal'}
                                            variant='scrollable'
                                            scrollButtons='auto'
                                            value={values.activeTabIndex}
                                            onChange={(event, newValue) => setFieldValue('activeTabIndex', newValue)}>
                                            {values.stories.map((item, index) => (
                                                <Tab
                                                    icon={
                                                        values.stories.length > 3 &&
                                                        <Close
                                                            onClick={() => {
                                                                remove(index);
                                                                setFieldValue("activeTabIndex", Math.max(0, index - 1))
                                                            }}
                                                            sx={{ fontSize: "1rem", color: 'red' }}
                                                        />}
                                                    iconPosition='end'
                                                    sx={{
                                                        border: '1px solid rgba(0,0,0,0.2)',
                                                        borderRadius: '0.5rem',
                                                        margin: '0.5rem',
                                                        padding: "0.2rem",
                                                        height: { md: '4rem', xs: "2rem" },
                                                        width: { md: '4rem', xs: "2rem" },
                                                        boxShadow: '1px 2px 3px rgba(0,0,0,0.3)',
                                                        position: 'relative'
                                                    }}
                                                    key={index}
                                                    label={`Slide ${index + 1}`}
                                                />
                                            ))}
                                        </Tabs>
                                        <Button
                                            disabled={values.stories.length >= 6}
                                            sx={{
                                                borderRadius: '0.5rem',
                                                border: '1px solid rgba(0,0,0,0.3)',
                                                boxShadow: '1px 2px 5px rgba(0,0,0,0.4)',
                                                height: { md: '4rem', xs: "3rem" },
                                                width: { md: '4rem', xs: "3rem" },
                                                padding: '0.2rem',
                                                color: 'black'
                                            }}
                                            onClick={() => {
                                                push({ heading: '', description: '', image: '', category: '' });
                                                setFieldValue('activeTabIndex', values?.stories?.length)
                                            }} >
                                            <Add />
                                        </Button>
                                    </Box>
                                    {values.stories.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: index === values.activeTabIndex ? 'flex' : 'none',
                                                flexDirection: 'column',
                                                gap: { md: 2, xs: 1 },
                                                width: 'inherit',

                                            }}>
                                            <Box

                                                sx={{
                                                    display: 'flex',
                                                    gap: { md: 4, xs: 1 },
                                                    alignItems: { md: 'center', xs: 'flex-start' },
                                                    justifyContent: 'space-between', flexDirection: { md: 'row', xs: 'column' }
                                                }}>
                                                <Typography
                                                    sx={{ fontSize: '1.2rem', fontWeight: 600 }}
                                                >
                                                    Heading
                                                </Typography>
                                                <Box>

                                                    <Field
                                                        style={{ width: isMobile ? "10rem" : '20rem' }}
                                                        name={`stories[${index}].heading`}
                                                        as={TextField}
                                                        fullWidth />
                                                    <ErrorMessage
                                                        render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                        name={`stories[${index}].heading`}
                                                        component="div" />
                                                </Box>

                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: { md: 4, xs: 1 },
                                                    alignItems: { md: 'center', xs: 'flex-start' },
                                                    justifyContent: 'space-between', flexDirection: { md: 'row', xs: 'column' }
                                                }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1.2rem',
                                                        fontWeight: 600
                                                    }}>
                                                    Description
                                                </Typography>
                                                <Box>
                                                    <Field
                                                        style={{ width: isMobile ? "10rem" : '20rem' }}
                                                        name={`stories[${index}].description`}
                                                        as={TextField}
                                                        fullWidth />
                                                    <ErrorMessage
                                                        render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                        name={`stories[${index}].description`}
                                                        component="div" />
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{ display: 'flex', gap: { md: 4, xs: 1 }, alignItems: { md: 'center', xs: 'flex-start' }, justifyContent: 'space-between', flexDirection: { md: 'row', xs: 'column' } }}>
                                                <Typography
                                                    sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Image URL</Typography>
                                                <Box>
                                                    <Field
                                                        style={{ width: isMobile ? "10rem" : '20rem' }}
                                                        name={`stories[${index}].image`}
                                                        as={TextField} />
                                                    <ErrorMessage
                                                        render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>}
                                                        name={`stories[${index}].image`}
                                                        component="div" />
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{ display: 'flex', gap: { md: 4, xs: 1 }, alignItems: { md: 'center', xs: 'flex-start' }, justifyContent: 'space-between', flexDirection: { md: 'row', xs: 'column' } }}>
                                                <Typography
                                                    sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                                                    Category
                                                </Typography>
                                                <Box >
                                                    <Field
                                                        style={{ width: isMobile ? "10rem" : '20rem' }}
                                                        name={`stories[${index}].category`}
                                                        as={Select}
                                                        label="Category">
                                                        {categories.map((category, categoryIndex) => (
                                                            <MenuItem key={categoryIndex} value={category}>
                                                                {category}
                                                            </MenuItem>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        render={msg => <Typography
                                                            sx={{ color: 'red' }}>{msg}</Typography>}
                                                        name={`stories[${index}].category`} component="div" />
                                                </Box>
                                            </Box>

                                        </Box>
                                    ))}

                                </Box>

                                <Box sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: "flex-start", gap: 5, width: "100%", marginTop: 3, padding: 2
                                }}>

                                    <Button

                                        onClick={() => { setFieldValue('activeTabIndex', values.activeTabIndex - 1) }}
                                        variant='contained'
                                        color='warning'
                                        type="button"
                                        size='large'
                                        disabled={isSubmitting || (values.activeTabIndex === 0)}>
                                        Prev.
                                    </Button>
                                    <Button

                                        onClick={() => { setFieldValue('activeTabIndex', values.activeTabIndex + 1) }}
                                        variant='contained'
                                        color='success'
                                        type="button"
                                        size='large'
                                        disabled={isSubmitting || (values.activeTabIndex === values.stories.length - 1)}>
                                        Next
                                    </Button>
                                    <Button size='large' variant='contained' sx={{ marginLeft: 'auto' }} type="submit" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </FieldArray>
                    {isLoading && <Loader />}
                </form>
            )
            }

        </Formik >
    );
};

export default AddForm;
