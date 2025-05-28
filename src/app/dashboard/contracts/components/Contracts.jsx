import ButtonGroup from './ButtonGroup'
import ContractItem from './ContractItem'
import { fetchNegotiations } from '@/utils/connector'

export default async function Contracts ({ currentPage, providerBy }) {
  console.log(providerBy)
  console.log(currentPage)
  const contracts = await fetchNegotiations(currentPage, providerBy)

  return (
    <div className='mt-8'>
      <div className='m-6'>
        <ButtonGroup providerBy={providerBy} />
      </div>
      {contracts.map((contract, index) => {
        return (
          <ContractItem
            contract={contract}
            price={contract.price}
            key={`${contract.contractAgreementId}-${index + 1}`}
          />
        )
      })}
    </div>
  )
}
