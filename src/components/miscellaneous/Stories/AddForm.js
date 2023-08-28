import React from 'react';
import { Button, IconButton, MenuItem, Select, TextField, Tabs, Tab } from '@mui/material';
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

const categories = ['TRAVEL', 'WORLD', 'EDUCATION', 'HEALTH', 'FITNESS'];

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
            {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <FieldArray name="stories">
                        {({ push, remove }) => (
                            <div>
                                <Tabs variant='scrollable' scrollButtons='auto' value={values.activeTabIndex} onChange={(event, newValue) => setFieldValue('activeTabIndex', newValue)}>
                                    {values.stories.map((item, index) => (
                                        <Tab key={index} label={`Item ${index + 1}`} />
                                    ))}
                                </Tabs>
                                {values.stories.map((item, index) => (
                                    <div key={index} style={{ display: index === values.activeTabIndex ? 'block' : 'none' }}>
                                        <h3>Item {index + 1}</h3>
                                        <div>
                                            <Field name={`stories[${index}].heading`} as={TextField} label="Heading" fullWidth />
                                            <ErrorMessage name={`stories[${index}].heading`} component="div" />
                                        </div>
                                        <div>
                                            <Field name={`stories[${index}].description`} as={TextField} label="Description" fullWidth />
                                            <ErrorMessage name={`stories[${index}].description`} component="div" />
                                        </div>
                                        <div>
                                            <Field name={`stories[${index}].image`} as={TextField} label="Image URL" fullWidth />
                                            <ErrorMessage name={`stories[${index}].image`} component="div" />
                                        </div>
                                        <div>
                                            <Field name={`stories[${index}].category`} as={Select} label="Category">
                                                {categories.map((category, categoryIndex) => (
                                                    <MenuItem key={categoryIndex} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                            <ErrorMessage name={`stories[${index}].category`} component="div" />
                                        </div>
                                        <IconButton onClick={() => remove(index)}>
                                            <Close />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button onClick={() => push({ heading: '', description: '', image: '', category: '' })} startIcon={<Add />}>
                                    Add Item
                                </Button>
                            </div>
                        )}
                    </FieldArray>
                    <Button type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default FormComponent;
