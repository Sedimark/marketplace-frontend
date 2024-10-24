import { Spinner } from 'flowbite-react'

/**
 * Component responsible for rendering a loading card.
 *
 * @returns {JSX.Element} A JSX element representing the rendered loading card.
 */
export default function LoadingCard () {
  return (
    <div className='flex flex-col bg-sedimark-light-gray items-center p-4'>
      <div className='flex flex-col items-center gap-2 bg-gray-50 rounded-lg shadow-md p-4 w-full'>
        <Spinner aria-label='loading-card' />
        <div className='text-lg font-semibold'>Loading...</div>
      </div>
    </div>
  )
}
