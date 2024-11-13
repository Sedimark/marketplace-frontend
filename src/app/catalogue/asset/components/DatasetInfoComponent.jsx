import Asset from './Asset'
import PriceCard from './PriceCard'
function DatasetInfoComponent () {
  const asset = {
    title: 'Climate Change Analysis 2022',
    short_description: 'Data on climate metrics, This dataset provides comprehensive data on various climate metrics for the year 2022. It includes detailed information on temperature changes, precipitation patterns, and carbon emissions. Ideal for researchers, policymakers, and environmental advocates, this dataset supports efforts to understand and address the impacts of climate change',
    provider: 'NOAA',
    price: 50,
    created_at: '2022-01-12T10:24:00',
    updated_at: '2023-10-05T14:30:00',
    keywords: [
      'climate',
      'change'
    ],
    location: 'London, UK',
    description: 'This dataset provides comprehensive data on various climate metrics for the year 2022. It includes detailed information on temperature changes, precipitation patterns, and carbon emissions. The data is sourced from the National Oceanic and Atmospheric Administration (NOAA) and is designed to support research and policy-making efforts related to climate change. Users can analyze trends over time and compare data across different regions to gain insights into the impacts of climate change.'
  }
  return (
    <div className='flex justify-between m-10 bg-sedimark-light-blue'>
      <div className='w-2/3 pt-1'>
        <Asset asset={asset} />
      </div>
      <div className='pt-2'>
        <PriceCard asset={asset} />
      </div>
    </div>

  )
}
export default DatasetInfoComponent
