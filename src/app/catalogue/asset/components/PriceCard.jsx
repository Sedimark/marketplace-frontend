import { Card } from 'flowbite-react'
function PriceCard ({ asset }) {
  return (
    <Card className='flex max-w-sm min-w-fit max-h-72 min-h-fit pt-2 sticky top-28'>
      <div className='flex flex-row-reverse text-gray-900 dark:text-white'>
        <span className='flex items-end text-3xl font-bold ml-1'>€</span>
        <span className='text-5xl font-bold tracking-tight'>{asset.price}</span>
      </div>
      <div className='my-3 flex space-x-3'>
        <svg class='w-6 h-6 text-sedimark-deep-blue dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
          <path fill-rule='evenodd' d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z' clip-rule='evenodd' />
        </svg>
        <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>Accessible for three months</span>
      </div>
      <div className='flex flex-col items-center'>
        <a className='text-sedimark-deep-blue mb-2' rel='stylesheet' href=''>Terms & Conditions</a>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-lg bg-sedimark-deep-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900'
        >
          <svg class='w-5 h-5 text-white dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M12.268 6A2 2 0 0 0 14 9h1v1a2 2 0 0 0 3.04 1.708l-.311 1.496a1 1 0 0 1-.979.796H8.605l.208 1H16a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L4.686 5H4a1 1 0 0 1 0-2h1.5a1 1 0 0 1 .979.796L6.939 6h5.329Z' />
            <path d='M18 4a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0V8h2a1 1 0 1 0 0-2h-2V4Z' />
          </svg>
          Buy
        </button>
      </div>
    </Card>
  )
}
export default PriceCard
