'use client'

import TableRow from '@/components/table/TableRow'
import { useState } from 'react'
import MessageError from '@/components/MessageError'

export const Table = ({ dataSets, accordion, setAccordion }) => {
  const [contractMessage, setContractMessage] = useState(null)
  const handelContractingMessage = () => {
    setContractMessage(<MessageError color='green' message='Contracted successfully' />)
  }
  return (
    <>
      {contractMessage}
      {dataSets.map((item) => {
        return (
          <TableRow
            key={`row-${item.meta.sdHash}`} dataSet={item} accordion={accordion}
            setAccordion={setAccordion} handelContractingMessage={handelContractingMessage}
          />
        )
      })}
    </>

  )
}
