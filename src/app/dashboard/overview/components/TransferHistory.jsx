import { Table, Accordion } from 'flowbite-react'
import { HiDownload, HiUpload, HiDotsHorizontal, HiExclamationCircle } from 'react-icons/hi'

function TransferHistory ({ history }) {
  const historyData = ['', 'Asset', 'Counterparty ID', 'Status', 'Date']
  return (
    <Accordion className='mt-5 mb-5 p-10 pt-0 border-none'>
      <Accordion.Panel>
        <Accordion.Title>
          <div className='flex flex-row gap-2'>
            <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
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
                          <HiDownload size={20} />
                        </Table.Cell>}
                      {asset.transfer_out &&
                        <Table.Cell className='max-w-fit'>
                          <HiUpload size={20} />
                        </Table.Cell>}
                      {!asset.transfer_out && !asset.transfer_in && asset.status === 'Pending' &&
                        <Table.Cell className='max-w-fit'>
                          <HiDotsHorizontal size={20} />
                        </Table.Cell>}
                      {!asset.transfer_out && !asset.transfer_in && asset.status === 'Failed' &&
                        <Table.Cell className='max-w-fit'>
                          <HiExclamationCircle size={20} />
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
