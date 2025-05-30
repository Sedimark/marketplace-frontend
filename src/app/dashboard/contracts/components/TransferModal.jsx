'use client'

import { useState } from 'react'
import { Modal, Button, Label, TextInput } from 'flowbite-react'
import { HiPlay, HiCloudUpload } from 'react-icons/hi'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

export default function TransferModal ({ contractAgreementId, counterPartyAddress, connectorId }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(null)

  // Validation schema
  const FormSchema = yup.object().shape({
    baseUrl: yup.string()
      .url('Must be a valid URL')
      .matches(/^https:\/\//, 'URL must start with https://')
      .required('Data Destination URL is required!')
  })

  async function pushTransfer (contractAgreementId, counterPartyAddress, connectorId, dataDestination) {
    const response = await fetch('/api/connector/pushData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          contractId: contractAgreementId,
          counterPartyAddress,
          connectorId,
          dataDestination
        }
      )
    })
    if (response.ok) {
      setMessage('Successfully pushed data! Check your data destination.')
    } else {
      setMessage('Something went wrong pushing the data.')
    }
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setMessage(null)
    try {
      pushTransfer(contractAgreementId, counterPartyAddress, connectorId, values.baseUrl)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setMessage(null)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className='col-start-2 bg-sedimark-deep-blue hover:bg-sedimark-light-blue shadow-lg text-white rounded focus:ring-0 mb-4'>
        <HiPlay size={24} className='mr-2' />
        Start transfer
      </Button>
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <Formik
              initialValues={{ baseUrl: '' }}
              validationSchema={FormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid }) => (
                <Form className='space-y-4'>
                  <div>
                    <Label htmlFor='baseUrl' value='URL Data Destination' />
                    <Field
                      as={TextInput}
                      id='baseUrl'
                      name='baseUrl'
                      placeholder='https://example.com/'
                      type='url'
                    />
                    <ErrorMessage
                      name='baseUrl'
                      component='p'
                      className='text-red-600 text-sm mt-1'
                    />
                  </div>

                  <Button type='submit' disabled={!isValid || isSubmitting}>
                    <HiCloudUpload size={24} className='mr-2' />
                    {isSubmitting ? 'Pushing data...' : 'Push Transfer'}
                  </Button>
                  {message && (
                    <p className='text-sm'>
                      {message}
                    </p>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
