import React from 'react';
import { Button, MenuItem, Select, TextField, Tabs, Tab, Typography, Box } from '@mui/material';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { Add, Close } from '@mui/icons-material';
import * as Yup from 'yup';

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

const categories = ["FOOD", 'TRAVEL', 'WORLD', 'EDUCATION', 'HEALTH', 'FITNESS', "ENTERTAINMENT"];

const FormComponent = () => {
    return (
        <Formik
            initialValues={{ stories: [{ heading: '', description: '', image: '', category: '' }, { heading: '', description: '', image: '', category: '' }, { heading: '', description: '', image: '', category: '' }], activeTabIndex: 0 }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(false);
            }}
        >
            {({ values, handleSubmit, isSubmitting, setFieldValue, errors }) => (
                <form onSubmit={handleSubmit}>
                    <FieldArray name="stories">
                        {({ push, remove }) => (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <Box sx={{ display: 'flex', maxWidth: '100%', alignItems: 'center', justifyContent: 'space-between' }}>

                                    <Tabs variant='scrollable' scrollButtons='auto' value={values.activeTabIndex} onChange={(event, newValue) => setFieldValue('activeTabIndex', newValue)}>
                                        {values.stories.map((item, index) => (
                                            <Tab icon={index > 2 && <Close onClick={() => { remove(index); setFieldValue("activeTabIndex", Math.max(0, index - 1)) }} sx={{ fontSize: "1rem", color: 'red' }} />} iconPosition='end' sx={{ border: '1px solid rgba(0,0,0,0.2)', borderRadius: '0.5rem', margin: '0.5rem', padding: "0.2rem", height: "4rem", width: "4rem", boxShadow: '1px 2px 3px rgba(0,0,0,0.3)', position: 'relative' }} key={index} label={`Slide ${index + 1}`} />
                                        ))}
                                    </Tabs>
                                    <Button disabled={values.stories.length >= 6} sx={{ borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.3)', boxShadow: '1px 2px 5px rgba(0,0,0,0.4)', height: '4rem', width: '4rem', padding: '0.2rem', color: 'black' }} onClick={() => { push({ heading: '', description: '', image: '', category: '' }); setFieldValue('activeTabIndex', values?.stories?.length) }} >
                                        <Add />
                                    </Button>
                                </Box>
                                {values.stories.map((item, index) => (
                                    <div key={index} style={{ display: index === values.activeTabIndex ? 'flex' : 'none', flexDirection: 'column', gap: 6, width: 'inherit', marginTop: 10 }}>
                                        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Heading</Typography>
                                            <Box>

                                                <Field style={{ width: "20rem" }} name={`stories[${index}].heading`} as={TextField} fullWidth />
                                                <ErrorMessage render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>} name={`stories[${index}].heading`} component="div" />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Description</Typography>
                                            <Box>
                                                <Field style={{ width: "20rem" }} name={`stories[${index}].description`} as={TextField} fullWidth />
                                                <ErrorMessage render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>} name={`stories[${index}].description`} component="div" />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Image URL</Typography>
                                            <Box>
                                                <Field style={{ width: "20rem" }} name={`stories[${index}].image`} as={TextField} />
                                                <ErrorMessage render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>} name={`stories[${index}].image`} component="div" />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Category</Typography>
                                            <Box>
                                                <Field style={{ width: "20rem" }} name={`stories[${index}].category`} as={Select} label="Category">
                                                    {categories.map((category, categoryIndex) => (
                                                        <MenuItem key={categoryIndex} value={category}>
                                                            {category}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                                <ErrorMessage render={msg => <Typography sx={{ color: 'red' }}>{msg}</Typography>} name={`stories[${index}].category`} component="div" />
                                            </Box>
                                        </Box>

                                    </div>
                                ))}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-start", gap: 5, width: "100%" }}>

                                    <Button onClick={() => { setFieldValue('activeTabIndex', values.activeTabIndex - 1) }} variant='contained' color='warning' type="button" disabled={isSubmitting || (values.activeTabIndex === 0)}>
                                        Previous
                                    </Button>
                                    <Button onClick={() => { setFieldValue('activeTabIndex', values.activeTabIndex + 1) }} variant='contained' color='success' type="button" disabled={isSubmitting || (values.activeTabIndex === values.stories.length - 1)}>
                                        Next
                                    </Button>
                                    <Button variant='contained' sx={{ marginLeft: 'auto' }} type="submit" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </FieldArray>

                </form>
            )}
        </Formik>
    );
};

export default FormComponent;
