import { Pagination } from 'flowbite-react'

/**
 * Renders a custom pagination component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.totalPages - The total number of pages.
 * @param {number} props.currentPage - The current page number.
 * @param {function} props.setCurrentPage - The function to set the current page.
 * @returns {JSX.Element} The custom pagination component that is a wrapper for the flowbite pagination component.
 */
export function CustomPagination ({ totalPages, currentPage, setCurrentPage }) {
  const onPageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page)
    }
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
