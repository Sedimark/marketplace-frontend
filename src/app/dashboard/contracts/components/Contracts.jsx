'use client'

import { Pagination } from 'flowbite-react'
import { useState, useMemo, useEffect } from 'react'
import { calculateTotalPages } from '@/app/catalogue/utils/paginationHelpers'
import SidebarDashboard from '../../components/sidebar/Sidebar'
import ButtonGroup from './ButtonGroup'
import ContractItem from './ContractItem'
import settings from '@/utils/settings'

function calculateItemsPerPage (currentPage, size, data, setContracts) {
  const startIndex = (currentPage - 1) * size
  const endIndex = (currentPage * size) > data.total ? data.total : currentPage * size
  setContracts(data.slice(startIndex, endIndex))
}

function Contracts ({ data }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [contracts, setContracts] = useState([])
  const [selected, setSelected] = useState('consumed')

  useEffect(() => {
    if (data) {
      setContracts(data)
    }
  }, [data])

  useEffect(() => {
    calculateItemsPerPage(currentPage, settings.contractsPageSize, data, setContracts)
  }, [currentPage, data])

  const totalPages = useMemo(() => calculateTotalPages(data.length, settings.contractsPageSize), [data.length])
  const totalPagesToDisplay = totalPages
  const onPageChange = (page) => setCurrentPage(page)

  return (
    <div className='flex flex-row overflow-auto'>
      <SidebarDashboard />
      <div className='w-full bg-sedimark-light-blue'>
        <ButtonGroup setSelected={setSelected} selected={selected} />
        <div className=' flex flex-row justify-center mr-52 mt-10 mb-8'>
          <Pagination currentPage={currentPage} totalPages={totalPagesToDisplay === 0 ? 1 : totalPagesToDisplay} onPageChange={onPageChange} className='h-8 flex items-center ml-48' />
        </div>
        {contracts.map((contract, index) => {
          return (
            <ContractItem
              vc={contract}
              price={contract.price}
              key={`${contract.title}-${contract.created_at}-${index + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}
export default Contracts
