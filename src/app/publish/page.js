import PublishForm from './components/PublishForm'
import { fetchAssetsFromBroker } from '@/utils/broker'

const brokerAssets = await fetchAssetsFromBroker()

export default function Page () {
  return (
    <PublishForm brokerAssets={brokerAssets}/>
  )
}
