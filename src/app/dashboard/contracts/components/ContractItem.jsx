import { Accordion, AccordionContent, AccordionTitle, AccordionPanel, Table, TableHeadCell, TableHead, Button } from 'flowbite-react'
import { HiOutlineCurrencyEuro, HiCalendar, HiDatabase, HiUser, HiPlay } from 'react-icons/hi'
import { fetchContracts } from '@/utils/connector'

export default async function ContractItem ({ contract, showConsumed }) {
  const contractAgreementId = contract.contractAgreementId
  const contractAgreement = await fetchContracts(contractAgreementId)

  // Multiply by 1000 because JavaScript expects milliseconds, we're reciving Unix timestamp AFAIK
  const date = new Date(contractAgreement[0].contractSigningDate * 1000)
  const counterPartyId = contract.counterPartyId
  const assetId = contractAgreement[0].assetId
  const historyData = ['', 'Status', 'Date', 'Transfer ID']

  return (
    <Accordion collapseAll className=' min-w-fit overflow-auto mx-4 mb-4 shadow-md rounded-md'>
      <AccordionPanel>
        <AccordionTitle className='bg-white'>
          <div className='grid grid-cols-3'>
            <div className=''>
              <div className=' flex text-lg font-semibold'>
                <div className='flex flex-row'>
                  <HiDatabase size={28} className='mr-3' />
                  <p>{contractAgreementId}</p>
                </div>
              </div>
              <div className='flex flex-col mt-4 w-96 min-w-40 max-w-96'>
                <div className=' text-sm mr-4'>{assetId}</div>
                {/* Price and date */}
                <div className='flex flex-row items-end mt-3'>
                  <div className='flex flex-row gap-2 w-36 mt-2'>
                    <HiCalendar size={20} />
                    <p className='text-sm'>{date.toISOString().split('T')[0]}</p>
                  </div>
                  <div className='flex flex-row gap-2 w-36 mt-2'>
                    <HiOutlineCurrencyEuro size={20} />
                    <p className='text-sm'>20</p>
                  </div>
                  <div className='flex flex-row gap-2 w-36 mt-2'>
                    <HiUser size={20} />
                    <p className=' text-sm font-semibold'>{counterPartyId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionTitle>
        <AccordionContent className='bg-white max-h-80 overflow-y-clip'>
          <ul className='divide-y'>
            {showConsumed &&
              <div className='grid grid-cols-3 w-full'>
                <Button className='col-start-2 bg-sedimark-deep-blue hover:bg-sedimark-light-blue shadow-lg text-white rounded focus:ring-0 mb-4'>
                  <HiPlay size={24} className='mr-2' />
                  Start transfer
                </Button>
              </div>}
            <div className='overflow-x-auto mt-2'>
              <Table className='mt-4'>
                <TableHead>
                  {historyData.map((nameColumn, index) => {
                    return (<TableHeadCell className='bg-white p-0 pl-6' key={`${nameColumn}-${index}`}>{nameColumn}</TableHeadCell>)
                  })}
                </TableHead>
                {/* <TableBody className='divide-y'>
                  {transferProcessHistoric.map((asset, index) => {
                    return (
                      <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800' key={`${asset.asset}-${index}`}>
                        {asset.status === 'FINALIZED' &&
                          <TableCell className='max-w-fit'>
                            <HiCheck size={20} />
                          </TableCell>}
                        {asset.status === 'STARTED' &&
                          <TableCell className='max-w-fit'>
                            <HiDotsHorizontal size={20} />
                          </TableCell>}
                        {asset.status === 'Failed' &&
                          <TableCell className='max-w-fit'>
                            <HiExclamationCircle size={20} />
                          </TableCell>}
                        <TableCell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.state}</TableCell>
                        <TableCell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset.stateTimestamp}</TableCell>
                        <TableCell className='whitespace-nowrap font-normal text-black dark:text-white'>{asset['@id']}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody> */}
              </Table>
            </div>
          </ul>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  )
}
