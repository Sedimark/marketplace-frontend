import * as yup from 'yup'
import { TagsInput } from 'react-tag-input-component'
import { Formik, Form, Field } from 'formik'
import { Button, Card, Label, Textarea } from 'flowbite-react'
import CustomTextInput from '../CustomTextInput'
import style from './tag.module.css'

const validationSchemaAssetDefinition = yup.object({
  name: yup.string().required('Name is required'),
  short_description: yup.string().required('A short description is required'),
  description: yup.string().required('A detailed description is required'),
  picture_url: yup.string().required('A URL to a image is required')
})

/**
 * Renders the AssetDefinition component.
 *
 * This function renders a form for defining an asset using Formik for form state management and validation.
 * It includes fields for name, short description, description, picture URL, and keywords. The form is wrapped
 * in a Card component for styling.
 *
 * @param {Object} initialValuesAssetDefinition - The initial values for the asset definition form.
 * @param {Function} setInitialAssetDefinition - Function to set the initial values of the asset definition form.
 * @param {Function} handleNext - Function to handle the next step action.
 * @returns {JSX.Element} The AssetDefinition component.
 */
const AssetDefinition = (initialValuesAssetDefinition, setInitialAssetDefinition, handleNext) => {
  return (
    <Card className='w-1/2 mt-6'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Asset definition</h5>
      <Formik
        initialValues={initialValuesAssetDefinition}
        validationSchema={validationSchemaAssetDefinition}
        validateOnBlur
        onSubmit={values => {
          console.log(values)
          setInitialAssetDefinition(values)
          setTimeout(() => handleNext(), 0)
        }}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <Form className={`${style.tagInput} ${style.test}`}>
            <CustomTextInput
              label='Name'
              name='name'
              placeholder='Name goes here'
            />
            <CustomTextInput
              label='Short description'
              name='short_description'
              placeholder='A short Description'
            />
            <div className='block mb-2'>
              <Label htmlFor='description' value='Description' />
            </div>
            <Field
              name='description'
              as={Textarea}
              rows={6}
              placeholder='Description here.......'
              color={
                    (touched.description && errors.description) ? 'failure' : 'gray'
                  }
              className='focus:border-2 focus:border-gray-500'
              helperText={touched.description && errors.description ? errors.description : null}
            />
            <CustomTextInput
              label='Picture'
              name='picture_url'
              placeholder='A URL for a picture'
            />
            <div className='block mb-2'>
              <Label htmlFor='keywords' value='Keywords here' />
            </div>
            <TagsInput
              name='keywords'
              classNames={{ input: 'bg-gray-50 rounded w-full focus:outline-none focus:bg-gray-100 focus:border-purple-500' }}
              value={values.keywords}
              placeholder='Tags'
              onChange={
                    // Custom change handler for TagsInput as it doesn't support Formik's handleChange
                    tags => {
                      setFieldValue('keywords', tags)
                      setFieldTouched('keywords', true, false)
                    }
                  }
            />
            <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
            <div className='flow-root'>
              <Button className='float-right' type='submit'>Next</Button>
              <Button className='float-left' disabled>Cancel</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  )
}
export default AssetDefinition
