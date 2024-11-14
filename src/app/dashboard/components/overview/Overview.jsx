import BannerStats from './BannerStats'
import TransferHistory from './TransferHistory'
import mockTransferHistory from '@/utils/data/mockTransfershistory.json'
import mockOverview from '@/utils/data/mockOverview.json'

function Overview () {
  return (
    <div className='flex flex-col bg-sedimark-light-blue w-full '>
      <BannerStats overview={mockOverview.overview} />
      <TransferHistory history={mockTransferHistory.transfer_history} />
    </div>
  )
}
export default Overview
