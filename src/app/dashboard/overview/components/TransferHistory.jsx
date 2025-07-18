import { Table, TableBody, TableCell, TableHeadCell, TableHead, TableRow, Accordion, AccordionContent, AccordionTitle, AccordionPanel, Alert } from 'flowbite-react'
import { HiDownload, HiUpload } from 'react-icons/hi'
import { TbAlertSquareFilled } from 'react-icons/tb'

function TransferHistory ({ transferHistory }) {
  const historyData = ['', 'Asset', 'Status', 'Date']

  function formatTimestamp (timestamp) {
    if (!timestamp) return 'N/A'
    // Somehow this timestamp is UNIX in seconds, but the Contacts ones is in ms??
    const date = new Date(timestamp)
    // Did not like ISOString here, changed to formatted
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date)
  }

  return (
    <>
      {!transferHistory && ( // Error during fetch (potentially Connector is unvailable)
        <div className='flex flex-col w-full gap-4 p-4'>
          <div className='w-full gap-4 p-6 text-center bg-white border border-gray-200 rounded-lg shadow'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Connector service unavailable. Please try again later.</h5>
          </div>
        </div>
      )}
      {transferHistory?.error && (
        <div className='flex flex-col w-full gap-4 p-4 bg-gray-50'>
          <Alert color='failure' icon={TbAlertSquareFilled}>
            <span className='font-bold text-xl'>Connector service is not responding. Please, try again.</span>
          </Alert>
        </div>
      )}
      <Accordion className='mt-5 mb-5 p-10 pt-0 border-none'>
        <AccordionPanel>
          <AccordionTitle>
            <div className='flex flex-row gap-2'>
              <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>Recent Transfers
            </div>
          </AccordionTitle>
          {transferHistory.length > 0 && (
            <AccordionContent className='bg-white max-h-96 overflow-y-auto'>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHead>
                    {historyData.map((nameColumn, index) => {
                      return (<TableHeadCell className='bg-white p-0 pl-6' key={`${nameColumn}-${index}`}>{nameColumn}</TableHeadCell>)
                    })}
                  </TableHead>
                  <TableBody className='divide-y'>
                    {transferHistory.map((transferProcess, index) => {
                      return (
                        <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800' key={`${transferProcess.assetId}-${index}`}>
                          <TableCell className='max-w-fit'>
                            {transferProcess.type === 'CONSUMER' && <HiDownload size={20} />}
                            {transferProcess.type === 'PROVIDER' && <HiUpload size={20} />}
                          </TableCell>
                          <TableCell className='whitespace-nowrap font-normal text-black dark:text-white flex flex-row gap-2 ml-0'>
                            {transferProcess.assetId}
                          </TableCell>
                          <TableCell className='whitespace-nowrap font-normal text-black dark:text-white'>{transferProcess.state}</TableCell>
                          <TableCell className='whitespace-nowrap font-normal text-black dark:text-white'>{formatTimestamp(transferProcess.stateTimestamp)}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          )}
        </AccordionPanel>
      </Accordion>
    </>
  )
}
export default TransferHistory
