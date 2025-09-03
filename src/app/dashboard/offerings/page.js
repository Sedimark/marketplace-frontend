import { Suspense } from 'react'
import SidebarDashboard from '../components/sidebar/Sidebar'
import CustomPagination from '@/components/pagination/Pagination'
import Offerings from './components/Offerings'
import { fetchOfferingsIDs } from '@/utils/offeringManager'
import { calculateTotalPages } from '@/app/catalogue/utils/paginationHelpers'
import settings from '@/utils/settings'
import LoadingCard from '@/app/catalogue/components/LoadingCard'

// This disables the caching on the WHOLE PAGE!! I could do this on the offeringManager.js fetch helper, but seeing that you will be able to
// delete and edit offerings on the fly, you want to see these changes INSTANTLY.
export const revalidate = 0

export default async function Page ({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1
  const offeringsIDs = await fetchOfferingsIDs()
  // check if error is returned, no array to length!
  // Funny enough, I still need to do all this only to know the number of records :/
  let totalPages
  if (Array.isArray(offeringsIDs)) {
    totalPages = calculateTotalPages(offeringsIDs.length, settings.offeringsPageSize)
  } else {
    totalPages = 1
  }
  return (
    <div className='flex flex-row flex-grow'>
      <SidebarDashboard />
      <div className='flex flex-col w-full bg-sedimark-light-blue'>
        <Suspense fallback={<LoadingCard />} key={currentPage}>
          <Offerings currentPage={currentPage} />
        </Suspense>
        <CustomPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  )
}
