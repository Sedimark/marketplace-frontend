import Contracts from './components/Contracts'
import mockContract from '@/utils/data/mockContract.json'

export default function Page () {
  const contracts = mockContract
  return (
    <Contracts data={contracts} />
  )
}
