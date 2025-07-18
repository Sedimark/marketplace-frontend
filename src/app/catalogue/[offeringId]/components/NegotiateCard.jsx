import { Card } from 'flowbite-react'
import { HiShoppingCart } from 'react-icons/hi'

function NegotiateCard () {
  return (
    <Card className='flex max-w-sm min-w-fit max-h-72 min-h-fit pt-2 sticky top-28'>
      {/*
      <div className='my-3 flex space-x-3'>
        <HiClock size={20} />
        <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>Accessible for three months</span>
      </div>
      */}
      <div className='flex flex-col items-center'>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-lg bg-sedimark-deep-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900'
        >
          <span className='flex items center'>
            <HiShoppingCart size={18} className='mr-1' />
            Negotiate
          </span>
        </button>
      </div>
    </Card>
  )
}
export default NegotiateCard
