import Datepicker from 'react-tailwindcss-datepicker'
import { useState } from 'react'

const FilterDatepicker = () => {
  const [value, setValue] = useState()
  const handleChange = (value) => {
    setValue(value)
    console.log('Filtering contracts by: date range - ', value)
  }

  return (
    <Datepicker
      displayFormat='DD/MM/YYYY'
      onChange={handleChange}
      primaryColor='cyan'
      value={value}
      separator='to'
      placeholder='Select period'
      containerClassName='overflow-x-auto'
    />
  )
}

export default FilterDatepicker
