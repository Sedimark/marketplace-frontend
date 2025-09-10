'use client'

import {
  Button,
  Label,
  TextInput,
  Card,
  Accordion,
  Modal,
  Spinner
} from 'flowbite-react'
import * as yup from 'yup'
import { Formik, Form, useField } from 'formik'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRegistration } from '@/context/RegistrationContext'
import { HiExclamationCircle } from 'react-icons/hi'

/**
 * Custom component to extend Formik into Flowbite React TextInput component.
 *
 * @param {*} label The content for a Flowbite React Label component.
 * @returns returns a JSX element that uses Flowbite React TextInput with Formik functions & props.
 */
const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <div className='mb-2 block'>
        <Label htmlFor={props.id || props.name} value={label} />
      </div>
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
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Prerequisites', 'User details', 'Verifiable Credentials']
  const handleNext = () => setActiveStep((cur) => cur + 1)
  const handlePrev = () => setActiveStep((cur) => cur - 1)
  const [openModal, setOpenModal] = useState(false)
  const invalidURL = 'Must be a valid URL'
  const pictRegex = /^https:\/\/[/|.|\w|\s|-]*\.(?:jpg|jpeg|svg|gif|png)$/
  const [identity, setIdentity] = useState(null)
  const [error, setError] = useState(null)
  const { completeRegistration } = useRegistration()
  const [loading, setLoading] = useState(false)
  const [didKey, setDidKey] = useState(null)
  const submitID = async (values) => {
    // Hijacking this method for identity + webserver. If any of 2 fails, we should not try to continue, right?
    // Added throw errors to stop future executions in case of errors.
    setLoading(true)
    setError(null)
    setDidKey(null)

    try {
      // ---- 1. Submit user details to the webserver ----
      const webserverRes = await fetch('/api/webserver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alternate_name: values.username,
          first_name: values.first_name,
          last_name: values.last_name,
          company_name: values.company,
          website: values.website,
          image_url: values.picture
        })
      })

      const webserverData = await webserverRes.json()
      if (!webserverRes.ok || webserverData?.error) {
        throw new Error(webserverData?.error || 'Failed to submit user data')
      }

      // ---- 2. Request ID from DLT Booth ----
      const response = await fetch('/api/identity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: values.username })
      })

      const idResp = await response.json()
      if (!response.ok || idResp?.error) {
        throw new Error(idResp?.error || 'Failed to get identity')
      }

      setIdentity(idResp)
      completeRegistration(idResp)
      handleNext()

      // ---- 3. Resolve created DID for faucet ----
      const did = idResp?.data?.sub
      if (!did) {
        throw new Error('No DID found in identity response')
      }

      const resolverRes = await fetch('/api/didResolver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ did })
      })

      const resolved = await resolverRes.json()
      if (!resolverRes.ok || resolved?.error) {
        throw new Error(resolved?.error || 'Failed to resolve DID')
      }

      // As the response verificationMethod is AN ARRAY, need to search the field on it
      const vmWithBlockchainId = resolved?.data?.verificationMethod?.find((vm) => vm.blockchainAccountId)
      const blockchainAccountId = vmWithBlockchainId?.blockchainAccountId

      if (blockchainAccountId) {
        const [, address] = blockchainAccountId.split('eip155:1:')
        setDidKey(address)
      }
    } catch (error) {
      console.error('Error:', error)
      setError({ message: error.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    setError(null)
    setOpenModal(false)
  }

  //
  // STEP 2 Validation
  //
  // Using validationSchema for standard validation. Use a custom validate function for more complex cases.
  const validationSchemaStepTwo = yup.object({
    username: yup.string().required('Username is required'),
    first_name: yup.string().notRequired(),
    last_name: yup.string().notRequired(),
    company: yup.string().notRequired(),
    website: yup.string().url().notRequired(invalidURL),
    picture: yup.string().matches(pictRegex, invalidURL).notRequired(invalidURL),
    declaration: yup.bool().oneOf([true], 'You must confirm this to continue')
  })

  return (
    <div className='flex flex-col items-center justify-center mt-4'>
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>Welcome to SEDIMARK!</h1>
      <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48'>Create your account with just a few steps, and enjoy sharing data within the SEDIMARK ecosystem.</p>
      {/* Stepper */}
      <Card className='w-1/2 mt-8 items-center'>
        <ol className='items-center w-full space-y-4 xl:flex xl:space-x-8 xl:space-y-0 rtl:space-x-reverse'>
          {steps.map((_step, index) => (
            <li key={index} className={'flex items-center space-x-2.5 rtl:space-x-reverse ' + (activeStep === index ? 'text-blue-600' : 'text-gray-500')}>
              <span className={'flex items-center justify-center w-6 h-6 border rounded-full shrink-0 ' + (activeStep === index ? 'border-blue-600' : 'border-gray-500')}>
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
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Prerequisites</h5>
          <p>SEDIMARK relies on the IOTA tangle to store identity and smart contracts. You will be asked a few details to create your profile, but only your username, and the required public URLs to your services (profile server, connector and self-listing) will be published in the IOTA tangle.</p>
          <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
          <div className='flow-root'>
            <Link target='_blank' rel='noreferrer' href='https://www.iota.org/get-started/what-is-iota'>
              <Button className='float-left'>Learn more...</Button>
            </Link>
            <Button className='float-right' onClick={() => handleNext()}>Next: User Details</Button>
          </div>
        </Card>}

      {/* --------------- Step 2 ---------------  */}
      {activeStep === 1 &&
        <Card className='w-1/2 mt-6'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>User Details</h5>
          <Formik
            initialValues={{
              username: '',
              first_name: '',
              last_name: '',
              company: '',
              website: '',
              picture: '',
              declaration: false
            }}
            validationSchema={validationSchemaStepTwo}
            validateOnBlur
            onSubmit={() => {
              setOpenModal(true)
            }}
          >

            {({ values, errors, touched, handleChange, setFieldValue, setFieldTouched }) => (
              <Form>
                {/* This Modal is a placeholder, in a future integration with LINKS, will need an overhaul (have a service to do API calls, return errors...) */}
                <Modal dismissible show={openModal} onClose={() => handleModalClose()}>
                  <Modal.Header>Warning!</Modal.Header>
                  <Modal.Body>
                    <div className='text-center'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z' />
                      </svg>
                      <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                        A Verifiable Credential is going to be created with the data, check that the data is correct, <b>you will not be able to go back from this point!</b>
                      </h3>
                      {error &&
                        <div>
                          <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
                          <p className='text-lg font-bold text-red-500'>{`Couldn't create new identity for participant ${values.username}: ${error.message}`}</p>
                        </div>}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className='w-full'>
                      <div className='flow-root'>
                        <Button className='float-right w-1/3' onClick={() => submitID(values)}>
                          {loading ? <Spinner /> : <p>Continue to next step</p>}
                        </Button>
                        <Button className='float-left w-1/3' color='failure' onClick={() => handleModalClose()}>Go back</Button>
                      </div>
                    </div>
                  </Modal.Footer>
                </Modal>
                <div>
                  <CustomTextInput
                    label='Username'
                    tooltip='The name under which you will be known in the SEDIMARK ecosystem.'
                    name='username'
                    placeholder='The name under which you will be known in the SEDIMARK ecosystem.'
                  />
                </div>
                <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
                <div className='flex flex-col gap-2'>
                  <div className='grid gap-6 mb-2 md:grid-cols-2'>
                    <div>
                      <CustomTextInput
                        label='First name'
                        name='first_name'
                        placeholder=''
                      />
                    </div>
                    <div>
                      <CustomTextInput
                        label='Last name'
                        name='last_name'
                        placeholder=''
                      />
                    </div>
                  </div>
                  <div>
                    <CustomTextInput
                      label='Company'
                      name='company'
                      placeholder='Bruxelloise des logiciels, SRL'
                    />
                  </div>
                  <div>
                    <CustomTextInput
                      label='Website'
                      name='website'
                      placeholder='http://sedimark.com'
                    />
                  </div>
                  <div className='flex justify-between gap-6 mb-2 pt-4'>
                    <div className='w-full'>
                      <CustomTextInput
                        label='Profile picture'
                        name='picture'
                        placeholder='http://urltoyourimage/img.png'
                      />
                    </div>
                    {
                      // TODO: this is a workaround to prevent Image to crash when the URL is invalid
                      values.picture.match(pictRegex) &&
                        <Image width={96} height={96} src={values.picture} alt='Participant image preview' className='object-cover object-center rounded-lg shadow-lg' />
                    }
                  </div>
                </div>
                <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
                <div className='flex items-center mb-4'>
                  <input
                    id='declaration'
                    name='declaration'
                    type='checkbox'
                    onChange={handleChange}
                    checked={values.declaration}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                  />
                  <label htmlFor='declaration' className='ms-2 ml-2 text-sm font-medium text-gray-900'>
                    I hereby declare that I have not put any personal data in my username or my services URLs.
                  </label>
                </div>
                {errors.declaration && touched.declaration && (
                  <p className='text-sm mb-4 text-red-500'>{errors.declaration}</p>
                )}
                <div className='flow-root'>
                  <Button className='float-right' type='submit'>Next</Button>
                  <Button className='float-left' onClick={() => handlePrev()}>Back</Button>
                </div>
              </Form>
            )}

          </Formik>
        </Card>}

      {/* --------------- Step 3 ---------------  */}
      {activeStep === 2 &&
        <Card className='w-1/2 mt-6'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Verifiable credentials</h5>
          <Card className='mt-6 '>
            <div className='flex items-center text-yellow-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
              <HiExclamationCircle className='h-6 w-6 mr-3 flex-shrink-0' />
              <div>
                <p className='font-bold text-md mb-1'>You need to get your funds</p>
                <p>
                  Use your key here:&nbsp;
                  <a href='https://stardust.linksfoundation.com/faucet/l2/' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
                    https://stardust.linksfoundation.com/faucet/l2/
                  </a>
                </p>
              </div>
            </div>

            {didKey && (
              <>
                <p>Your key is here:</p>
                <div className='flex items-center gap-2 bg-gray-100 rounded-md px-4 py-2'>
                  <code className='text-gray-800 font-mono break-all'>{didKey}</code>
                  <Button size='xs' color='light' onClick={() => navigator.clipboard.writeText(didKey)}>
                    Copy to clipboard
                  </Button>
                </div>
              </>
            )}

            <Accordion>
              <Accordion.Panel>
                <Accordion.Title>Verifiable Credential</Accordion.Title>
                <Accordion.Content className='overflow-auto'>
                  <pre>
                    <code>
                      {JSON.stringify(identity, 'did_example', 2)}
                    </code>
                  </pre>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
            <div className='flow-root'>
              <Link href='/'>
                <Button className='float-right'>Go to Marketplace</Button>
              </Link>
              <Button className='float-left' disabled>Back</Button>
            </div>
          </Card>
        </Card>}
    </div>
  )
}
