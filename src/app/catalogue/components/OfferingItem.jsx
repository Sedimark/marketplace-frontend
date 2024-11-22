import icon from '@/utils/icons/icons'

function OfferingItem ({ vc, providerName, price, color }) {
  const name = vc.title
  const description = vc.short_description
  const issuanceDate = vc.created_at ? new Date(vc.created_at) : new Date()
  const date = isNaN(issuanceDate.getTime()) ? new Date() : issuanceDate
  const providedBy = providerName ?? 'OTHER'
  const validatedPrice = price ?? '0'
  return (
    <div className={`flex flex-col p-4 rounded-lg shadow-lg ${color} hover:bg-gray-100`}>
      <div className='text-lg font-semibold'>{name}</div>
      <div className='flex items-center justify-between w-full'>
        <div>{description}</div>
        <div className='flex flex-row items-center gap-2 w-36'>
          {icon.euro}
          <p>{validatedPrice} euros</p>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-row items-center gap-2'>
            {icon.user}
            <p className='pr-2'>{providedBy}</p>
          </div>
        </div>
        <div className='flex flex-row items-center gap-2 w-36'>
          {icon.calendar}
          <p>{date.toISOString().split('T')[0]}</p>
        </div>
      </div>
    </div>
  )
}

export default OfferingItem
