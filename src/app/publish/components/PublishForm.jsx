'use client'
import * as yup from 'yup'
import { Formik, Field, FieldArray, Form, useField } from 'formik'
import {
  Button,
  Label,
  TextInput,
  Card,
  Textarea,
  Select,
  ToggleSwitch,
  Checkbox
} from 'flowbite-react'
import { TagsInput } from 'react-tag-input-component'
import { useState } from 'react'
import style from './tag.module.css'

/**
 * Custom component to extend Formik into Flowbite React TextInput component.
 *
 * @param {*} label The content for a Flowbite React Label component.
 * @returns returns a JSX element that uses Flowbite React TextInput with Formik functions & props.
 */
const CustomTextInput = ({ label, ...props }) => {
  // useField() returns an array containing [fieldProps, fieldMeta]
  // Spread these onto the input and use them to manage validation and error display
  const [field, meta] = useField(props)
  return (
    <>
      {label &&
        <div className='mb-2 block'>
          <Label htmlFor={props.id || props.name} value={label} />
        </div>}
      <TextInput
        {...field}
        {...props}
        helperText={meta.touched && meta.error ? meta.error : ''}
        color={meta.touched && meta.error ? 'failure' : 'gray'}
      />

    </>
  )
}

export default function FormSteps () {
  const [switchQuery, setSwitchQuery] = useState(true)
  const [switchPII, setSwitchPII] = useState(true)
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => setActiveStep((cur) => cur + 1)
  const handlePrev = () => setActiveStep((cur) => cur - 1)

  const steps = ['Asset Definition', 'Access', 'Pricing & Policies', 'Review & Submit']
  //
  // STEP 1
  //
  // Using validationSchema for standard validation. Use a custom validate function for more complex cases.
  const vaidationSchemaStepOne = yup.object({
    name: yup.string().required('Name is required'),
    short_description: yup.string().required('A short description is required'),
    description: yup.string().required('A detailed description is required'),
    picture_url: yup.string().required('A URL to a image is required')
  })
  const initialValuesStepOneEmpty = {
    name: '',
    short_description: '',
    description: '',
    picture_url: '',
    keywords: []
  }
  const [initialValuesStepOne, setInitialValuesStepOne] = useState(initialValuesStepOneEmpty)

  //
  // STEP 2
  //
  const vaidationSchemaStepTwo = yup.object({
    url: yup.string().url('Must be a URL').required('URL is required'),
    url_action: yup.string().required().oneOf(['GET', 'POST']).label('url_action'),
    headers: yup.array().of(yup.object().shape({
      key: yup.string().required('A Key is required for theHeader'),
      value: yup.string().required('A Value is required for the Header')
    })),
    queries: yup.array()
      .when('switchQuery', {
        is: () => { return switchQuery },
        then: () => yup.array().of(yup.object().shape({
          name: yup.string().required('A Name is required'),
          label: yup.string().required('A Label is required'),
          description: yup.string().required('A Description is required'),
          type: yup.string().required().oneOf(['text', '...']).label('type'),
          default_value: yup.string().required('A Default Value is required'),
          required: yup.boolean()
        }))
      }),
    license: yup.string().required('A License is required'),
    terms_and_condition: yup.string().required('Terms & Conditions is required'),
    data_controller: yup.string().when('switchPII', {
      is: () => { return switchPII },
      then: () => yup.string().required('Data Controller required')
    }),
    legal_basis: yup.string().when('switchPII', {
      is: () => { return switchPII },
      then: () => yup.string().required('Legal Basis required')
    }),
    purpose: yup.string().when('switchPII', {
      is: () => { return switchPII },
      then: () => yup.string().required('Purpose required')
    }),
    data_protection_contract_point: yup.string().when('switchPII', {
      is: () => { return switchPII },
      then: () => yup.string().required('Data Protection Contract point required')
    }),
    consent_withdrawal_contact_point: yup.string().when('switchPII', {
      is: () => { return switchPII },
      then: () => yup.string().required('Consent Withdrawal Contact Point required')
    })
  })
  const initialValuesStepTwoEmpty = {
    url: '',
    url_action: 'POST',
    headers: [{ key: '', value: '' }],
    queries: [{
      name: '',
      label: '',
      description: '',
      type: 'text',
      default_value: '',
      required: true
    }],
    license: '',
    terms_and_condition: '',
    data_controller: '',
    legal_basis: '',
    purpose: '',
    data_protection_contract_point: '',
    consent_withdrawal_contact_point: ''
  }
  const [initialValuesStepTwo, setInitialValuesStepTwo] = useState(initialValuesStepTwoEmpty)

  return (
    <div className='flex flex-col items-center justify-center mt-4'>
      {/* Stepper */}
      <Card className='w-1/2 mt-8 items-center'>
        <ol className='items-center w-full space-y-4 xl:flex xl:space-x-8 xl:space-y-0 rtl:space-x-reverse'>
          {steps.map((_step, index) => (
            <li key={index} className={'flex items-center space-x-2.5 rtl:space-x-reverse ' + (activeStep === index ? 'text-blue-600' : 'text-gray-500')}>
              <span className={'flex items-center justify-center w-6 h-6 border border-blue-600 rounded-full shrink-0 ' + (activeStep === index ? 'border-blue-600' : 'border-gray-500')}>
                {index + 1}
              </span>
              <span className='pr-2'>
                <h3 className='font-medium leading-tight'>{_step}</h3>
              </span>
              {(index + 1) !== steps.length &&
                <svg className='w-5 h-5 ms-2 xl:ms-4 rtl:rotate-180' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 12 10'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m7 9 4-4-4-4M1 9l4-4-4-4' />
                </svg>}
            </li>
          ))}
        </ol>
      </Card>

      {/* --------------- Step 1 ---------------  */}
      {activeStep === 0 &&
        <Card className='w-1/2 mt-6'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Asset definition</h5>
          <Formik
            initialValues={initialValuesStepOne}
            validationSchema={vaidationSchemaStepOne}
            validateOnBlur
            onSubmit={values => {
              console.log(values)
              setInitialValuesStepOne(values)
              handleNext()
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue, setFieldTouched }) => (
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
                <div className='mb-2 block'>
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
                <div className='mb-2 block'>
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
        </Card>}

      {/* --------------- Step 2 ---------------  */}
      {activeStep === 1 &&
        <Card className='w-1/2 mt-6'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Access Type</h5>
          <Formik
            initialValues={initialValuesStepTwo}
            validationSchema={vaidationSchemaStepTwo}
            validateOnBlur
            onSubmit={values => {
              // TODO: Handle the removal of JSON Formik values when toggles are off
              // Handle maybe here the 'removing' from the JSON Formik values if toggles are off
              setInitialValuesStepTwo(values)
              console.log(values)
              handleNext()
            }}
          >

            {({ values }) => (
              <Form>
                <div className='mb-2 block'>
                  <Label htmlFor='mehtod' value='URL' />
                </div>
                <div className='flex pb-6'>
                  <Field as={Select} name='url_action' className='w-1/6'>
                    <option defaultValue>POST</option>
                    <option>GET</option>
                  </Field>
                  <div className='w-full'>
                    <CustomTextInput
                      name='url'
                      placeholder='http://exampleURL.com'
                      className='w-full'
                    />
                  </div>
                </div>
                <Card className='mt-6'>
                  <div className='mb-2 block'>
                    <Label htmlFor='headers' value='Headers' />
                  </div>
                  <FieldArray
                    name='headers'
                    render={arrayHelpers => (
                      // TODO: Refactor the render prop usage in FieldArray
                      // Kinda don't like the render prop here, but is required on FieldArray, and I just call more components
                      // somewhat it doesnt have much sense to isolate these on single files, nor is going to be re-used (it wold contain
                      // different code probably), and is using the headers value to map (and this is outside of the FieldArray, so creating a
                      // single file component... passing props child to parent just for it? messy :/ )
                      <div>
                        {values.headers.map((_header, index) => (
                          <div key={index}>
                            <div className='grid gap-6 mb-3 md:grid-cols-2'>
                              <div>
                                <CustomTextInput
                                  label='Key'
                                  name={`headers.${index}.key`}
                                  placeholder='Key'
                                />
                              </div>
                              <div>
                                <CustomTextInput
                                  label='Value'
                                  name={`headers.${index}.value`}
                                  placeholder='Value'
                                />
                              </div>
                            </div>
                            <div className='flex justify-end space-x-2'>
                              <div>
                                <Button
                                  size='xs'
                                  outline
                                  color='failure'
                                  onClick={() => arrayHelpers.remove(index)} // remove while using the index
                                  disabled={values.headers.length < 2}
                                >
                                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='mr-2 h-5 w-5'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                                  </svg>
                                  Remove header
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className='flex justify-end space-x-2 mt-6'>
                          <div>
                            <Button
                              size='xs'
                              outline
                              onClick={() => arrayHelpers.push(initialValuesStepTwo.headers[0])} // insert a header initialValue object
                            >
                              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='mr-2 h-5 w-5'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                              </svg>
                              Add header
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </Card>
                <Card className='mt-6'>
                  <div className='mb-2 block'>
                    <ToggleSwitch checked={switchQuery} label='Query Parameters' onChange={setSwitchQuery} />
                  </div>
                  <FieldArray
                    name='queries'
                    render={arrayHelpers => (
                      <div className={`transition-all duration-700 ease-in-out ${switchQuery ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        {values.queries.map((_query, index) => (
                          <div key={index}>
                            <h4 className='text-2xl font-bold tracking-tight mb-4'>Parameter {index + 1}</h4>
                            <div className='grid gap-6 mb-3 md:grid-cols-2'>
                              <div>
                                <CustomTextInput
                                  label='Name'
                                  name={`queries.${index}.name`}
                                  placeholder=''
                                  disabled={!switchQuery}
                                />
                              </div>
                              <div>
                                <CustomTextInput
                                  label='Label'
                                  name={`queries.${index}.label`}
                                  placeholder=''
                                  disabled={!switchQuery}
                                />
                              </div>
                            </div>
                            <CustomTextInput
                              label='Description'
                              name={`queries.${index}.description`}
                              placeholder=''
                              disabled={!switchQuery}
                            />
                            <div className='mb-2 block'>
                              <Label htmlFor='type' value='Type' />
                            </div>
                            <div className='flex pb-6'>
                              <Field as={Select} name={`queries.${index}.type`} className='w-1/6' disabled={!switchQuery}>
                                <option defaultValue>text</option>
                                <option>...</option>
                              </Field>
                              <div className='w-full'>
                                <CustomTextInput
                                  name={`queries.${index}.default_value`}
                                  placeholder='Default value here'
                                  className='w-full'
                                  disabled={!switchQuery}
                                />
                              </div>
                            </div>
                            <div className='flex items-center gap-2'>
                              <Field as={Checkbox} name={`queries.${index}.required`} defaultChecked disabled={!switchQuery} />
                              <Label htmlFor='required'>Required</Label>
                            </div>
                            <div className='flex justify-end space-x-2'>
                              <div>
                                <Button
                                  size='xs'
                                  outline
                                  color='failure'
                                  onClick={() => arrayHelpers.remove(index)} // remove while using the index
                                  disabled={values.queries.length < 2}
                                >
                                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='mr-2 h-5 w-5'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                                  </svg>
                                  Remove Query
                                </Button>
                              </div>
                            </div>
                            <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
                          </div>
                        ))}
                        <div className='flex justify-end space-x-2 mt-6'>
                          <div>
                            <Button
                              size='xs'
                              outline
                              onClick={() => arrayHelpers.push(initialValuesStepTwo.queries[0])} // insert a query initialValue object
                              disabled={!switchQuery}
                            >
                              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='mr-2 h-5 w-5'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                              </svg>
                              Add Query
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </Card>
                <h5 className='mb-2 mt-6 mb-4 text-2xl font-bold tracking-tight text-gray-900'>Rights & Usage</h5>
                <CustomTextInput
                  label='License'
                  name='license'
                  placeholder='MIT'
                />
                <CustomTextInput
                  label='Terms & Conditions'
                  name='terms_and_condition'
                  placeholder='http://example.url.com/terms.json'
                />
                <div className='mb-4 mt-4 block'>
                  <ToggleSwitch checked={switchPII} label='The dataset contains personal identifiable information' onChange={setSwitchPII} />
                </div>
                <div className={`transition-all duration-700 ease-in-out ${switchPII ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  <Card className='mt-6'>
                    <h4 className='text-2xl font-bold tracking-tight mb-4'>Personal Identifiliable Info</h4>
                    <div className='grid gap-6 md:grid-cols-2'>
                      <div>
                        <CustomTextInput
                          label='Data controller'
                          name='data_controller'
                          placeholder=''
                          disabled={!switchPII}
                        />
                      </div>
                      <div>
                        <CustomTextInput
                          label='Legal Basis'
                          name='legal_basis'
                          placeholder='GDRP2016:6.1.a'
                          disabled={!switchPII}
                        />
                      </div>
                    </div>
                    <CustomTextInput
                      label='Purpose'
                      name='purpose'
                      placeholder='ServiceOptimization'
                      disabled={!switchPII}
                    />
                    <div className='grid gap-6 md:grid-cols-2'>
                      <div>
                        <CustomTextInput
                          label='Data Proctection Contact Point'
                          name='data_protection_contract_point'
                          placeholder=''
                          disabled={!switchPII}
                        />
                      </div>
                      <div>
                        <CustomTextInput
                          label='Consent withdrawal contact point'
                          name='consent_withdrawal_contact_point'
                          placeholder=''
                          disabled={!switchPII}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
                <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
                <div className='flow-root'>
                  <Button className='float-right' type='submit'>Next</Button>
                  <Button className='float-left' onClick={() => handlePrev()}>Cancel</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>}
    </div>
  )
}
