'use client'

<<<<<<< Updated upstream
import Overview from './overview/Overview'
=======
// import Overview from '../overview/components/Overview'
>>>>>>> Stashed changes
import SidebarDashboard from './sidebar/Sidebar'

function Dashboard () {
  return (
    <div className='flex h-full'>
      <SidebarDashboard />
<<<<<<< Updated upstream
      <Overview />
=======
      {/* <Overview /> */}
>>>>>>> Stashed changes
    </div>
  )
}
export default Dashboard
