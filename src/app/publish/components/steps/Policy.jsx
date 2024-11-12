import * as yup from 'yup'
import { FieldArray, Form, Formik } from 'formik'
import { Button, Card } from 'flowbite-react'
import CustomDatepicker from '../CustomDatePicker'
import CustomTextInput from '../CustomTextInput'

const validationSchemaPolicy = yup.object({
  policies: yup.array().of(yup.object().shape({
    period: yup.object().shape({
      startDate: yup.string().required('A start date is required for the policy'),
      endDate: yup.string()
    }),
    policyName: yup.string().required('A name is required for the policy')
  }))
})

/**
 * Renders the Policy component.
 *
 * This function renders a form for defining pricing and policy using Formik for form state management and validation.
 * It includes fields for policy name and date range. The form is wrapped in a Card component for styling.
 *
 * @param {Object} initialValuesPolicy - The initial values for the policy form.
 * @param {Function} setInitialValuesPolicy - Function to set the initial values of the policy form.
 * @param {Function} handleNext - Function to handle the next step action.
 * @param {Function} handlePrev - Function to handle the previous step action.
 * @returns {JSX.Element} The Policy component.
 */
const Policy = (initialValuesPolicy, setInitialValuesPolicy, handleNext, handlePrev) => {
  return (
    <Card className='w-1/2 mt-6'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Pricing & Policy</h5>
      <Formik
        initialValues={initialValuesPolicy}
        validationSchema={validationSchemaPolicy}
        validateOnBlur
        onSubmit={values => {
          console.log(values)
          setInitialValuesPolicy(values)
          // WARNING! We don't know how the Dates from the Period section will need to be formatted!
          // Or we do that here, or when sending the data! The dates are on DateString bcs problems with the
          // display of the component! BE AWARE!
          handleNext()
        }}
      >

        {({ values }) => (
          <Form>
            {/* This would be for the future... I did it because radio buttons works differently, I wanted to test it */}
            {/* <fieldset className='flex flex-col max-w-md gap-4'>
                  <legend className='mb-4'>Shall this asset be free to access?</legend>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <Field as={Radio} name='is_free' value='true' />
                      <Label htmlFor='united-state'>Yes</Label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Field as={Radio} name='is_free' value='false' defaultChecked />
                      <Label htmlFor='no'>No</Label>
                    </div>
                  </div>
                </fieldset> */}
            <Card className='mt-6'>
              <div className='block mb-2'>
                <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900'>Policies</h5>
              </div>
              <FieldArray
                name='policies'
                render={arrayHelpers => (
                  <div>
                    {values.policies.map((_header, index) => (
                      <Card className='mb-6' key={index}>
                        <div>
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
                          onClick={() => arrayHelpers.push(initialValuesPolicy.policies[0])}
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
            </Card>
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

export default Policy
