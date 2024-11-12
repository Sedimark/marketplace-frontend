import { Suspense } from 'react'
import SearchBar from '@/components/home/SearchBar'
import Slideshow from '@/components/home/Slideshow'
import Banner from '@/components/home/Banner'
import mockProviders from '@/utils/data/mockProviders.json'
import mockCatalogue from '@/utils/data/mockCatalogue.json'

const HomePage = () => {
  // Fetch catalogue data passing default parameters to set total of offerings on homepage
  const data = mockCatalogue
  // Fetch providers data to display total of participants on the homepage
  const providers = mockProviders
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
          <Banner totalVcs={data.total} providers={providers} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
