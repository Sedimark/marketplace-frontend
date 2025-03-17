'use client'

import {
  Button,
  Label,
  TextInput,
  Card,
  Avatar,
  Accordion,
  Modal
} from 'flowbite-react'
import * as yup from 'yup'
import { Formik, Form, useField } from 'formik'
import { useState } from 'react'
import Link from 'next/link'

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

// This is an example "output" DID, will need to be replaced with the real output on integration with LINKS
const exampleDID = {
  '@context': [
    'https://www.w3.org/ns/did/v1',
    'https://w3id.org/security/suites/jws-2020/v1'
  ],
  id: 'did:web:SEDIMARK.marketplace',
  verificationMethod: [
    {
      id: 'did:web:SEDIMARK.marketplace#owner',
      type: 'JsonWebKey2020',
      controller: 'did:web:SEDIMARK.marketplace',
      publicKeyJwk: {
        kty: 'EC',
        crv: 'secp256k1',
        x: '7afa3a377b5808e4223dd62542a6e7e46ab0be95873464520193c1857ec2bb8f',
        y: '58b050b73f31f1b8b98c0b04513257433bdad2a51188642d8b0e515fbfb3125f'
      }
    }
  ],
  authentication: [
    'did:web:SEDIMARK.marketplace#owner'
  ],
  assertionMethod: [
    'did:web:SEDIMARK.marketplace#owner'
  ]
}
export default function FormSteps () {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Prerequisites', 'User details', 'Verifiable Credentials']
  const handleNext = () => setActiveStep((cur) => cur + 1)
  const handlePrev = () => setActiveStep((cur) => cur - 1)
  const [openModal, setOpenModal] = useState(false)
  //
  // STEP 2 Validation
  //
  // Using validationSchema for standard validation. Use a custom validate function for more complex cases.
  const validationSchemaStepTwo = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    company: yup.string().required('A company is required'),
    website: yup.string().url().notRequired('Must be a valid URL'),
    picture: yup.string().url().notRequired('Must be a valid URL')
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
          <p>SEDIMARK relies on the IOTA tangle to store identity and smart contracts. You will be asked a few details to create your profile, but only your username will be published in the IOTA tangle.</p>
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
              first_name: '',
              last_name: '',
              company: '',
              website: '',
              picture: ''
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
                <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header>Warning!</Modal.Header>
                  <Modal.Body>
                    <div className='text-center'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z' />
                      </svg>
                      <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                        A Verifiable Credential is going to be created with the data, check that the data is correct, <b>you will not be able to go back from this point!</b>
                      </h3>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className='w-full'>
                      <div className='flow-root'>
                        <Button className='float-right' onClick={() => handleNext()}>Continue to next step</Button>
                        <Button className='float-left' color='failure' onClick={() => setOpenModal(false)}>Go back to check the data</Button>
                      </div>
                    </div>
                  </Modal.Footer>
                </Modal>
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
                <div className='flex gap-6 mb-2 md:grid-cols-2 pt-4'>
                  <div className='w-3/4'>
                    <CustomTextInput
                      label='Profile picture'
                      name='picture'
                      placeholder='http://urltoyourimage/img.png'
                    />
                  </div>
                  <div className='w-1/4'>
                    <Avatar size='lg' img='https://i.pravatar.cc/150?img=68' alt='placeholder avatar' rounded />
                  </div>
                </div>
                <hr className='my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
                <div className='flex flow-root'>
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
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title>DID</Accordion.Title>
                <Accordion.Content className='overflow-auto'>
                  <pre>
                    <code>
                      {JSON.stringify(exampleDID, 'did_example', 2)}
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
