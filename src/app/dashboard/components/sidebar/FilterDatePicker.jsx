import Datepicker from 'react-tailwindcss-datepicker'
import { useState } from 'react'

/**
 * Renders a date range picker for filtering contracts.
 *
 * - Tracks the selected date range using state (`value`).
 * - Ensures the current selection is displayed in the `Datepicker` by passing
 *   the `value` prop; without it, the placeholder is shown instead.
 */
const FilterDatepicker = () => {
  const [value, setValue] = useState()

  // TODO: FIX -> When passing setValue directly to onchange there are too many re-renders and the app crashes
  const handleChange = (value) => {
    setValue(value)
  }

  return (
    <Datepicker
      displayFormat='DD/MM/YYYY'
      onChange={handleChange}
      primaryColor='cyan'
      value={value}
      separator='to'
      placeholder='Select period'
      containerClassName='overflow-x-clip'
    />
  )
}

export default FilterDatepicker
