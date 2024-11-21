import Image from 'next/image'
import { Accordion, Table } from 'flowbite-react'
import mockContractTransfer from '@/utils/data/mockContractTransfers.json'

function ContractItem ({ vc, price }) {
  const maxLengthTitle = 42
  const maxLengthDescription = 60
  const name = vc.title.length > maxLengthTitle ? vc.title.substring(0, maxLengthTitle) + '...' : vc.title
  const description = vc.short_description.length > maxLengthDescription ? vc.short_description.substring(0, maxLengthDescription) + '...' : vc.short_description
  const issuanceDate = vc.created_at ? new Date(vc.created_at) : new Date()
  const date = isNaN(issuanceDate.getTime()) ? new Date() : issuanceDate
  const provider = vc.provider
  const providedBy = provider.name ?? 'OTHER'
  const validatedPrice = price ?? '0'
  const history = mockContractTransfer.transfer_history
  const historyData = ['', 'Status', 'Date', 'Transfer ID']

  return (
    <Accordion collapseAll flush className=' min-w-fit overflow-auto m-5 shadow-md rounded-md '>
      <Accordion.Panel>
        <Accordion.Title className='flex bg-white'>
          <div className='flex'>
            <div className='flex flex-col'>
              <div className=' flex text-lg font-semibold'>{name}</div>
              <div className='flex flex-col mt-4 w-96 min-w-40 max-w-96'>
                <div className=' text-sm mr-4 w-2/3'>{description}</div>
                {/* Price and date */}
                <div className='flex flex-row items-end mt-3'>
                  <div className='flex flex-row gap-2 w-36 mt-2'>
                    <svg
                      className='w-5 h-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10ZM10 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10ZM14 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z' />
                      <path
                        clipRule='evenodd'
                        d='M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z'
                        fillRule='evenodd'
                      />
                    </svg>
                    <p className='text-sm'>{date.toISOString().split('T')[0]}</p>
                  </div>
                  <div className='flex flex-row gap-2 w-36'>
                    <svg className='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                      <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 10h9.231M6 14h9.231M18 5.086A5.95 5.95 0 0 0 14.615 4c-3.738 0-6.769 3.582-6.769 8s3.031 8 6.769 8A5.94 5.94 0 0 0 18 18.916' />
                    </svg>
                    <p className='text-sm'>{validatedPrice} euros</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2 max-h-16'>
              <Image width={64} height={64} src={provider.picture} alt={provider.name} className='max-w-16 max-h-16 object-cover object-center rounded-lg shadow-lg ml-2' />
              <p className=' flex pr-2 text-sm font-semibold'>{providedBy}</p>
            </div>
          </div>
        </Accordion.Title>
        <Accordion.Content className='bg-white max-h-56 overflow-y-auto'>
          <div className='overflow-x-auto mt-2'>
            <Table>
              <Table.Head>
                {historyData.map((nameColumn, index) => {
                  return (<Table.HeadCell className='bg-white p-0 pl-6' key={`${nameColumn}-${index}`}>{nameColumn}</Table.HeadCell>)
                })}
              </Table.Head>
              <Table.Body className='divide-y'>
                {history.map((asset, index) => {
                  return (
                  // Icons
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={`${asset.asset}-${index}`}>
                      {asset.status === 'Completed' &&
                        <Table.Cell className='max-w-fit'>
                          <svg className='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                            <path fillRule='evenodd' d='M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z' clipRule='evenodd' />
                            <path fillRule='evenodd' d='M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z' clipRule='evenodd' />
                          </svg>
                        </Table.Cell>}
                      {asset.status === 'In progress' &&
                        <Table.Cell className='max-w-fit'>
                          <svg className='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                            <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M6 12h.01m6 0h.01m5.99 0h.01' />
                          </svg>
                        </Table.Cell>}
                      {asset.status === 'Failed' &&
                        <Table.Cell className='max-w-fit'>
                          <svg className='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                            <path fillRule='evenodd' d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z' clipRule='evenodd' />
                          </svg>
                        </Table.Cell>}
                      <Table.Cell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.status}</Table.Cell>
                      <Table.Cell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.date}</Table.Cell>
                      <Table.Cell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.transfer_id}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}

export default ContractItem
