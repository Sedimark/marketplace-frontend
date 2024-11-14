'use client'
import { Button } from 'flowbite-react'
import SidebarDashboard from '../../components/sidebar/Sidebar'
function Contracts () {
  return (
    <div className='flex flex-row'>
      <SidebarDashboard />
      <Button.Group className='flex justify-center'>
        <Button className='w-48 h-16 items-center bg-sedimark-deep-blue text-white shadow-lg'>
          <div className='flex flex-col items-center text-center'>
          <svg className='w-5 h-5 text-white dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
            <path fillRule='evenodd' d='M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z' clipRule='evenodd' />
            <path fillRule='evenodd' d='M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z' clipRule='evenodd' />
            </svg>
            Consumed
            </div>
        </Button>
        <Button className='w-48 h-16 items-center bg-white text-black shadow-lg'>
          <div className='flex flex-col items-center text-center'>
            <svg className='w-5 h-5 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z' clipRule='evenodd' />
            </svg>
            Provided
          </div>
        </Button>
      </Button.Group>
    </div>
  )
}
export default Contracts
