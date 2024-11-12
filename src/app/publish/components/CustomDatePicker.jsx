import Datepicker from 'react-tailwindcss-datepicker'
import { Label } from 'flowbite-react'
import { useFormikContext, useField } from 'formik'
import { useState } from 'react'

/**
 * CustomDatepicker component renders a date picker with a label and handles form field value changes.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label for the date picker.
 * @param {Object} props.rest - The rest of the properties passed to the useField hook.
 * @returns {JSX.Element} The rendered CustomDatepicker component.
 */
const CustomDatepicker = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(props)
  const [value, setValue] = useState()

  const handleChange = (value) => {
    setValue(value)
    setFieldValue(field.name, value)
  }
  return (
    <>
      <div className='block mb-2'>
        <Label>{label}</Label>
      </div>
      <div>
        <Datepicker
          displayFormat='DD/MM/YYYY'
          onChange={handleChange}
          primaryColor='cyan'
          separator='to'
          value={value}
        />
        {meta.touched && meta.error && (
          <p className='mt-2 text-sm text-red-600'>A duration period is required for the policy</p>
        )}
      </div>
    </>
  )
}

export default CustomDatepicker
