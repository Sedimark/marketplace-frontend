import { HiDownload, HiUpload } from 'react-icons/hi'
import { Button } from 'flowbite-react'

function ButtonGroup ( { setProvidedContract, setConsumedContract } ) {
  const handleClick = (value) => {
    console.log('something before?')
    if (value === 'Provided') {
      setProvidedContract(true)
      setConsumedContract(false)
    }
    if (value === 'Consumed') {
      setConsumedContract(true)
      setProvidedContract(false)
    }
  }
  return (
    <div className='flex justify-center mt-5'>
      <Button
        className='w-48 h-20 items-center bg-sedimark-deep-blue shadow-lg text-white rounded-r-none focus:ring-0'
        onClick={handleClick('Consumed')}
      >
        <div className='flex flex-col items-center text-center'>
          <HiDownload size={20} color='white' />
          Consumed
        </div>
      </Button>
      <Button
        className='w-48 h-20 items-center bg-sedimark-deep-blue text-black shadow-lg rounded-l-none focus:ring-0'
        onClick={handleClick('Provided')}
      >
        <div className='flex flex-col items-center text-center'>
          <HiUpload size={20} />
          Provided
        </div>
      </Button>
    </div>
  )
}

export default ButtonGroup
