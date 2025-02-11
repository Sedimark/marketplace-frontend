import Asset from './Asset'
import ProviderCard from './ProviderCard'
import PriceCard from './PriceCard'

function DatasetInfoComponent ({ offering, provider }) {
  return (
    <>
      <div className='flex justify-between m-10 bg-sedimark-light-blue'>
        <div className='w-2/3 pt-1'>
          <Asset offering={offering} />
          <ProviderCard provider={provider} />
        </div>
        <div className='pt-2'>
          <PriceCard price={offering?.price ?? 0} />
        </div>
      </div>
    </>
  )
}
export default DatasetInfoComponent
