'use client'
import { Card } from 'flowbite-react'
import { useEffect, useState } from 'react'
import Select from '@/components/filter/Select'

export const Filter = ({ dataSets, setFilteredData, setCurrentPage }) => {
  const selectStatusFilter = [
    { label: 'Active', value: 'active' },
    { label: 'Revoked', value: 'revoked' },
    { label: 'Deprecated', value: 'deprecated' }
  ]
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedKey, setSelectedKey] = useState(null)

  const handleSelectStatusChange = event => {
    setSelectedOption(event.target.value)
    setSelectedKey('status')
  }
  // const [checkboxState, setCheckboxState] = useState({});
  // const filterDefaultOptions = [
  //     {name: "Status", value: "status"},
  //     {name: "Deprecated", value: "status"}
  // ]
  // const handleCheckboxChange = (event) => {
  //     const {name, checked} = event.target;
  //     setCheckboxState({...checkboxState, [name]: checked});
  // };
  // const checkboxRef = useRef < HTMLInputElement > null;

  useEffect(() => {
    if (selectedOption && selectedOption !== 'none') {
      const filtered = dataSets.filter(dataSet => {
        return dataSet.meta[selectedKey]
          ? dataSet.meta[selectedKey].includes(selectedOption)
          : false
      })
      setFilteredData(filtered)
    } else setFilteredData(dataSets)
    setCurrentPage(1)
  }, [dataSets, selectedKey, selectedOption, setCurrentPage, setFilteredData])

  return (
    <div className='p-4 w-1/4 rounded-xl bg-sedimark-deep-blue'>
      <h1 className='text-xl text-sedimark-white font-bold px-2'>Filter</h1>
      {/* <Card className={"mt-6"}> */}
      {/*    {filterDefaultOptions.map(({value, name}, index) => ( */}
      {/*        <Checkbox key={`${value}-${index}`} checkboxState={checkboxState} name={name} value={value} */}
      {/*                  index={index} */}
      {/*                  handleCheckboxChange={handleCheckboxChange}/> */}
      {/*    ))} */}
      {/* </Card> */}
      <Card className='mt-6'>
        {selectStatusFilter && (
          <Select
            selectedValue={selectedOption}
            handleSelectChange={handleSelectStatusChange}
            options={selectStatusFilter}
          />
        )}
      </Card>
    </div>
  )
}
export default Filter
