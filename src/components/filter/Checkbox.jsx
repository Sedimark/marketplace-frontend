'use client'
import { Checkbox as FlowbiteCheckBox } from 'flowbite-react'

const Checkbox = ({ value, name, checkboxState, handleCheckboxChange }) => {
  return (
    <label
      className='flex items-center py-2 px-3 w-full cursor-pointer'
      htmlFor={`vertical-list-${value}`}
    >
      <FlowbiteCheckBox
        id={`vertical-list-${value}`}
        className='hover:before:opacity-0'
        containerProps={{ className: 'pr-2' }}
        checked={checkboxState[value] || false}
        name={value}
        onChange={handleCheckboxChange}
      />
      <span color='blue-gray' className='font-medium'>
        {name}
      </span>
    </label>
  )
}

export default Checkbox
