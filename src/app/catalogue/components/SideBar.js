'use client'
import { Button, Checkbox, Label, ListGroup } from 'flowbite-react'

/**
 * Component responsible for rendering a sidebar with filtering options for the catalogue results.
 * It also allows the user to filter the catalogue by providers and keywords.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.providersMapping - An object mapping the IDs of 'gx:LegalParticipant' to their 'gx:legalName'.
 * @param {Array} props.keywords - A sorted array of unique keywords found in the 'gx:keyword' property of 'gx:ServiceOffering'.
 * @param {Array} props.selectedProviders - An array of selected provider IDs.
 * @param {Function} props.setSelectedProviders - A function to set the selected providers.
 * @param {Array} props.selectedKeywords - An array of selected keywords.
 * @param {Function} props.setSelectedKeywords - A function to set the selected keywords.
 *
 * @returns {JSX.Element} A JSX element representing the rendered sidebar.
 */
export default function CatalogueSideBar ({
  providersMapping,
  keywords,
  selectedProviders,
  setSelectedProviders,
  selectedKeywords,
  setSelectedKeywords
}) {
  const handleProviderChange = (id) => {
    const index = selectedProviders.indexOf(id)
    if (index > -1) {
      setSelectedProviders(selectedProviders.filter((_, i) => i !== index))
    } else {
      setSelectedProviders([...selectedProviders, id])
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
  return (
    <div className='flex flex-col gap-4 p-2 bg-gray-50'>
      <div className='flex flex-col gap-2 p-3'>
        <div className='text-2xl font-semibold'>Filters</div>
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
        {/* TODO: Fix style of side bar, it was using bootstrap */}
        <ListGroup className='w-48 '>
          {Object.entries(providersMapping).map(([id, name]) => (
            <ListGroup.Item
              key={`provider-${id}-filter`}
              className='flex items-center text-left cursor-pointer last:border-b-0'
              onClick={() => {
                handleProviderChange(id)
              }}
            >
              <Checkbox
                id={id}
                className='mr-2'
                checked={selectedProviders.includes(id)}
                readOnly
              />
              <Label className='py-1 text-left'>
                {name}
              </Label>
            </ListGroup.Item>
          ))}
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
            {keywords.map((keyword) => (
              <ListGroup.Item
                key={`keyword-${keyword}-filter`}
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
          </ListGroup>
        </div>
      </div>
    </div>
  )
}
