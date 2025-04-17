'use client'
import { Button, Checkbox, Label, ListGroup } from 'flowbite-react'
import { useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
/**
 * Component responsible for rendering a sidebar with filtering options for the catalogue results.
 * It also allows the user to filter the catalogue by providers and keywords.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.keywords - A sorted array of unique keywords found in the 'gx:keyword' property of 'gx:ServiceOffering'.
 * @param {Array} props.selectedProviders - An array of selected provider IDs.
 * @param {Function} props.setSelectedProviders - A function to set the selected providers.
 * @param {Array} props.selectedKeywords - An array of selected keywords.
 * @param {Function} props.setSelectedKeywords - A function to set the selected keywords.
 *
 * @returns {JSX.Element} A JSX element representing the rendered sidebar.
 */
export default function CatalogueSideBar ({
  providersList,
  keywordsList
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [selectedProviders, setSelectedProviders] = useState([])

  const handleProviderChange = (provider) => {
    const index = selectedProviders.indexOf(provider)
    if (index > -1) {
      setSelectedProviders(selectedProviders.filter((_, i) => i !== index))
    } else {
      setSelectedProviders([...selectedProviders, provider])
    }
  }

  const handleKeywordChange = (keyword) => {
    const index = selectedKeywords.indexOf(keyword)
    if (index > -1) {
      setSelectedKeywords(selectedKeywords.filter((_, i) => i !== index))
    } else {
      setSelectedKeywords([...selectedKeywords, keyword])
    }
  }

  const createPageURL = (keywords, providers) => {
    const params = new URLSearchParams(searchParams)
    // Reset page & clear
    params.set('page', '1')
    params.delete('keywords')
    params.delete('providers')
    keywords.forEach(element => {
      params.append('keywords', element.toString())
    })
    providers.forEach(element => {
      params.append('providers', element.toString())
    })
    return `${pathname}?${params.toString()}`
  }

  const applyFilter = (keywords, providers) => {
    router.push(createPageURL(keywords, providers))
  }

  return (
    <div className='flex flex-col gap-4 p-2 bg-gray-50'>
      <div className='flex flex-col gap-2 p-3'>
        <div className='text-2xl font-semibold'>Filters</div>
        <Button
          size='xs'
          className='px-5 py-1 mb-2 text-sm'
          onClick={() => {
            applyFilter(selectedKeywords, selectedProviders)
          }}
        >Apply Filters
        </Button>
        <div className='text-lg font-semibold'>Providers</div>

        {selectedProviders.length > 0 && (
          <Button
            size='xs'
            className='px-5 py-1 mb-2 text-sm text-gray-900 bg-gray-100 border border-gray-200 rounded-lg me-2 focus:outline-none enabled:hover:bg-gray-200 hover:text-gray focus:z-10 focus:ring-4 focus:ring-gray-100'
            onClick={() => {
              setSelectedProviders([])
            }}
          >
            Clear all Providers
          </Button>
        )}
        <ListGroup className='w-48 h-80 overflow-auto '>
          {!providersList?.error &&
            <>
              {providersList.map((provider) => (
                <ListGroup.Item
                  key={`provider-${provider}-filter`}
                  className='flex items-center text-left cursor-pointer last:border-b-0'
                  onClick={() => {
                    handleProviderChange(provider)
                  }}
                >
                  <Checkbox
                    id={provider}
                    className='mr-2'
                    checked={selectedProviders.includes(provider)}
                    readOnly
                  />
                  <Label className='py-1 text-left'>
                    {provider}
                  </Label>
                </ListGroup.Item>
              ))}
            </>}
        </ListGroup>
        <div className='text-lg font-semibold'>Keywords</div>
        {selectedKeywords.length > 0 && (
          <Button
            size='xs'
            className='px-5 py-1 mb-2 text-sm text-gray-900 bg-gray-100 border border-gray-200 rounded-lg me-2 focus:outline-none enabled:hover:bg-gray-200 hover:text-gray focus:z-10 focus:ring-4 focus:ring-gray-100'
            onClick={() => {
              setSelectedKeywords([])
            }}
          >
            Clear all keywords
          </Button>
        )}

        <div>
          <ListGroup className='w-48 h-64 overflow-auto'>
            {!keywordsList?.error &&
              <>
                {keywordsList.map((keyword, index) => (
                  <ListGroup.Item
                    key={`keyword-${keyword}-filter` + index}
                    className='flex items-center cursor-pointer last:border-b-0'
                    onClick={() => handleKeywordChange(keyword)}
                  >
                    <Checkbox
                      id={keyword}
                      className='mr-2'
                      checked={selectedKeywords.includes(keyword)}
                      readOnly
                    />
                    <Label className='py-1 text-left'>
                      {keyword}
                    </Label>
                  </ListGroup.Item>
                ))}
              </>}
          </ListGroup>
        </div>
      </div>
    </div>
  )
}
