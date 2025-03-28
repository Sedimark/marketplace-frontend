import * as yup from 'yup'
import { TagsInput } from 'react-tag-input-component'
import { Field, FieldArray, Form, Formik } from 'formik'
import { Accordion, Label, Textarea, Button, Card, Checkbox, ToggleSwitch, Select } from 'flowbite-react'
import CustomTextInput from '../CustomTextInput'
import CustomDatepicker from '../CustomDatePicker'
import style from './tag.module.css'

/**
 * Validation schema for the Asset Definition form.
 *
 * This schema uses Yup for validation and defines the constraints for each field
 * in the Asset Definition form.  It uses `yup.lazy` to dynamically define
 * the validation rules for the `queries`, `data_controller`, `legal_basis`, `purpose`,
 * `data_protection_contract_point`, and `consent_withdrawal_contact_point` fields
 * based on the values of `switchQuery` and `switchPII` respectively.
 *
 * @type {yup.ObjectSchema}
 */
const validationSchemaAssetDefinition = yup.lazy(values =>
  yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('A detailed description is required'),
    // image: yup.string().required('A URL to a image is required'),
    url: yup.string().url('Must be a URL').required('URL is required'),
    url_action: yup.string().required().oneOf(['GET']).label('url_action'),
    headers: yup.array().of(yup.object().shape({
      key: yup.string().required('A Key is required for the Header'),
      value: yup.string().required('A Value is required for the Header')
    })),
    queries: values.switchQuery
      ? yup.array().of(
        yup.object().shape({
          name: yup.string().required('A Name is required'),
          label: yup.string().required('A Label is required'),
          description: yup.string().required('A Description is required'),
          type: yup.string().required().oneOf(['text', '...']).label('type'),
          default_value: yup.string().required('A Default Value is required'),
          required: yup.boolean()
        })
      )
      : yup.array(),
    // license: yup.string().required('A License is required'),
    // terms_and_condition: yup.string().required('Terms & Conditions is required'),
    data_controller: values.switchPII ? yup.string().required('Data Controller required') : yup.string(),
    legal_basis: values.switchPII ? yup.string().required('Legal Basis required') : yup.string(),
    purpose: values.switchPII ? yup.string().required('Purpose required') : yup.string(),
    data_protection_contract_point: values.switchPII ? yup.string().required('Data Protection Contact Point required') : yup.string(),
    consent_withdrawal_contact_point: values.switchPII ? yup.string().required('Consent Withdrawal Contact Point required') : yup.string(),
    policies: yup.array().of(yup.object().shape({
      period: yup.object().shape({
        startDate: yup.string().required('A start date is required for the policy'),
        endDate: yup.string()
      }),
      policyName: yup.string().required('A name is required for the policy')
    }))
  }))

/**
 * AssetForm component for creating or updating assets.
 *
 * This component renders a form for defining and publishing assets. It uses Formik
 * for form management and Yup for validation. The form includes sections for
 * asset definition, access type, pricing & policies.  It handles form submission
 * and updates the `initialValues` state.
 *
 * @param {object} initialValues The initial values for the form.
 * @param {function} setInitialValues A function to update the initial values.
 * @param {boolean} openModal A boolean state variable to control modal visibility.
 * @param {function} setOpenModal A function to update the modal visibility state.
 * @returns {JSX.Element} The AssetForm component.
 */
export default function AssetForm (initialValues, setInitialValues, openModal, setOpenModal) {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaAssetDefinition}
        validateOnBlur
        onSubmit={values => {
          console.log(values)
          setInitialValues(values)
          setOpenModal(true)
        }}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <Form className={`${style.tagInput} ${style.test}`}>
            <Accordion className='bg-white'>
              <Accordion.Panel>
                <Accordion.Title className='bg-white mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                  Asset definition
                </Accordion.Title>
                <Accordion.Content>
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
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <Accordion className='bg-white mt-4'>
              <Accordion.Panel>
                <Accordion.Title className='bg-white mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                  Access Type
                </Accordion.Title>
                <Accordion.Content>
                  <div className='block mb-2'>
                    <Label htmlFor='mehtod' value='URL' />
                  </div>
                  <div className='flex pb-6'>
                    <Field as={Select} name='url_action' className='w-1/6'>
                      <option defaultValue>GET</option>
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
                    <div className='block mb-2'>
                      <Label htmlFor='headers' value='Headers' />
                    </div>
                    <FieldArray
                      name='headers'
                      render={arrayHelpers => (
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
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 mr-2'>
                                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                                    </svg>
                                    Remove header
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className='flex justify-end mt-6 space-x-2'>
                            <div>
                              <Button
                                size='xs'
                                outline
                                onClick={() => arrayHelpers.push(initialValues.headers[0])}
                              >
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 mr-2'>
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
                    <div className='block mb-2'>
                      <ToggleSwitch
                        checked={values.switchQuery}
                        label='Query Parameters'
                        onChange={checked => setFieldValue('switchQuery', checked)}
                      />
                    </div>
                    <FieldArray
                      name='queries'
                      render={arrayHelpers => (
                        <div className={`transition-all duration-700 ease-in-out ${values.switchQuery ? 'opacity-100' : 'opacity-0 hidden'}`}>
                          {values.queries.map((_query, index) => (
                            <div key={index}>
                              <h4 className='mb-4 text-2xl font-bold tracking-tight'>Parameter {index + 1}</h4>
                              <div className='grid gap-6 mb-3 md:grid-cols-2'>
                                <div>
                                  <CustomTextInput
                                    label='Name'
                                    name={`queries.${index}.name`}
                                    placeholder=''
                                  />
                                </div>
                                <div>
                                  <CustomTextInput
                                    label='Label'
                                    name={`queries.${index}.label`}
                                    placeholder=''
                                  />
                                </div>
                              </div>
                              <CustomTextInput
                                label='Description'
                                name={`queries.${index}.description`}
                                placeholder=''
                              />
                              <div className='block mb-2'>
                                <Label htmlFor='type' value='Type' />
                              </div>
                              <div className='flex pb-6'>
                                <Field as={Select} name={`queries.${index}.type`} className='w-1/6'>
                                  <option defaultValue>text</option>
                                  <option>...</option>
                                </Field>
                                <div className='w-full'>
                                  <CustomTextInput
                                    name={`queries.${index}.default_value`}
                                    placeholder='Default value here'
                                    className='w-full'
                                  />
                                </div>
                              </div>
                              <div className='flex items-center gap-2'>
                                <Field as={Checkbox} name={`queries.${index}.required`} defaultChecked />
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
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 mr-2'>
                                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                                    </svg>
                                    Remove Query
                                  </Button>
                                </div>
                              </div>
                              <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
                            </div>
                          ))}
                          <div className='flex justify-end mt-6 space-x-2'>
                            <div>
                              <Button
                                size='xs'
                                outline
                                onClick={() => arrayHelpers.push(initialValues.queries[0])}
                              >
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 mr-2'>
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

                  <h5 className='mt-6 mb-4 text-2xl font-bold tracking-tight text-gray-900'>Rights & Usage</h5>
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
                  <div className='block mt-4 mb-4'>
                    <ToggleSwitch
                      checked={values.switchPII}
                      label='The dataset contains personal identifiable information'
                      onChange={checked => setFieldValue('switchPII', checked)}
                    />
                  </div>
                  <div className={`transition-all duration-700 ease-in-out ${values.switchPII ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <Card className='mt-6'>
                      <h4 className='mb-4 text-2xl font-bold tracking-tight'>Personal Identifiliable Info</h4>
                      <div className='grid gap-6 md:grid-cols-2'>
                        <div>
                          <CustomTextInput
                            label='Data controller'
                            name='data_controller'
                            placeholder=''
                          />
                        </div>
                        <div>
                          <CustomTextInput
                            label='Legal Basis'
                            name='legal_basis'
                            placeholder='GDRP2016:6.1.a'
                          />
                        </div>
                      </div>
                      <CustomTextInput
                        label='Purpose'
                        name='purpose'
                        placeholder='ServiceOptimization'
                      />
                      <div className='grid gap-6 md:grid-cols-2'>
                        <div>
                          <CustomTextInput
                            label='Data Proctection Contact Point'
                            name='data_protection_contract_point'
                            placeholder=''
                          />
                        </div>
                        <div>
                          <CustomTextInput
                            label='Consent withdrawal contact point'
                            name='consent_withdrawal_contact_point'
                            placeholder=''
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <Accordion className='bg-white mt-4'>
              <Accordion.Panel>
                <Accordion.Title className='bg-white mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                  Pricing & Policy
                </Accordion.Title>
                <Accordion.Content>
                  <div className='block mb-2'>
                    <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900'>Policies</h5>
                  </div>
                  <FieldArray
                    name='policies'
                    render={arrayHelpers => (
                      <div>
                        {values.policies.map((_header, index) => (
                          <Card className='mb-6' key={index}>
                            <div className='mb-6' key={index}>
                              <div className='mb-4'>
                                <CustomTextInput
                                  label='Policy name'
                                  name={`policies.${index}.policyName`}
                                  placeholder=''
                                />
                              </div>
                              <div>
                                <CustomDatepicker
                                  name={`policies.${index}.period`}
                                  label='Date range'
                                />
                              </div>
                            </div>
                          </Card>
                        ))}
                        <div className='flex justify-end space-x-2'>
                          <div>
                            <Button
                              size='xs'
                              outline
                              onClick={() => arrayHelpers.push(initialValues.policies[0])}
                            >
                              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 mr-2'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                              </svg>
                              Add policy
                            </Button>
                          </div>
                          <div>
                            <Button
                              size='xs'
                              outline
                              color='failure'
                              onClick={() => arrayHelpers.remove()} // insert an empty string at a position
                              disabled={values.policies.length < 2}
                            >
                              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 mr-2'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                              </svg>
                              Remove policy
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <div className='flow-root py-2'>
              <Button className='float-right' type='submit'>Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
