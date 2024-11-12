import { TextInput, Label } from 'flowbite-react'
import { useField } from 'formik'

/**
 * Custom component to extend Formik into Flowbite React TextInput component.
 *
 * @param {*} label The content for a Flowbite React Label component.
 * @returns returns a JSX element that uses Flowbite React TextInput with Formik functions & props.
 */
const CustomTextInput = ({ label, ...props }) => {
  // useField() returns an array containing [fieldProps, fieldMeta]
  // Spread these onto the input and use them to manage validation and error display
  const [field, meta] = useField(props)
  return (
    <>
      {label &&
        <div className='block mb-2'>
          <Label htmlFor={props.id || props.name} value={label} />
        </div>}
      <TextInput
        {...field}
        {...props}
        helperText={meta.touched && meta.error ? meta.error : ''}
        color={meta.touched && meta.error ? 'failure' : 'gray'}
      />

    </>
  )
}

export default CustomTextInput
