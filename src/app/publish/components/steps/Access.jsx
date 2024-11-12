import * as yup from 'yup'
import { Field, FieldArray, Form, Formik } from 'formik'
import { Button, Card, Checkbox, Label, ToggleSwitch, Select } from 'flowbite-react'
import CustomTextInput from '../CustomTextInput'

const validationSchemaAccess = yup.lazy(values =>
  yup.object({
    url: yup.string().url('Must be a URL').required('URL is required'),
    url_action: yup.string().required().oneOf(['GET', 'POST']).label('url_action'),
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
    license: yup.string().required('A License is required'),
    terms_and_condition: yup.string().required('Terms & Conditions is required'),
    data_controller: values.switchPII ? yup.string().required('Data Controller required') : yup.string(),
    legal_basis: values.switchPII ? yup.string().required('Legal Basis required') : yup.string(),
    purpose: values.switchPII ? yup.string().required('Purpose required') : yup.string(),
    data_protection_contract_point: values.switchPII ? yup.string().required('Data Protection Contact Point required') : yup.string(),
    consent_withdrawal_contact_point: values.switchPII ? yup.string().required('Consent Withdrawal Contact Point required') : yup.string()
  }))

/**
 * Renders the Access component.
 *
 * This function renders a form for defining access types using Formik for form state management and validation.
 * It includes fields for URL actions, headers, query parameters, and rights & usage information. The form is wrapped
 * in a Card component for styling.
 *
 * @param {Object} initialValuesAccess - The initial values for the access form.
 * @param {Function} setInitialValuesAccess - Function to set the initial values of the access form.
 * @param {Function} handleNext - Function to handle the next step action.
 * @param {Function} handlePrev - Function to handle the previous step action.
 * @returns {JSX.Element} The Access component.
 */
const Access = (initialValuesAccess, setInitialValuesAccess, handleNext, handlePrev) => {
  return (
    <Card className='w-1/2 mt-6'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Access Type</h5>
      <Formik
        initialValues={initialValuesAccess}
        validationSchema={validationSchemaAccess}
        validateOnBlur
        onSubmit={values => {
        // TODO: handle maybe here the 'removing' from the json formik values if toggles are off
          setInitialValuesAccess(values)
          console.log(values)
          setTimeout(() => handleNext(), 0)
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className='block mb-2'>
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
                          onClick={() => arrayHelpers.push(initialValuesAccess.headers[0])}
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
                          onClick={() => arrayHelpers.push(initialValuesAccess.queries[0])}
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
            <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
            <div className='flow-root'>
              <Button className='float-right' type='submit'>Next</Button>
              <Button className='float-left' onClick={() => handlePrev()}>Cancel</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default Access
