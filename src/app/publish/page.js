import PublishForm from './components/PublishForm'
import { fetchAssetsFromBroker } from '@/utils/broker'

// Kinda hate doing the try/catch here... should be done on @/utils/broker ?
let brokerAssets = {}
try {
  brokerAssets = await fetchAssetsFromBroker()
}
catch (e) {
  console.log(e)
}

export default function Page() {
  return (
    <PublishForm brokerAssets={brokerAssets} />
  )
}
