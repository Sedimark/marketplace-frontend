'use client'
import { useState } from 'react'
import { Button, Card, Dropdown, Modal, Popover } from 'flowbite-react'
import { initialValuesEmpty } from './assetDefinition/initialValues'
import mockExistingAssets from '@/utils/data/mockExistingAssets.json'
import AssetForm from './assetDefinition/AssetForm'

/**
 * FormSteps component renders a multi-step form with navigation controls.
 *
 * @component
 * @example
 * return (
 *   <FormSteps />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * This component manages the state of the active step in the form and provides
 * navigation controls to move between steps. It renders a stepper to indicate
 * the current step and conditionally renders the content of each step based on
 * the active step.
 *
 * @function
 * @name FormSteps
 *
 * @property {number} activeStep - The current active step in the form.
 * @property {function} setActiveStep - Function to update the active step.
 * @property {function} handleNext - Function to move to the next step.
 * @property {function} handlePrev - Function to move to the previous step.
 * @property {Array<string>} steps - Array of step names.
 * @property {object} initialValuesStepOne - Initial values for step one.
 * @property {function} setInitialValuesStepOne - Function to update initial values for step one.
 * @property {object} initialValuesStepTwo - Initial values for step two.
 * @property {function} setInitialValuesStepTwo - Function to update initial values for step two.
 * @property {object} initialValuesStepThree - Initial values for step three.
 * @property {function} setInitialValuesStepThree - Function to update initial values for step three.
 */
export default function FormSteps () {
  const steps = ['Asset Definition', 'Access', 'Pricing & Policies', 'Review & Submit']
  const [openModal, setOpenModal] = useState(false)
  const [initialValues, setInitialValues] = useState(initialValuesEmpty)
  const [currentAsset, setCurrentAsset] = useState(null)
  const existingAssets = mockExistingAssets

  const handleSelectExisting = (asset) => {
    setInitialValues({
      title: asset.title,
      description: asset.description,
      image: asset.image,
      keywords: asset.keywords,
      url: asset.endpointURL,
      url_action: 'POST',
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
    )
    setCurrentAsset(asset.id)
  }
  const handleNewAsset = () => {
    setInitialValues(initialValuesEmpty)
    setCurrentAsset(`Empty + ${Date.now()}`)
  }

  return (
    <div className='flex flex-col items-center justify-center mt-4'>
      <Card className='items-center w-1/2 mt-8'>
        <ol className='items-center w-full space-y-4 xl:flex xl:space-x-8 xl:space-y-0 rtl:space-x-reverse'>
          {steps.map((_step, index) => (
            <li key={index} className='flex items-center space-x-2.5 rtl:space-x-reverse '>
              <span className='flex items-center justify-center w-6 h-6 border border-blue-600 rounded-full shrink-0 ' />
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
      <Card className=' flex items-center w-1/2 mt-8'>
        <p>Do you wish to reuse an existing asset ?</p>
        <div className='flex flex-row'>
          <Dropdown label='Select Existing' dismissOnClick={false} className='focus:ring-0'>
            {existingAssets.map((asset, index) => (
              <Dropdown.Item className='focus:ring-0' key={index} onClick={() => handleSelectExisting(asset)}>{asset.title}</Dropdown.Item>
            ))}
          </Dropdown>
          <Button className='ml-6 focus:ring-0' onClick={() => handleNewAsset()}>Create New</Button>
        </div>
      </Card>
      {currentAsset &&
        <div className='items-center w-1/2 mt-8' key={currentAsset}>
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

              <Popover
                aria-labelledby='default-popover'
                content={
                  <div className='w-64 text-sm text-gray-500 dark:text-gray-400'>
                    <div className='px-3 py-2'>
                      <p>To close use the X</p>
                    </div>
                  </div>
}
              >
                <Button>I accept</Button>
              </Popover>
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
