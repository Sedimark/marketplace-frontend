import { HiOutlineCurrencyEuro, HiCalendar, HiUser } from 'react-icons/hi'

function RecommenderItem ({ vc, providerName, price, color }) {
  const maxLengthTitle = 42
  const maxLengthDescription = 60
  const name = vc.title.value.length > maxLengthTitle ? vc.title.value.substring(0, maxLengthTitle) + '...' : vc.title.value
  const description = vc.description.value.length > maxLengthDescription ? vc.description.value.substring(0, maxLengthDescription) + '...' : vc.description.value
  const issuanceDate = vc.created.value ? new Date(vc.created.value) : new Date()
  const date = isNaN(issuanceDate.getTime()) ? new Date() : issuanceDate
  const providedBy = providerName ?? 'OTHER'
  const validatedPrice = price ?? '0'
  return (
    <div className={`flex flex-col p-4 rounded-lg shadow-lg ${color} hover:bg-gray-100`}>
      <div className='text-lg font-semibold'>{name}</div>
      <div className='flex justify-between w-96 h-32 mt-4'>
        <div className='text-sm mr-4'>{description}</div>
        <span>
          <div className='flex flex-row gap-2 w-36'>
            <HiOutlineCurrencyEuro size={20} />
            <p className='text-sm'>{validatedPrice} euros</p>
          </div>
          <div className='flex flex-row gap-2 w-36 mt-2'>
            <HiCalendar size={20} />
            <p className='text-sm'>{date.toISOString().split('T')[0]}</p>
          </div>
        </span>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-row items-center gap-2'>
            <HiUser size={20} />
            <p className='pr-2 text-sm'>{providedBy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommenderItem
