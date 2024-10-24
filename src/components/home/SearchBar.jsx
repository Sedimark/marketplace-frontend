'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button, Dropdown } from 'flowbite-react'

const SEARCH_TYPES_MAPPING = {
  all: 'All',
  providers: 'Providers',
  services: 'Services'
}

export default function SearchBar () {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [searchType, setSearchType] = useState(searchParams.get('type')?.toString() || 'all')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query')?.toString())

  function triggerSearch () {
    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set('type', searchType)
      params.set('query', searchQuery)
    } else {
      params.delete('type')
      params.delete('query')
    }

    replace(`/catalogue?${params.toString()}`)
  }

  return (
    <div className='p-6 w-full grid justify-center'>
      <div className='inline-flex'>
        <Dropdown color='gray' theme={{ floating: { target: 'rounded-none rounded-l-lg' } }} label={`${SEARCH_TYPES_MAPPING[searchType]}`} dismissOnClick>
          <Dropdown.Item onClick={() => { setSearchType('all') }}>{SEARCH_TYPES_MAPPING.all}</Dropdown.Item>
          <Dropdown.Item onClick={() => { setSearchType('providers') }}>{SEARCH_TYPES_MAPPING.providers}</Dropdown.Item>
          <Dropdown.Item onClick={() => { setSearchType('services') }}>{SEARCH_TYPES_MAPPING.services}</Dropdown.Item>
        </Dropdown>
        <input
          className='bg-gray-50 border border-gray-300 focus:ring-0 focus:border-gray-300 text-gray-900 text-sm rounded-none block w-full ps-10 p-2.5'
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
          Search
        </Button>
      </div>
    </div>
  )
}
