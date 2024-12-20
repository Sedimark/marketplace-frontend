'use client'

import { Pagination } from 'flowbite-react'
import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { HiSearch } from 'react-icons/hi'
import { calculateTotalPages } from '@/app/catalogue/utils/paginationHelpers'
import SidebarDashboard from '../../components/sidebar/Sidebar'
import ButtonGroup from './ButtonGroup'
import ContractItem from './ContractItem'

function calculateItemsPerPage (currentPage, size, data, setContracts) {
  const startIndex = (currentPage - 1) * size
  const endIndex = (currentPage * size) > data.total ? data.total : currentPage * size
  setContracts(data.slice(startIndex, endIndex))
}
function Contracts ({ data }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [contracts, setContracts] = useState([])
  const [providedContract, setProvidedContract] = useState(false)
  const [consumedContracts, setConsumedContracts] = useState(true)
  const ref = useRef(null)

  useEffect(() => {
    if (data) {
      setContracts(data)
    }
  }, [data])

  useEffect(() => {
    window.scrollTo(0, 0, 'smooth')
    calculateItemsPerPage(currentPage, 2, data, setContracts)
  }, [currentPage, data] )
  
  // useEffect( () => {
  //   console.log('hello')
  // },[consumedContracts, providedContract])

  const handleSearch = (e) => {
    console.log('Searching contracts by: ', e.target.value)
    ref.current.value = ''
  }
  const totalPages = useMemo(() => calculateTotalPages(data.length, 2), [data.length])
  const totalPagesToDisplay = totalPages
  const onPageChange = (page) => setCurrentPage(page)
  return (
    <div className='flex flex-row bg-sedimark-light-blue overflow-auto'>
      <SidebarDashboard />
      <div className='w-full'>
        <ButtonGroup setConsumedContract={setConsumedContracts} setProvidedContract={setProvidedContract} />
        <div className=' flex flex-row mt-10 mb-8'>
          <div className=' ml-3 flex flex-row items-center  w-60 h-10 bg-gray-50 border border-gray-300 focus:ring-0 focus:border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5'>
            <HiSearch size={20} />
            <input
              className=' h-8 bg-gray-50 border-none focus:ring-0 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5'
              type='text'
              placeholder='Search  ...'
              ref={ref}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e)
                }
              }}
            />
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPagesToDisplay === 0 ? 1 : totalPagesToDisplay} onPageChange={onPageChange} className='h-8 flex items-center ml-48' />
        </div>
        {contracts.map((contract, index) => {
          return (
            <Link key={`${contract.title}-${contract.created_at}-${index + 1}`} href='#'>
              <ContractItem
                vc={contract}
                price={contract.price}
                isProvidedContract={providedContract}
                isConsumedContract={consumedContracts}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default Contracts
