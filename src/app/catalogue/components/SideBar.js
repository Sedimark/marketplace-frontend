'use client'
import { Checkbox, Label, ListGroup, Radio } from 'flowbite-react'

/**
 * Component responsible for rendering a sidebar with sorting and filtering options for the catalogue results.
 * It allows the user to sort the catalogue by name or date, in ascending or descending order.
 * It also allows the user to filter the catalogue by providers and keywords.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.queryType - The type of the query, can be 'providers' or any other value.
 * @param {Object} props.providersMapping - An object mapping the IDs of 'gx:LegalParticipant' to their 'gx:legalName'.
 * @param {Array} props.keywords - A sorted array of unique keywords found in the 'gx:keyword' property of 'gx:ServiceOffering'.
 * @param {Function} props.setSortField - A function to set the sort field.
 * @param {boolean} props.descending - Whether the sort order is descending.
 * @param {Function} props.setDescending - A function to set the sort order.
 * @param {Array} props.selectedProviders - An array of selected provider IDs.
 * @param {Function} props.setSelectedProviders - A function to set the selected providers.
 * @param {Array} props.selectedKeywords - An array of selected keywords.
 * @param {Function} props.setSelectedKeywords - A function to set the selected keywords.
 *
 * @returns {JSX.Element} A JSX element representing the rendered sidebar.
 */
export default function CatalogueSideBar ({
  queryType,
  providersMapping,
  keywords,
  setSortField,
  descending,
  setDescending,
  selectedProviders,
  setSelectedProviders,
  selectedKeywords,
  setSelectedKeywords
}) {
  return (
    <div className='flex flex-col bg-gray-50 gap-4 p-2'>
      <div className='flex flex-col gap-2'>
        <div className='text-2xl font-semibold'>Sort</div>
        <fieldset
          className='flex max-w-md flex-col gap-4'
          onChange={(event) => setSortField(event.target.value)}
        >
          <div className='flex items-center gap-2'>
            <Radio
              id='name-sort'
              name='catalogue-sort'
              value='name'
              defaultChecked
            />
            <Label htmlFor='name-sort'>Name</Label>
          </div>
          <div className='flex items-center gap-2'>
            <Radio id='date-sort' name='catalogue-sort' value='date' />
            <Label htmlFor='date-sort'>Date</Label>
          </div>
        </fieldset>
        <button
          className='flex flex-row items-center gap-2'
          onClick={(event) => setDescending(!descending)}
        >
          <svg
            className='w-8 h-8 border-black'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clipRule='evenodd'
              d='M2.24 6.8a.75.75 0 0 0 1.06-.04l1.95-2.1v8.59a.75.75 0 0 0 1.5 0V4.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L2.2 5.74a.75.75 0 0 0 .04 1.06Zm8 6.4a.75.75 0 0 0-.04 1.06l3.25 3.5a.75.75 0 0 0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75a.75.75 0 0 0-1.5 0v8.59l-1.95-2.1.75.75 0 0 0-1.06-.04Z'
              fillRule='evenodd'
            />
          </svg>
          {descending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-2xl font-semibold'>Filters</div>
        <div className='text-lg font-semibold'>Providers</div>
        <ListGroup className='w-48'>
          {Object.entries(providersMapping).map(([id, name]) => (
            <ListGroup.Item
              key={`provider-${id}-filter`}
              onClick={(event) => {
                const index = selectedProviders.indexOf(event.target.id)
                if (index > -1) {
                  setSelectedProviders(selectedProviders.toSpliced(index, 1))
                } else {
                  setSelectedProviders(
                    selectedProviders.concat([event.target.id])
                  )
                }
              }}
            >
              <Checkbox
                id={id}
                className='mr-2'
                checked={selectedProviders.includes(id)}
                readOnly
              />
              <Label htmlFor={id} className='text-left'>{name}</Label>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className='text-lg font-semibold'>Keywords</div>
        <ListGroup className='w-48 h-64 overflow-auto'>
          {keywords.map((keyword) => (
            <ListGroup.Item
              key={`keyword-${keyword}-filter`}
              onClick={(event) => {
                const index = selectedKeywords.indexOf(event.target.id)
                if (index > -1) {
                  setSelectedKeywords(selectedKeywords.toSpliced(index, 1))
                } else {
                  setSelectedKeywords(
                    selectedKeywords.concat([event.target.id])
                  )
                }
              }}
            >
              <Checkbox
                id={keyword}
                className='mr-2'
                checked={selectedKeywords.includes(keyword)}
                readOnly
              />
              <Label htmlFor={keyword} className='text-left'>{keyword}</Label>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  )
}
