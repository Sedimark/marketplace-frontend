import React from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className='flex items-center justify-between rounded-xl bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 \
                py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >Previous
        </button>
        <button className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white
                px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing page <span className='font-medium'>{currentPage}</span> of{' '}
            <span className='font-medium'>{totalPages}</span> pages
          </p>
        </div>
        <div>
          <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
            <button
              className={`relative inline-flex ring-1 ring-inset items-center rounded-l-md px-2 py-2 focus:z-20 focus:outline-offset-0
                        ${currentPage === 1
? 'bg-gray-300 text-gray-400 ring-gray-300 hover:bg-gray-50'
                            : 'text-sedimark-black bg-sedimark-orange focus-visible:outline focus-visible:outline-2 ' +
                            'focus-visible:outline-offset-2 focus-visible:outline-sedimark-orange hover:bg-sedimark-orange'}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span className='sr-only'>Previous</span>
              <ArrowLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={`${i}-pagination`} aria-current='page'
                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                                    focus:z-20 focus-visible:outline focus-visible:outline-2 
                                    focus-visible:outline-offset-2 focus-visible:outline-sedimark-orange 
                        ${i + 1 === currentPage ? 'bg-sedimark-orange text-sedimark-black' : 'bg-gray-300 text-gray-500 hover:bg-sedimark-orange'}`}
                onClick={() => handlePageChange(i + 1)}
              >{i + 1}
              </button>

            ))}

            <button
              className={`relative inline-flex ring-2 ring-inset items-center rounded-r-md px-2 py-2 focus:z-20 focus:outline-offset-0
                        ${currentPage === totalPages
? 'bg-gray-300 text-gray-400 ring-gray-300 hover:bg-gray-50'
                            : 'text-sedimark-black bg-sedimark-orange focus-visible:outline focus-visible:outline-2 ' +
                            'focus-visible:outline-offset-2 focus-visible:outline-sedimark-orange hover:bg-sedimark-orange'}`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span className='sr-only'>Next</span>
              <ArrowRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
