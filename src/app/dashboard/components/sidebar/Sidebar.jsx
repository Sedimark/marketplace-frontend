'use client'

// As this needs a rework on interactivity, and now parent is SS, gonna left this for later.
import { HiChartPie, HiShoppingBag } from 'react-icons/hi'
import { usePathname } from 'next/navigation'
// import FilterDatepicker from './FilterDatePicker'
import { Sidebar } from 'flowbite-react'
import customTheme from './style'

function SidebarDashboard () {
  const pathname = usePathname()

  // const [selectedCategory, setSelectedCategory] = useState(null)

  // const handleCheckbox = (category) => {
  //   setSelectedCategory(category === selectedCategory ? null : category)
  //   console.log('Filtering contracts by:', category)
  // }

  // const sort = ['Creation date', 'Name']

  return (
    <div>
      <Sidebar className='bg-white' theme={customTheme}>
        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col'>
            <Sidebar.Item href='/dashboard/overview' className={`${pathname === '/dashboard/overview' ? 'bg-gray-100' : ''}`}>
              <div className='flex flex-row gap-2'>
                <HiChartPie className='h-5 w-5' />
                Overview
              </div>
            </Sidebar.Item>
            <Sidebar.Item href='/dashboard/contracts' className={`${pathname === '/dashboard/contracts' ? 'bg-gray-100' : ''}`}>
              <div className='flex flex-row gap-2'>
                <HiShoppingBag className='h-5 w-5' />
                Contracts
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          {/* {pathname === '/dashboard/contracts' &&
            <Sidebar.ItemGroup className='w-60'>
              <Sidebar.Collapse icon={HiSwitchVertical} label='Sort' open>
                <div>
                  <ListGroup className='overflow-auto border-none ml-4 focus:ring-0'>
                    {sort.map((category, index) => (
                      <div
                        key={`${category}-${index}`}
                        className='flex items-center border-none focus:ring-0 m-2 ml-4'
                      >
                        <Radio
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
              <Sidebar.Collapse icon={HiFilter} label='Filters' open>
                <h4 className='text-sm ml-2'>Creation date</h4>
                <FilterDatepicker />
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>} */}
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
export default SidebarDashboard
