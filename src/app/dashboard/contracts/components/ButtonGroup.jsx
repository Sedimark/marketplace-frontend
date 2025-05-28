import Link from 'next/link'
import { HiDownload, HiUpload } from 'react-icons/hi'
import { Button } from 'flowbite-react'
// import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function ButtonGroup ({ providerBy }) {
  // The moment new searchParams exists (when we add filters) we need to parse the already existing searchParams (so we don't lose them)
  // But a server side component can't access directly the SearchParams...
  function buildHref (existingParams, newProvidedBy) {
    const params = new URLSearchParams()

    for (const key in existingParams) {
      const value = existingParams[key]
      if (key !== 'providerBy' && typeof value === 'string') {
        params.set(key, value)
      }
    }

    params.set('providerBy', newProvidedBy.toString())

    return `?${params.toString()}`
  }
  // -----------------------------------------------------------------------------------------------
  // This is for a client side component, in case we don't like the current implementation.
  // -----------------------------------------------------------------------------------------------
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  // const params = new URLSearchParams(searchParams)
  // console.log(params.getAll('providerBy'))
  // const router = useRouter()

  // const createPageURL = (condition) => {
  //   const params = new URLSearchParams(searchParams)
  //   params.set('providerBy', condition)
  //   return `${pathname}?${params.toString()}`
  // }

  // const onPageChange = (condition) => {
  //     router.push(createPageURL(condition))
  // }

  const hrefTrue = buildHref([], true)
  const hrefFalse = buildHref([], false)
  return (
    <div className='flex justify-center mt-5'>
      <Link
        href={hrefTrue}
      >
        <Button
          className={`w-48 h-20 items-center shadow-lg rounded-r-none focus:ring-0 ${
          providerBy === true
        ? 'bg-sedimark-deep-blue hover:bg-sedimark-light-blue text-white'
        : 'bg-white hover:bg-gray-200 text-black'
    }`}
        >
          <div className='flex flex-col items-center text-center'>
            <HiDownload
              size={20}
              color={providerBy === true ? 'white' : 'black'}
            />
            Consumed
          </div>
        </Button>
      </Link>
      <Link
        href={hrefFalse}
      >
        <Button
          className={`w-48 h-20 items-center shadow-lg rounded-l-none focus:ring-0 ${
          providerBy === false
        ? 'bg-sedimark-deep-blue hover:bg-sedimark-light-blue text-white'
        : 'bg-white hover:bg-gray-200 text-black'
    }`}
        >
          <div className='flex flex-col items-center text-center'>
            <HiUpload
              size={20}
              color={providerBy === false ? 'white' : 'black'}
            />
            Provided
          </div>
        </Button>
      </Link>
      {/* ---- Client side implementation ---- */}
      {/* <Button
        className={`w-48 h-20 items-center shadow-lg rounded-r-none focus:ring-0 ${
          providerBy === true
        ? 'bg-sedimark-deep-blue hover:bg-sedimark-light-blue text-white'
        : 'bg-white hover:bg-gray-200 text-black'
    }`}
        onClick={() => onPageChange(true)}
      >

        <div className='flex flex-col items-center text-center'>
          <HiDownload
            size={20}
            color={providerBy === true ? 'white' : 'black'}
          />
          Consumed
        </div>
      </Button>
      <Button
        className={`w-48 h-20 items-center shadow-lg rounded-l-none focus:ring-0 ${
          providerBy === false
        ? 'bg-sedimark-deep-blue hover:bg-sedimark-light-blue text-white'
        : 'bg-white hover:bg-gray-200 text-black'
    }`}
        onClick={() => onPageChange(false)}
      >
        <div className='flex flex-col items-center text-center'>
          <HiUpload
            size={20}
            color={providerBy === false ? 'white' : 'black'}
          />
          Provided
        </div>
      </Button> */}
    </div>
  )
}

export default ButtonGroup
