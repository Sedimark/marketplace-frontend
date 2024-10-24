import React from 'react'

const Select = ({ handleSelectChange, options, selectedValue }) => {
  return (
    <>
      <div className='select is-fullwidth px-3 py-6 m-2 text-md'>
        <label className='flex w-full h-full '>Filter by Status</label>
        <select
          className={'relative w-full cursor-default rounded-md bg-white py-2.5 px-3 text-left font-sans ' +
                    'text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 ' +
                    'focus:ring-gray-900 sm:text-sm sm:leading-6'}
          value={selectedValue || ''}
          onChange={handleSelectChange}
        >
          <option value='none'>Select Option</option>
          {options.map(({ value, label }, index) => {
            return (
              <option
                key={`${value}-${index}`}
                value={value}
              >{label}
              </option>
            )
          })}
        </select>
      </div>
      {/* <div className="w-72 px-3 pt-4 pb-2"> */}
      {/*    <MaterialSelect label="Filter by Status" onChange={handleSelectChange} value={selectedValue}> */}

      {/*        {options.map(({value, label}) => ( */}
      {/*            <Option key={label} value={value}> */}
      {/*                {label} */}
      {/*            </Option> */}
      {/*        ))} */}
      {/*        <Option value={"none"}>Select Option</Option> */}
      {/*        <Option value={"none2"}>Select Option 2</Option> */}
      {/*        <Option value={"none3"}>Select Option 3</Option> */}
      {/*    </MaterialSelect> */}
      {/* </div> */}
    </>

  )
}

export default Select
