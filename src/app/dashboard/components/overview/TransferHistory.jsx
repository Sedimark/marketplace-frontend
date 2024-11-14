import { Table, Accordion } from 'flowbite-react'

function TransferHistory ({ history }) {
  const historyData = ['', 'Asset', 'Counterparty ID', 'Status', 'Date']
  return (
    <Accordion className='mt-5 mb-5 p-10 border-none'>
      <Accordion.Panel>
        <Accordion.Title>
          <div className='flex flex-row gap-2'>
            <svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
              <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
            </svg>Transfer history
          </div>
        </Accordion.Title>
        <Accordion.Content className='bg-white max-h-56 overflow-y-auto'>
          <div className='overflow-x-auto'>
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
                      {asset.transfer_in &&
                        <Table.Cell className='max-w-fit'>
                          <svg class='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                            <path fill-rule='evenodd' d='M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z' clip-rule='evenodd' />
                            <path fill-rule='evenodd' d='M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z' clip-rule='evenodd' />
                          </svg>
                        </Table.Cell>}
                      {asset.transfer_out &&
                        <Table.Cell className='max-w-fit'>
                          <svg class='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                            <path fill-rule='evenodd' d='M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z' clip-rule='evenodd' />
                          </svg>
                        </Table.Cell>}
                      {!asset.transfer_out && !asset.transfer_in && asset.status === 'Pending' &&
                        <Table.Cell className='max-w-fit'>
                          <svg class='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                            <path stroke='currentColor' stroke-linecap='round' stroke-width='2' d='M6 12h.01m6 0h.01m5.99 0h.01' />
                          </svg>
                        </Table.Cell>}
                      {!asset.transfer_out && !asset.transfer_in && asset.status === 'Failed' &&
                        <Table.Cell className='max-w-fit'>
                          <svg class='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                            <path fill-rule='evenodd' d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z' clip-rule='evenodd' />
                          </svg>
                        </Table.Cell>}
                      <Table.Cell className='whitespace-nowrap font-normal text-black dark:text-white flex flex-row gap-2 ml-0'>
                        {asset.asset}
                      </Table.Cell>
                      <Table.Cell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.counterpart_id}</Table.Cell>
                      <Table.Cell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.status}</Table.Cell>
                      <Table.Cell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.date}</Table.Cell>
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
export default TransferHistory
