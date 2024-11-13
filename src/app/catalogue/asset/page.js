import { Button } from 'flowbite-react'
import DatasetInfoComponent from './components/DatasetInfoComponent'
export default function Page () {
  return (
    <>
      <div className='bg-sedimark-light-blue pt-2 pb-2'>
        <Button className='m-2 ml-10 bg-sedimark-light-gray enabled:hover:bg-sedimark-medium-gray text-sedimark-dark-gray'>
          <svg class='w-5 h-5 text-sedimark-dark-deep-blue dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
            <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14M5 12l4-4m-4 4 4 4' />
          </svg>
          Back to search
        </Button>
        <DatasetInfoComponent />
      </div>
    </>
  )
}
