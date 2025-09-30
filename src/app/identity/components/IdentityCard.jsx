'use client'

import { Card, Accordion, ClipboardWithIcon } from 'flowbite-react'
import { HiExclamationCircle } from 'react-icons/hi'

export default function IdentityCard ({ identity, didResolved, address, error }) {
  const hasError = !identity || !address || error
  // Error message block, if identity or address is empty, or really strange error but somehow values filled
  if (hasError) {
    return (
      <Card className='w-1/2 mt-6 mx-auto border border-red-300 bg-red-50'>
        <div className='flex items-center text-red-600 bg-red-100 p-4 rounded-lg border border-red-300'>
          <HiExclamationCircle className='h-6 w-6 mr-3 flex-shrink-0' />
          <div>
            <p className='font-bold text-md mb-1'>Error loading identity or address</p>
            {error && <p className='text-sm mt-1'>{error.message || 'An unknown error occurred.'}</p>}
            {!identity && <p className='text-sm mt-1'>No identity data available.</p>}
            {!address && <p className='text-sm mt-1'>No blockchain address found.</p>}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className='w-1/2 mt-6 mx-auto'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Your Identity, {identity.vc.credentialSubject['schema:alternateName']}.</h5>
      <Card className='mt-6 '>
        <div className='flex items-centerp-4'>
          <HiExclamationCircle className='h-6 w-6 mr-3 flex-shrink-0' />
          <div>
            <p className='font-bold text-md mb-1'>You can get funds at the link using your key:</p>
            <p>
              Use your key here:&nbsp;
              <a href='https://stardust.linksfoundation.com/faucet/l2/' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
                https://stardust.linksfoundation.com/faucet/l2/
              </a>
            </p>
          </div>
        </div>

        <p className='mt-4'>Your key is here:</p>
        <div className='relative flex items-center gap-2 bg-gray-100 rounded-md px-4 py-2'>
          <code className='text-gray-800 font-mono break-all'>{address}</code>
          <ClipboardWithIcon
            className='right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700 bg-gray-100'
            valueToCopy={address}
          />
        </div>

        <Accordion className='mt-4'>
          <Accordion.Panel>
            <Accordion.Title>Verifiable Credential</Accordion.Title>
            <Accordion.Content className='overflow-auto'>
              <pre>
                <code>
                  {JSON.stringify(identity, null, 2)}
                </code>
              </pre>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
        <Accordion className='mt-4'>
          <Accordion.Panel>
            <Accordion.Title>DID</Accordion.Title>
            <Accordion.Content className='overflow-auto'>
              <pre>
                <code>
                  {JSON.stringify(didResolved, null, 2)}
                </code>
              </pre>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </Card>
    </Card>
  )
}
