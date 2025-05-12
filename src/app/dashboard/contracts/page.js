import { Suspense } from 'react'
import SidebarDashboard from '../components/sidebar/Sidebar'
import Contracts from './components/Contracts'
import CustomPagination from './components/CustomPagination'

export default function Page ({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1
  return (
    <div className='flex flex-row flex-grow'>
      <SidebarDashboard />
      {/* This <Suspense> needs keys & fallback, remember to add when filters/search/page change */}
      <div className='flex flex-col w-full bg-sedimark-light-blue'>
        <Suspense>
          <Contracts currentPage={currentPage} />
        </Suspense>
        <CustomPagination totalPages={100} currentPage={currentPage} />
      </div>
    </div>
  )
}
