// import BannerStats from './BannerStats'
import TransferHistory from './TransferHistory'
import SidebarDashboard from '../../components/sidebar/Sidebar'
import { fetchTransferProcess } from '@/utils/connector'

const transferHistory = await fetchTransferProcess()

function Overview () {
  return (
    <div className='flex flex-row flex-grow'>
      <SidebarDashboard />
      <div className='flex flex-col bg-sedimark-light-blue w-full '>
        {/* <BannerStats /> */}
        <TransferHistory transferHistory={transferHistory} />
      </div>
    </div>
  )
}
export default Overview
