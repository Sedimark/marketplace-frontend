export const MenuDropDownItems = ({ hideBurgerDropDown, hideDropDown }) => {
  return (

    <div
      id='dropdownNavbar' className={`font-normal bg-white divide-y rounded-lg shadow dark:bg-gray-700
                                    dark:divide-gray-600 ${hideBurgerDropDown ? ' absolute z-10 w-44 ' : ''}
                                    ${hideDropDown ? 'hidden' : ''}`}
    >
      <ul
        className='py-2 text-sm md:text-2xl text-gray-700 dark:text-gray-400'
        aria-labelledby='dropdownLargeButton'
      >
        <li>
          <a
            href='#'
            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
          >Dashboard
          </a>
        </li>
        <li>
          <a
            href='#'
            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
          >Settings
          </a>
        </li>
        <li>
          <a
            href='#'
            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600
                                            dark:hover:text-white'
          >Earnings
          </a>
        </li>
      </ul>
      {/* <div className="py-1"> */}
      {/*    <a */}
      {/*        href="#" */}
      {/*        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 */}
      {/*    dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out */}
      {/*    </a> */}
      {/* </div> */}
    </div>
  )
}

export default MenuDropDownItems
