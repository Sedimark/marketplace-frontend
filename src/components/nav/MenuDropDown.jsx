export const MenuDropDown = ({ openDropDownMenu }) => {
  return (
    <>
      <button
        onClick={openDropDownMenu} id='dropdownNavbarLink' data-dropdown-toggle='dropdownNavbar'
        className='flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900
                                rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700
                                md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white
                                dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
      >Dropdown
        <svg
          className='w-2.5 h-2.5 ml-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>
    </>
  )
}

export default MenuDropDown
