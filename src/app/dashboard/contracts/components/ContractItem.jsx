import Image from 'next/image'
import { Accordion, Table } from 'flowbite-react'
import icon from '@/utils/icons/icons'
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
                    {icon.calendar}
                    <p className='text-sm'>{date.toISOString().split('T')[0]}</p>
                  </div>
                  <div className='flex flex-row gap-2 w-36'>
                    {icon.euro}
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
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={`${asset.asset}-${index}`}>
                      {asset.status === 'Completed' &&
                        <Table.Cell className='max-w-fit'>
                          {icon.completed}
                        </Table.Cell>}
                      {asset.status === 'In progress' &&
                        <Table.Cell className='max-w-fit'>
                          {icon.inProgress}
                        </Table.Cell>}
                      {asset.status === 'Failed' &&
                        <Table.Cell className='max-w-fit'>
                          {icon.failed}
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