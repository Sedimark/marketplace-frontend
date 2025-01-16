import { HiDownload, HiUpload } from 'react-icons/hi'
import { Button } from 'flowbite-react'

function ButtonGroup ({ setSelected, selected }) {
  return (
    <div className='flex justify-center mt-5'>
      <Button
        className={`w-48 h-20 items-center shadow-lg rounded-r-none focus:ring-0 ${
      selected === 'consumed'
        ? 'bg-sedimark-deep-blue hover:bg-sedimark-light-blue text-white'
        : 'bg-white hover:bg-gray-200 text-black'
    }`}
        onClick={() => setSelected('consumed')}
      >
        {/* {'flex items-center space-x-2.5 rtl:space-x-reverse ' + (activeStep === index ? 'text-blue-600' : 'text-gray-500') */}

        <div className='flex flex-col items-center text-center'>
          <HiDownload size={20} color={selected === 'consumed' ? 'white' : 'black'} />
          Consumed
        </div>
      </Button>
      <Button
        className={`w-48 h-20 items-center shadow-lg rounded-l-none focus:ring-0 ${
      selected === 'provided'
        ? 'bg-sedimark-deep-blue hover:bg-sedimark-light-blue text-white'
        : 'bg-white hover:bg-gray-200 text-black'
    }`}
        onClick={() => setSelected('provided')}
      >
        <div className='flex flex-col items-center text-center'>
          <HiUpload size={20} color={selected === 'provided' ? 'white' : 'black'} />
          Provided
        </div>
      </Button>
    </div>
  )
}

export default ButtonGroup
