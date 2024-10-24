import { useState } from 'react'
import ArrowDownSvg from '../../app/common/ArrowDownSvg'
import TableDetailsRow from './TableDetailsRow'
import Modal from '@/components/modal/Home'

export const TableRow = ({ dataSet, handelContractingMessage }) => {
  const [accordion, setAccordion] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  function openDetails () {
    setAccordion(!accordion)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  return (
    <div className='grid grid-cols-1 gap-4 rounded-xl py-4 px-2 bg-sedimark-white'>
      {dataSet.selfDescription &&
        <div className='flex flex-wrap justify-center items-center gap-4'>
          <div className='flex-auto'>
            <input
              id='default-checkbox' type='checkbox' value=''
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
                   dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                   dark:border-gray-600'
            />
          </div>
          <div className='flex-auto'>
            <div>
              <span className='font-bold align-middle'>Type</span>
            </div>
            <div>
              <span className='text-md align-middle'>{dataSet.selfDescription.type}</span>
            </div>
            {/* <Image src="/img/atlassian_jira_logo_icon_170511.png" height={50} width={50} alt="default 1"/> */}
          </div>
          <div className='flex-auto'>
            <div>
              <span className='font-bold align-middle'>Holder</span>
            </div>
            <div>
              <span
                className='text-md align-middle'
              >{dataSet.selfDescription.holder ? dataSet.selfDescription.holder : 'N/A'}
              </span>
            </div>
          </div>
          <div className='flex-auto'>
            <div>
              <span className='font-bold align-middle'>Issuance Date</span>
            </div>
            <div>
              {dataSet.selfDescription.verifiableCredential.length > 0 &&
                <span
                  className='text-md align-middle'
                >{dataSet.selfDescription.verifiableCredential[0].issuanceDate}
                </span>}
            </div>
            <div>
              <span className='font-bold align-middle'>Expiration Date</span>
            </div>
            <div>
              {dataSet.selfDescription.verifiableCredential.length > 0 &&
                <span
                  className='text-md align-middle'
                >{dataSet.selfDescription.verifiableCredential[0].expirationDate}
                </span>}
            </div>
          </div>
          <div className='flex-auto'>
            <button onClick={handleOpenModal} className='text-sedimark-deep-blue font-semibold'>Contract data set?</button>
            <Modal
              isOpen={isOpen} setIsOpen={setIsOpen} title='My Modal'
              onContracting={handelContractingMessage}
            >
              Do you want to contract this Data Set?
            </Modal>
          </div>
          <div className='flex-auto'>
            <button
              type='button' onClick={openDetails}
              className='flex items-center justify-between w-full p-5 text-left'
            >
              <span className='px-2 text-sedimark-deep-blue font-semibold'>More Details</span>
              <ArrowDownSvg />
            </button>
          </div>
        </div>}
      <TableDetailsRow
        className={`${accordion ? '' : 'hidden'}`}
        credentialSubject={(dataSet.selfDescription.verifiableCredential.length > 0 &&
                                 dataSet.selfDescription.verifiableCredential[0].credentialSubject) || {}}
      />
    </div>
  )
}

export default TableRow
