import Image from 'next/image'
import { Accordion, Table, Button } from 'flowbite-react'
import { HiOutlineCurrencyEuro, HiCalendar, HiDotsHorizontal, HiCheck, HiExclamationCircle, HiPlay } from 'react-icons/hi'
import mockContractTransfer from '@/utils/data/mockContractTransfers.json'

function ContractItem ({ vc, price, selected }) {
  const maxLengthTitle = 70
  const maxLengthDescription = 120
  const name = vc.title.length > maxLengthTitle ? vc.title.substring(0, maxLengthTitle) + '...' : vc.title
  const description = vc.short_description.length > maxLengthDescription ? vc.short_description.substring(0, maxLengthDescription) + '...' : vc.short_description
  const issuanceDate = vc.created_at ? new Date(vc.created_at) : new Date()
  const date = isNaN(issuanceDate.getTime()) ? new Date() : issuanceDate
  const provider = vc.provider
  const providedBy = provider.name ?? 'OTHER'
  const validatedPrice = price ?? '0'
  const history = mockContractTransfer.transfer_history
  const historyData = ['', 'Status', 'Date', 'Transfer ID']
   const policyConstrains = vc.policies
    ? vc.policies[0]
    : {
        period: {
          startDate: '00-00-00',
          endDate: '00-00-00'
        },
        policyName: 'Not inforced'
      }

  return (
    <Accordion collapseAll className=' min-w-fit overflow-auto m-5 shadow-md rounded-md'>
      <Accordion.Panel>
        <Accordion.Title className='bg-white'>
          <div className='grid grid-cols-3'>
            <div className=''>
              <div className=' flex text-lg font-semibold'>{name}</div>
              <div className='flex flex-col mt-4 w-96 min-w-40 max-w-96'>
                <div className=' text-sm mr-4'>{description}</div>
                {/* Price and date */}
                <div className='flex flex-row items-end mt-3'>
                  <div className='flex flex-row gap-2 w-36 mt-2'>
                    <HiCalendar size={20} />
                    <p className='text-sm'>{date.toISOString().split('T')[0]}</p>
                  </div>
                  <div className='flex flex-row gap-2 w-36'>
                    <HiOutlineCurrencyEuro size={20} />
                    <p className='text-sm'>{validatedPrice} euros</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-start-3 w-1/2 mx-auto flex'>
              <Image width={64} height={64} src={provider.picture} alt={provider.name} className='max-h-16 max-w-16 rounded-lg shadow-lg ml-2' />
              <p className='pr-2 ml-2 text-sm font-semibold'>{providedBy}</p>
            </div>
          </div>
        </Accordion.Title>
        {selected === 'consumed' &&
        <Accordion.Content className='bg-white max-h-80 overflow-y-clip'>
          <ul className='divide-y'>
            <div className='grid grid-cols-3 w-full'>
              <Button className='col-start-2 bg-sedimark-deep-blue hover:bg-sedimark-light-blue shadow-lg text-white rounded focus:ring-0 mb-4'>
                <HiPlay size={24} className='mr-2' />
                Start transfer
              </Button>
            </div>
            <div className='overflow-x-auto mt-2'>
              <Table className='mt-4'>
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
                            <HiCheck size={20} />
                          </Table.Cell>}
                        {asset.status === 'In progress' &&
                          <Table.Cell className='max-w-fit'>
                            <HiDotsHorizontal size={20} />
                          </Table.Cell>}
                        {asset.status === 'Failed' &&
                          <Table.Cell className='max-w-fit'>
                            <HiExclamationCircle size={20} />
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
          </ul>
        </Accordion.Content>}
        {selected === 'provided' &&
          <Accordion.Content className='bg-white max-h-80 overflow-y-clip'>
          <div>
            <h4 className='font-bold'>Policy constraints:</h4>
            <ul>
              <li className='text-sm mt-2 ml-4 list-disc'>{policyConstrains.policyName} : {policyConstrains.period.startDate.split( 'T' )[0]} to {policyConstrains.period.endDate.split( 'T' )[0]}</li>
            </ul>
            </div>
          </Accordion.Content>}
      </Accordion.Panel>
    </Accordion>
  )
}

export default ContractItem
