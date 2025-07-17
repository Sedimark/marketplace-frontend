import Asset from './Asset'
import ProviderCard from './ProviderCard'
import NegotiateCard from './NegotiateCard'

function DatasetInfoComponent ({ offering, provider }) {
  return (
    <>
      <div className='flex justify-between m-10 bg-sedimark-light-blue'>
        <div className='w-2/3 pt-1'>
          <Asset offering={offering} />
          <ProviderCard provider={provider} />
        </div>
        <div className='pt-2'>
          <NegotiateCard />
        </div>
      </div>
    </>
  )
}
export default DatasetInfoComponent
