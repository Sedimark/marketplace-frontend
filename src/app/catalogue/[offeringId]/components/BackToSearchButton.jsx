'use client'
import { Button } from 'flowbite-react'
import { HiArrowLeft } from 'react-icons/hi'

export default function BackToSearchButton () {
  const goBack = () => {
    if (document.referrer.includes('/catalogue?')) {
      window.history.back()
    } else {
      window.location.href = '/catalogue'
    }
  }
  return (
    <Button
      className='max-w-fit m-2 ml-10 bg-sedimark-light-gray enabled:hover:bg-sedimark-medium-gray text-sedimark-dark-gray'
      onClick={goBack}
    >
      <span className='flex items-center'>
        <HiArrowLeft className='mr-2' />
        Back to search
      </span>
    </Button>
  )
}
