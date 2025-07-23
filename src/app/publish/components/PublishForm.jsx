'use client'
import { useState } from 'react'
import { Button, Card, Dropdown, Modal, Popover } from 'flowbite-react'
import AssetForm from './assetDefinition/AssetForm'

/**
 * PublishForm component for creating or reusing assets.
 *
 * This component provides a multi-step form for defining and publishing assets.
 * Users can choose to create a new asset or reuse an existing one.  The form
 * guides users through defining the asset's properties, access permissions,
 * pricing and policies, and finally, reviewing and submitting the information.
 *
 * @returns {JSX.Element} The PublishForm component.
 */
export default function PublishForm (brokerAssets) {
  const initialValuesEmpty = {
    title: '',
    description: '',
    image: '',
    keywords: [],
    url: '',
    url_action: 'GET',
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
    consent_withdrawal_contact_point: '',
    switchQuery: false,
    switchPII: false,
    policies: [{ period: { startDate: '', endDate: '' }, policyName: '' }]
  }
  const [openModal, setOpenModal] = useState(false)
  const [initialValues, setInitialValues] = useState(initialValuesEmpty)
  const [currentAsset, setCurrentAsset] = useState(null)
  const existingAssets = brokerAssets

  const handleSelectExisting = (asset) => {
    const setAssetSelected = {
      title: asset.title,
      description: asset.description,
      image: asset.image,
      keywords: asset.keyword || [],
      url: asset.endpointURL,
      url_action: 'GET',
      headers: [{ key: 'hello', value: 'world' }],
      queries: [{
        name: '',
        label: '',
        description: asset.endpointDescription,
        type: 'text',
        default_value: '',
        required: true
      }],
      license: asset.license,
      terms_and_condition: '',
      data_controller: '',
      legal_basis: '',
      purpose: '',
      data_protection_contract_point: '',
      consent_withdrawal_contact_point: '',
      switchQuery: false,
      switchPII: false,
      policies: [{ period: { startDate: '', endDate: '' }, policyName: '' }]
    }
    setInitialValues(setAssetSelected)
    setCurrentAsset(asset.id)
  }
  const handleNewAsset = () => {
    setInitialValues(initialValuesEmpty)
    setCurrentAsset(`Empty + ${Date.now()}`)
  }
  const handleCreateAsset = (offeringData) => {
    publishOffering(offeringData)
  }
  async function publishOffering (offeringData) {
    const response = await fetch('/api/offeringManager/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(offeringData)
    })
    if (response.ok) {
      //
    } else {
      //
    }
  }

  console.log(existingAssets)
  return (
    <div className='flex flex-grow flex-col items-center justify-center bg-gray-50'>
      <Card className=' flex items-center w-1/2 mt-8'>
        <p>Do you wish to reuse an existing asset ?</p>
        <div className='flex flex-row'>
          {!existingAssets.brokerAssets?.error
            ? (
              <Dropdown label='Select Existing' className='focus:ring-0'>
                {existingAssets.brokerAssets.data.map((asset, index) => (
                  <Dropdown.Item className='focus:ring-0' key={index} onClick={() => handleSelectExisting(asset)}>{asset.title}</Dropdown.Item>
                ))}
              </Dropdown>
              )
            : (
              <Dropdown label='Select Existing' className='focus:ring-0'>
                <Dropdown.Item className='focus:ring-0'>Error contacting Broker</Dropdown.Item>
              </Dropdown>
              )}
          <Button className='ml-6 focus:ring-0' onClick={() => handleNewAsset()}>Create New</Button>
        </div>
      </Card>
      {!currentAsset &&
        <div className='items-center w-1/2 my-4' key={currentAsset}>
          <Card className='border-2 border-dashed flex items-center h-[500px]'>
            <p className='text-2xl font-extrablod text-gray-600/50'>Create a new Asset or use one existing as a template</p>
          </Card>
        </div>}
      {currentAsset &&
        <div className='items-center w-1/2 mt-4' key={currentAsset}>
          {AssetForm(initialValues, setInitialValues, openModal, setOpenModal)}
        </div>}

      {openModal &&
        <div className='flow-root'>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Review Asset information:</Modal.Header>
            <Modal.Body>
              <pre>
                {JSON.stringify(initialValues, null, 2)}
              </pre>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => handleCreateAsset(initialValues)}>I accept</Button>
              <Popover
                aria-labelledby='default-popover'
                content={
                  <div className='w-64 text-sm text-gray-500 dark:text-gray-400'>
                    <div className='px-3 py-2'>
                      <p>This is not implemented, what is the next step after submit?</p>
                    </div>
                  </div>
                }
              >
                <Button color='gray'>
                  Decline
                </Button>
              </Popover>
            </Modal.Footer>
          </Modal>
        </div>}
    </div>
  )
}
