'use client'
import { Button } from 'flowbite-react'
import { HiArrowLeft } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

export default function BackToSearchButton () {
  const { back } = useRouter()

  return (
    <Button
      className='max-w-fit m-2 ml-10 bg-sedimark-light-gray enabled:hover:bg-sedimark-medium-gray text-sedimark-dark-gray'
      onClick={() => back()}
    >
      <span className='flex items-center'>
        <HiArrowLeft className='mr-2' />
        Back
      </span>
    </Button>
  )
}
