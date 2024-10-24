'use client'
import { useEffect, useState } from 'react'
import CatalogueSideBar from './SideBar'
import ResultsList from './ResultsList'
import {
  getFilteredProviders,
  getFilteredOfferings,
  getSortedResults
} from '../utils/filtering'

/**
 * Component responsible for rendering a pane to display and sort/filter catalogue query results.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.queryType - The type of the query, can be 'providers' or 'services'. Any other
 * value means both.
 * @param {Array} props.providers - An array of Verifiable Credentials (VCs) of type 'gx:LegalParticipant'.
 * @param {Array} props.offerings - An array of Verifiable Credentials (VCs) of type 'gx:ServiceOffering'.
 * @param {Object} props.providersMapping - An object mapping the IDs of 'gx:LegalParticipant' to their 'gx:legalName'.
 * @param {Array} props.keywords - A sorted array of unique keywords found in the 'gx:keyword' property of 'gx:ServiceOffering'.
 *
 * @returns {JSX.Element} A JSX element representing the rendered pane of results.
 */
export default function ResultsPane ({
  queryType,
  providers,
  offerings,
  providersMapping,
  keywords
}) {
  const [results, setResults] = useState([])
  const [sortField, setSortField] = useState('name')
  const [descending, setDescending] = useState(false)
  const [selectedProviders, setSelectedProviders] = useState(
    Object.keys(providersMapping)
  )
  const [selectedKeywords, setSelectedKeywords] = useState(keywords)

  useEffect(() => {
    const filteredProviders = getFilteredProviders(providers, selectedProviders)
    const filteredOfferings = getFilteredOfferings(
      offerings,
      selectedProviders,
      selectedKeywords
    )

    let toSort = []
    if (queryType === 'providers') {
      toSort = filteredProviders
    } else if (queryType === 'services') {
      toSort = filteredOfferings
    } else {
      toSort = filteredProviders.concat(filteredOfferings)
    }
    const sortedResults = getSortedResults(toSort, sortField, descending)
    setResults(sortedResults)
  }, [
    queryType,
    providers,
    offerings,
    sortField,
    descending,
    selectedProviders,
    selectedKeywords
  ])

  return (
    <div className='flex flex-row bg-sedimark-light-gray'>
      <CatalogueSideBar
        queryType={queryType}
        providersMapping={providersMapping}
        keywords={keywords}
        setSortField={setSortField}
        descending={descending}
        setDescending={setDescending}
        selectedProviders={selectedProviders}
        setSelectedProviders={setSelectedProviders}
        selectedKeywords={selectedKeywords}
        setSelectedKeywords={setSelectedKeywords}
      />
      {/*  TODO: Add error handling from server side  */}
      {Boolean(!results.length) && (
        <div className='flex flex-col w-full p-4 gap-4'>
          <div class='w-full p-6 gap-4 text-center bg-white border border-gray-200 rounded-lg shadow'>
            <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Whoops! There are no results matching your filters criteria.</h5>
            <p class='font-normal text-gray-700'>You should try to change your filters to see more results...</p>
          </div>
        </div>
      )}
      {Boolean(results.length) && (
        <ResultsList results={results} providersMapping={providersMapping} />
      )}
    </div>
  )
}
