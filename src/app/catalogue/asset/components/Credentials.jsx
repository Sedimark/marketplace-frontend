'use client'
import { Accordion } from 'flowbite-react'

function Credentials ({ asset }) {
  return (
    <Accordion className='mt-5 mb-5' collapseAll>
      <Accordion.Panel>
        <Accordion.Title className=''>Offering credentials</Accordion.Title>
        <Accordion.Content className='bg-white max-h-72 overflow-y-auto'>
          <pre>
            {JSON.stringify(asset, null, 2)}
          </pre>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}

export default Credentials
