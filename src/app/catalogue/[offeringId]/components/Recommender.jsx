import Link from 'next/link'
import RecommenderItem from './RecommenderItem'

function Recommender ({ recommendations }) {
  return (
    <div className='bg-white w-3/3 m-5 mr-10 p-5 rounded-md'>
      <h2 className='font-bold text-2xl'>You may also like...</h2>
      <div className='flex gap-4 overflow-x-auto p-4 w-full'>
        {recommendations.map((recommendation, index) => {
          return (
            <Link key={`${recommendation.title.value}-${recommendation.created.value}-${index + 1}`} href='#'>
              <RecommenderItem
                vc={recommendation}
                providerName={recommendation.publisher.value}
                price={recommendation?.price ?? 0}
                color='bg-sedimark-light-blue bg-red'
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default Recommender
