'use client'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const ref = useRef(null) // This ref is used to directly manipulate the DOM and reset the search bar text after a search is performed
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      router.push(`/catalogue?query=${searchQuery}`)
      ref.current.value = ''
    }
  }
  return (
    <div className='grid justify-center w-full p-6'>
      <div className='inline-flex'>
        <input
          className='bg-gray-50 border border-gray-300 border-r-0 focus:ring-0 focus:border-gray-300 text-gray-900 text-sm rounded-l-lg block w-full ps-10 p-2.5'
          type='text'
          placeholder='Search Datasets and Services'
          ref={ref}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <Button className='rounded-none rounded-r-lg' color='gray' onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
