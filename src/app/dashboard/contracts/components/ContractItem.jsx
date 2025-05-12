// import Image from 'next/image'
import { Accordion, AccordionContent, AccordionTitle, AccordionPanel, Table, TableBody, TableCell, TableHeadCell, TableRow, TableHead, Button } from 'flowbite-react'
import { HiOutlineCurrencyEuro, HiCalendar, HiDotsHorizontal, HiCheck, HiExclamationCircle, HiPlay } from 'react-icons/hi'
import mockContractTransfer from '@/utils/data/mockContractTransfers.json'

export default function ContractItem ({ vc, price }) {
  // const maxLengthTitle = 70
  // const maxLengthDescription = 120
  const name = 'INeedToGetThisFromCatalogue'
  const description = 'INeedToGetThisFromCatalogue'
  // const issuanceDate = vc.created_at ? new Date(vc.created_at) : new Date()
  // const date = isNaN(issuanceDate.getTime()) ? new Date() : issuanceDate
  // const provider = vc.provider
  // const providedBy = provider.name ?? 'OTHER'
  // const validatedPrice = price ?? '0'
  const history = mockContractTransfer.transfer_history
  const historyData = ['', 'Status', 'Date', 'Transfer ID']
  // const policyConstrains = vc.policies

  return (
    <Accordion collapseAll className=' min-w-fit overflow-auto mx-4 mb-4 shadow-md rounded-md'>
      <AccordionPanel>
        <AccordionTitle className='bg-white'>
          <div className='grid grid-cols-3'>
            <div className=''>
              <div className=' flex text-lg font-semibold'>{name}</div>
              <div className='flex flex-col mt-4 w-96 min-w-40 max-w-96'>
                <div className=' text-sm mr-4'>{description}</div>
                {/* Price and date */}
                <div className='flex flex-row items-end mt-3'>
                  <div className='flex flex-row gap-2 w-36 mt-2'>
                    <HiCalendar size={20} />
                    date here
                    {/* <p className='text-sm'>{date.toISOString().split('T')[0]}</p> */}
                  </div>
                  <div className='flex flex-row gap-2 w-36'>
                    <HiOutlineCurrencyEuro size={20} />
                    price here
                    {/* <p className='text-sm'>{validatedPrice} euros</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-start-3 w-1/2 mx-auto flex'>
              {/* <Image width={64} height={64} src={provider.picture} alt={provider.name} className='max-h-16 max-w-16 rounded-lg shadow-lg ml-2' /> */}
              <p className='pr-2 ml-2 text-sm font-semibold'>provider Id</p>
            </div>
          </div>
        </AccordionTitle>
        <AccordionContent className='bg-white max-h-80 overflow-y-clip'>
          <ul className='divide-y'>
            <div className='grid grid-cols-3 w-full'>
              <Button className='col-start-2 bg-sedimark-deep-blue hover:bg-sedimark-light-blue shadow-lg text-white rounded focus:ring-0 mb-4'>
                <HiPlay size={24} className='mr-2' />
                Start transfer
              </Button>
            </div>
            <div className='overflow-x-auto mt-2'>
              <Table className='mt-4'>
                <TableHead>
                  {historyData.map((nameColumn, index) => {
                    return (<TableHeadCell className='bg-white p-0 pl-6' key={`${nameColumn}-${index}`}>{nameColumn}</TableHeadCell>)
                  })}
                </TableHead>
                <TableBody className='divide-y'>
                  {history.map((asset, index) => {
                    return (
                      <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800' key={`${asset.asset}-${index}`}>
                        {asset.status === 'Completed' &&
                          <TableCell className='max-w-fit'>
                            <HiCheck size={20} />
                          </TableCell>}
                        {asset.status === 'In progress' &&
                          <TableCell className='max-w-fit'>
                            <HiDotsHorizontal size={20} />
                          </TableCell>}
                        {asset.status === 'Failed' &&
                          <TableCell className='max-w-fit'>
                            <HiExclamationCircle size={20} />
                          </TableCell>}
                        <TableCell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.status}</TableCell>
                        <TableCell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.date}</TableCell>
                        <TableCell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.transfer_id}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </ul>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  )
}
