import ButtonGroup from './ButtonGroup'
import ContractItem from './ContractItem'
import { fetchNegotiations } from '@/utils/connector'

export default async function Contracts ({ currentPage, showConsumed }) {
  const contracts = await fetchNegotiations(currentPage, showConsumed)

  return (
    <div className='mt-8'>
      <div className='m-6'>
        <ButtonGroup showConsumed={showConsumed} />
      </div>
      {contracts.map((contract, index) => {
        return (
          <ContractItem
            contract={contract}
            showConsumed={showConsumed}
            key={`${contract.contractAgreementId}-${index + 1}`}
          />
        )
      })}
    </div>
  )
}
