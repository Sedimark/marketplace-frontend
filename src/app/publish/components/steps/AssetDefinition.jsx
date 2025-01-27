import * as yup from 'yup'
import { TagsInput } from 'react-tag-input-component'
import { Formik, Form, Field } from 'formik'
import { Accordion, Label, Textarea } from 'flowbite-react'
import CustomTextInput from '../CustomTextInput'
import style from './tag.module.css'

const validationSchemaAssetDefinition = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('A detailed description is required'),
  image: yup.string().required('A URL to a image is required')
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
const AssetDefinition = (initialValuesAssetDefinition, setInitialValuesAssetDefinition) => {
  return (
    <Accordion className=' w-1/2 bg-white mt-4'>
      <Accordion.Panel>
        <Accordion.Title className='bg-white mb-2 text-2xl font-bold tracking-tight text-gray-900'>
          Asset definition
        </Accordion.Title>
        <Accordion.Content>
          <Formik
            initialValues={initialValuesAssetDefinition}
            validationSchema={validationSchemaAssetDefinition}
            validateOnBlur
            onSubmit={values => {
              console.log(values)
              setInitialValuesAssetDefinition(values)
            }}
          >
            {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
              <Form className={`${style.tagInput} ${style.test}`}>
                <CustomTextInput
                  label='Title'
                  name='title'
                  placeholder='Title goes here'
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
                  name='image'
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
              </Form>
            )}
          </Formik>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}

export default AssetDefinition
