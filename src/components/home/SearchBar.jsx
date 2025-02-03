'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from 'flowbite-react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function SearchBar () {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query')?.toString())

  function triggerSearch () {
    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set('query', searchQuery)
    } else {
      params.delete('query')
    }

    replace(`/catalogue?${params.toString()}`)
  }

  return (
    <div className='p-6 w-full grid justify-center'>
      <div className='inline-flex'>
        <input
          className='bg-gray-50 border border-gray-300 focus:ring-0 focus:border-gray-300 text-gray-900 text-sm rounded-none rounded-l-lg block w-full ps-10 p-2.5'
          type='text'
          placeholder='Search Datasets, Services and Providers'
          defaultValue={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              triggerSearch()
            }
          }}
        />
        <Button className='rounded-none rounded-r-lg' color='gray' onClick={triggerSearch}>
          <HiOutlineSearch size={20} />
        </Button>
      </div>
    </div>
  )
}
