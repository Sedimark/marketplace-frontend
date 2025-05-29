'use client'

import { useState } from 'react'
import { Modal, Button } from 'flowbite-react'
import { HiPlay } from 'react-icons/hi'

export default function TransferModal ({contractAgreementId, counterPartyAddress, connectorId}) {
  const [open, setOpen] = useState(false)
	const [message, setMessage] = useState(null)
	
	async function pushTransfer(contractAgreementId, counterPartyAddress, connectorId, dataDestination){
		const response = await fetch('/api/connector/pushData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
				{ contractId: contractAgreementId,
					counterPartyAddress: counterPartyAddress,
					connectorId: connectorId,
					dataDestination: dataDestination
				}
			),
		})

		if (response.ok) {
			setMessage('Successfully pushed data.');
		} else {
			setMessage('Something went wrong pushing the data.');
		}

		const result = await response.json()
		console.log(result)
	}

  return (
    <>
      <Button onClick={() => setOpen(true)} className='col-start-2 bg-sedimark-deep-blue hover:bg-sedimark-light-blue shadow-lg text-white rounded focus:ring-0 mb-4'>
        <HiPlay size={24} className='mr-2' />
        Start transfer
      </Button>
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <Button onClick={() => pushTransfer(contractAgreementId, counterPartyAddress, connectorId, '')} className='col-start-2 bg-sedimark-deep-blue hover:bg-sedimark-light-blue shadow-lg text-white rounded focus:ring-0 mb-4'>
							<HiPlay size={24} className='mr-2' />
							Push data
						</Button>
						<p className='text-l'>{message}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
