import { Sidebar } from 'flowbite-react'
import customTheme from './style'
function SidebarDashboard () {
  return (
    <div>
      <Sidebar className='bg-white' theme={customTheme}>
        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col'>
            <Sidebar.Item href='#'>
              <div className='flex flex-row gap-2'>
                <svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z' />
                  <path d='M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z' />
                </svg>
                Overview
              </div>
            </Sidebar.Item>
            <Sidebar.Item href='#' labelColor='dark'>
              <div className='flex flex-row gap-2'>
                <svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                  <path fill-rule='evenodd' d='M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z' clip-rule='evenodd' />
                </svg>
                Contracts
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
export default SidebarDashboard
// .h-full.overflow-y-auto.overflow-x-hidden.rounded.bg-gray-50.px-3.py-4.dark\:bg-gray-800
