'use client'
import { Pagination } from 'flowbite-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

/**
 * Renders a custom pagination component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.totalPages - The total number of pages.
 * @param {number} props.currentPage - The current page number.
 * @returns {JSX.Element} The custom pagination component that is a wrapper for the flowbite pagination component.
 */
export function CustomPagination ({ totalPages, currentPage }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const onPageChange = (page) => {
    if (page !== currentPage) {
      router.push(createPageURL(page))
    }
  }

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className='flex flex-col items-center overflow-x-auto sm:justify-center py-2.5'>
      <p className='flex text-xs'>page {currentPage} of {totalPages}</p>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  )
}

export default CustomPagination
