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
    dataDestination: yup.string()
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

  async function pullTransfer (contractAgreementId, counterPartyAddress, connectorId) {
    try {
      const response = await fetch('/api/connector/pullData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contractId: contractAgreementId,
          counterPartyAddress,
          connectorId
        })
      })
      const { authorization, endpoint } = await response.json()
      if (!authorization || !endpoint) {
        console.error('Invalid response: missing authorization or endpoint')
        return
      }
      // The only way to apply Headers (Auth) and open a new window in a client component.
      // Should work on prod as it is, as the public URL (endpoint) should be accesible from webbrowser
      const proxyUrl = `/api/proxy?target=${encodeURIComponent(endpoint + '/1')}&auth=${encodeURIComponent(authorization)}`
      window.open(proxyUrl, '_blank')
    } catch (error) {
      console.error('Error in pullTransfer:', error)
    }
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setMessage(null)
    try {
      pushTransfer(contractAgreementId, counterPartyAddress, connectorId, values.dataDestination)
    } finally {
      setSubmitting(false)
    }
  }

  const HandlePull = () => {
    try {
      pullTransfer(contractAgreementId, counterPartyAddress, connectorId)
    } catch (e) {
      console.log(e)
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
        <Modal.Header>Transfer options for {contractAgreementId}</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <Formik
              initialValues={{ dataDestination: '' }}
              validationSchema={FormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid }) => (
                <Form className='space-y-4'>
                  <div>
                    <Label htmlFor='dataDestination' value='Where to push the data ?' />
                    <Field
                      as={TextInput}
                      id='dataDestination'
                      name='dataDestination'
                      placeholder='https://example.com/'
                      type='url'
                    />
                    <ErrorMessage
                      name='dataDestination'
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
            <Button onClick={HandlePull}>PULL test</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
