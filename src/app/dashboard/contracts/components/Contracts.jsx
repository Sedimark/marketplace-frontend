// import SidebarDashboard from '../../components/sidebar/Sidebar'
// import ButtonGroup from './ButtonGroup'
import ContractItem from './ContractItem'
import { fetchNegotiations } from '@/utils/connector'

export default async function Contracts ({ currentPage }) {
  const contracts = await fetchNegotiations(currentPage)

  return (
    <div className='mt-8'>
      {/* <ButtonGroup setSelected={setSelected} selected={selected} /> */}
      {contracts.map((contract, index) => {
        return (
          <ContractItem
            contract={contract}
            price={contract.price}
            key={`${contract.title}-${contract.created_at}-${index + 1}`}
          />
        )
      })}
    </div>
  )
}
