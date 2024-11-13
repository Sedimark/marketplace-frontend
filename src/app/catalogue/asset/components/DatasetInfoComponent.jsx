import Asset from './Asset'
import PriceCard from './PriceCard'
import mockAsset from '@/utils/data/mockAsset.json'
function DatasetInfoComponent () {
  const asset = mockAsset
  return (
    <>
      <div className='flex justify-between m-10 bg-sedimark-light-blue'>
        <div className='w-2/3 pt-1'>
          <Asset asset={asset} />
        </div>
        <div className='pt-2'>
          <PriceCard price={asset.price} />
        </div>
      </div>
    </>
  )
}
export default DatasetInfoComponent
