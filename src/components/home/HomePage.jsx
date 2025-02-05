import { Suspense } from 'react'
import SearchBar from '@/components/home/SearchBar'
import Slideshow from '@/components/home/Slideshow'
import Banner from '@/components/home/Banner'
import { fetchOfferingsCount, fetchParticipantsCount } from '@/utils/catalogue'

async function HomePage () {
  // Fetch catalogue data passing default parameters to set total of offerings on homepage
  const offeringsCount = await fetchOfferingsCount()
  // Fetch providers data to display total of participants on the homepage
  const participantsCount = await fetchParticipantsCount()
  return (
    <div className='flex flex-col'>
      <div className='w-full rounded-t-xl bg-sedimark-dark-deep-blue'>
        <div>
          <Slideshow />
        </div>
        <div>
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
        <div>
          <Banner offeringsCount={offeringsCount} participantsCount={participantsCount} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
