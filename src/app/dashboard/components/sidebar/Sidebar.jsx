import { Sidebar } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import customTheme from './style'
import icon from '@/utils/icons/icons'
function SidebarDashboard () {
  const router = useRouter()

  const handleItemClick = (path) => {
    router.push(`/dashboard/${path}`)
  }
  return (
    <div>
      <Sidebar className='bg-white' theme={customTheme}>
        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col'>
            <Sidebar.Item onClick={() => handleItemClick('overview')}>
              <div className='flex flex-row gap-2'>
                {icon.pie}
                Overview
              </div>
            </Sidebar.Item>
            <Sidebar.Item onClick={() => handleItemClick('contracts')} labelColor='dark'>
              <div className='flex flex-row gap-2'>
                {icon.bag}
                Contracts
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
export default SidebarDashboard
