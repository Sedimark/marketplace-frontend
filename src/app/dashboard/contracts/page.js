import { Suspense } from 'react'
import SidebarDashboard from '../components/sidebar/Sidebar'
import Contracts from './components/Contracts'
import CustomPagination from './components/CustomPagination'

// DISABLING CACHE for the whole page!
export const revalidate = 0

export default function Page ({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1
  const showConsumed = searchParams.showConsumed === undefined || searchParams.showConsumed === 'true'

  return (
    <div className='flex flex-row flex-grow'>
      <SidebarDashboard />
      {/* TODO: This <Suspense> needs keys & fallback, remember to add when filters/search/page change */}
      <div className='flex flex-col w-full bg-sedimark-light-blue'>
        <Suspense key={showConsumed + currentPage}>
          <Contracts currentPage={currentPage} showConsumed={showConsumed} />
        </Suspense>
        {/* Unless Connectors can provide us a COUNT of records, totalPages is a hardcore value, not a good solution, but at least makes it functional */}
        {/* We're getting forced to pass this value as is required for render! */}
        {/* TODO: fix somehow this */}
        <CustomPagination totalPages={100} currentPage={currentPage} />
      </div>
    </div>
  )
}
