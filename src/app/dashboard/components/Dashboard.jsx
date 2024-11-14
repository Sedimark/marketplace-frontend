'use client'

// import Overview from '../overview/components/Overview'
import SidebarDashboard from './sidebar/Sidebar'

function Dashboard () {
  return (
    <div className='flex h-full'>
      <SidebarDashboard />
      {/* <Overview /> */}
    </div>
  )
}
export default Dashboard
