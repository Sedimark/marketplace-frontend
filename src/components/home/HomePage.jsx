import { Suspense } from 'react'
import SearchBar from '@/components/home/SearchBar'
import Slideshow from '@/components/home/Slideshow'
import Banner from '@/components/home/Banner'

const HomePage = () => {
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
          <Banner />
        </div>
      </div>
    </div>
  )
}

export default HomePage
