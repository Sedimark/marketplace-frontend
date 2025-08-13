import { HiCalendar, HiUser } from 'react-icons/hi'

function OfferingItem ({ offering, color }) {
  const name = offering.title.value
  const description = offering.description.value
  const issuanceDate = offering.issued.value ? new Date(offering.issued.value) : new Date()
  const date = isNaN(issuanceDate.getTime()) ? new Date() : issuanceDate
  return (
    <div className={`flex flex-col p-4 rounded-lg shadow-lg ${color} hover:bg-gray-100`}>
      <div className='text-lg font-semibold'>{name}</div>
      <div className='flex items-center justify-between w-full'>
        <div>{description.length > 120 ? description.substring(0, 120) + '...' : description}</div>
        <div className='flex flex-row items-center gap-2 w-36'>
          <HiCalendar size={20} />
          <p>{date.toISOString().split('T')[0]}</p>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-row items-center gap-2'>
            <HiUser size={20} />
            <p className='pr-2'>{`${offering.alternateName.value} (${offering.publisher.value})`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferingItem
