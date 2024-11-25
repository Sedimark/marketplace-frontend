import { Checkbox, Label, ListGroup, Sidebar } from 'flowbite-react'
import { HiSwitchVertical, HiFilter, HiChartPie, HiShoppingBag } from 'react-icons/hi'
import { usePathname, useRouter } from 'next/navigation'
import customTheme from './style'
import FilterDatepicker from './FilterDatePicker'
import { useEffect, useState } from 'react'
function SidebarDashboard () {
  const router = useRouter()
  const pathname = usePathname()
  const [isContracts, setContracts] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleItemClick = (path) => {
    if (path === 'contracts') {
      setContracts(true)
    }
    router.push(`/dashboard/${path}`)
  }

  const handleCheckbox = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category)
    console.log('Filtering contracts by:', category)
  }
  useEffect(() => {
    if (pathname === '/dashboard/contracts') {
      setContracts(true)
    }
  }, [pathname])

  const sort = ['Creation date', 'Name', 'Price']

  return (
    <div>
      <Sidebar className='bg-white' theme={customTheme}>
        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col'>
            <Sidebar.Item onClick={() => handleItemClick('overview')}>
              <div className='flex flex-row gap-2'>
                <HiChartPie className='h-5 w-5' />
                Overview
              </div>
            </Sidebar.Item>
            <Sidebar.Item onClick={() => handleItemClick('contracts')} labelColor='dark'>
              <div className='flex flex-row gap-2'>
                <HiShoppingBag className='h-5 w-5' />
                Contracts
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          {isContracts &&
            <Sidebar.ItemGroup className='w-60'>
              <Sidebar.Collapse icon={HiSwitchVertical} label='Sort'>
                <div>
                  <ListGroup className='overflow-auto border-none ml-4 focus:ring-0'>
                    {sort.map((category, index) => (
                      <div
                        key={`${category}-${index}`}
                        className='flex items-center border-none focus:ring-0 m-2 ml-4'
                      >
                        <Checkbox
                          id={category}
                          className='mr-2 focus:ring-0'
                          checked={selectedCategory === category}
                          onChange={() => handleCheckbox(category)}
                        />
                        <Label htmlFor={`${category}`} className='cursor-pointer'>{category}</Label>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiFilter} label='Filters'>
                <FilterDatepicker />
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>}
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
export default SidebarDashboard