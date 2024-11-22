import icon from '@/utils/icons/icons'
import { Button } from 'flowbite-react'

function ButtonGroup () {
  return (
    <div className='flex justify-center mt-5'>
      <Button className='w-48 h-20 items-center bg-sedimark-deep-blue shadow-lg text-black rounded-r-none focus:ring-0'>
        <div className='flex flex-col items-center text-center'>
          {icon.transferIn}
          Consumed
        </div>
      </Button>
      <Button className='w-48 h-20 items-center bg-white text-black shadow-lg rounded-l-none focus:ring-0'>
        <div className='flex flex-col items-center text-center'>
          {icon.transferOut}
          Provided
        </div>
      </Button>
    </div>
  )
}

export default ButtonGroup
