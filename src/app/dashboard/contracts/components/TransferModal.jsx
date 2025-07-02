'use client'

import { useState } from 'react'
import { Modal, Button, Label, TextInput, Spinner } from 'flowbite-react'
import { HiPlay, HiCloudUpload, HiCloudDownload, HiClipboardCopy } from 'react-icons/hi'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

export default function TransferModal ({ contractAgreementId, counterPartyAddress, connectorId }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const [loadingPull, setLoadingPull] = useState(false)
  const [authorization, setAuthorization] = useState('')
  const [endpoint, setEndpoint] = useState('')

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
    setLoadingPull(true)
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
      setAuthorization(authorization)
      setEndpoint(endpoint)
    } catch (error) {
      console.error('Error in pullTransfer:', error)
    } finally {
      setLoadingPull(false)
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
    setLoadingPull(false)
    setAuthorization('')
    setEndpoint('')
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
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
            <h3 className='text-lg font-semibold text-gray-700'>Push Data</h3>
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

                  <Button type='submit' className='w-full' disabled={!isValid || isSubmitting}>
                    <HiCloudUpload size={24} className='mr-2' />
                    {isSubmitting ? 'Pushing Data...' : 'Push Data'}
                  </Button>
                  {message && (
                    <p className='text-sm'>
                      {message}
                    </p>
                  )}
                </Form>
              )}
            </Formik>
            <div className='w-full border-t border-gray-300' />
            <h3 className='text-lg font-semibold text-gray-700'>Pull Data</h3>
            <Button onClick={HandlePull} className='w-full' disabled={loadingPull}>
              {loadingPull
                ? (
                  <>
                    <Spinner size='sm' className='mr-2' />
                    Requesting Pull data...
                  </>
                  )
                : (
                  <>
                    <HiCloudDownload size={24} className='mr-2' />
                    Request Pull Data
                  </>
                  )}
            </Button>
            {(authorization || endpoint) && (
              <div className='space-y-4 mt-4'>
                <div>
                  <Label htmlFor='authorization' value='Authorization Token' />
                  <div className='flex items-center rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus-within:ring-2 focus-within:ring-blue-500'>
                    <input
                      type='text'
                      readOnly
                      id='authorization'
                      value={authorization}
                      className='flex-1 bg-transparent border-none focus:ring-0 focus:outline-none px-3 py-2'
                    />
                    <button
                      type='button'
                      onClick={() => copyToClipboard(authorization)}
                      className='p-2 hover:bg-gray-300 rounded-r-lg border-l border-gray-300'
                      title='Copy to clipboard'
                    >
                      <HiClipboardCopy size={16} className='text-gray-700' />
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor='endpoint' value='Endpoint URL' />
                  <div className='flex items-center rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus-within:ring-2 focus-within:ring-blue-500'>
                    <input
                      type='text'
                      readOnly
                      id='endpoint'
                      value={endpoint}
                      className='flex-1 bg-transparent border-none focus:ring-0 focus:outline-none px-3 py-2'
                    />
                    <button
                      type='button'
                      onClick={() => copyToClipboard(endpoint)}
                      className='p-2 hover:bg-gray-300 rounded-r-lg border-l border-gray-300'
                      title='Copy to clipboard'
                    >
                      <HiClipboardCopy size={16} className='text-gray-700' />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
