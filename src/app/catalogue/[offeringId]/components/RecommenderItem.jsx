import { HiCalendar, HiUser } from 'react-icons/hi'

function RecommenderItem ({ offering, color }) {
  const maxLengthTitle = 42
  const maxLengthDescription = 60
  const name = offering.title.value.length > maxLengthTitle ? offering.title.value.substring(0, maxLengthTitle) + '...' : offering.title.value
  const offeringDescription = offering?.description?.value || ''
  const description = offeringDescription.length > maxLengthDescription ? offeringDescription.substring(0, maxLengthDescription) + '...' : offeringDescription
  const issuanceDate = offering.issued.value ? new Date(offering.issued.value) : new Date()
  const date = isNaN(issuanceDate.getTime()) ? new Date() : issuanceDate
  return (
    <div className={`flex flex-col p-4 rounded-lg shadow-lg ${color} hover:bg-gray-100`}>
      <div className='text-lg font-semibold'>{name}</div>
      <div className='flex justify-between w-96 h-32 mt-4 text-sm mr-4'>{description}</div>
      <div className='flex justify-between'>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-row items-center gap-2'>
            <HiUser size={20} />
            <p className='pr-2 text-sm'>{offering.alternateName.value}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <HiCalendar size={20} />
            <p className='text-sm'>{date.toISOString().split('T')[0]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommenderItem
