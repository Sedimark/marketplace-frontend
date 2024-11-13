import OfferingItem from '../../components/OfferingItem'
function Recommender ({ recommendations }) {
  return (
    <div className='bg-white w-3/3 m-5 mr-10 p-5 rounded-md'>
      <h2 className='font-bold text-2xl'>You may also like...</h2>
      <div className='flex gap-4 overflow-x-auto p-4 w-full'>
        {recommendations.map((offering, index) => {
          return (
            <OfferingItem
              key={`${offering.title}-${offering.created_at}-${index + 1}`}
              vc={offering}
              providerName={offering.provider}
              price={offering.price}
              color='bg-sedimark-light-blue bg-red'
            />
          )
        })}
      </div>
    </div>
  )
}
export default Recommender
