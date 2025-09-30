'use client'
import { useEffect, useState } from 'react'
import { Card, Spinner, Toast } from 'flowbite-react'
import { HiShoppingCart, HiCheckCircle, HiXCircle } from 'react-icons/hi'

function NegotiateCard ({ offering, provider }) {
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (provider.error) {
      console.error(provider.error)
      setToast({
        type: 'error',
        message: `Cannot negotiate offering: ${provider.error}`
      })
    }
  }, [provider.error])

  const handleNegotiation = async () => {
    setIsLoading(true)
    setToast(null)

    try {
      const response = await fetch('/api/connector/contractNegotiation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetID: offering.asset.value,
          counterPartyAddress: provider.connector_url,
          alternateName: provider.alternate_name
        })
      })

      const data = await response.json()

      if (response.ok) {
        setToast({
          type: 'success',
          message: 'The contract offer was successfully negotiated. See your contracts on the Dashboard.'
        })
      } else {
        throw new Error(data?.error || 'Unknown error occurred.')
      }
    } catch (error) {
      setToast({
        type: 'error',
        message: `Couldn't negotiate offering: ${error.message || 'Failed to negotiate contract.'}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className='flex max-w-sm min-w-fit max-h-72 min-h-fit pt-2 sticky top-28'>
        <div className='flex flex-col items-center'>
          {toast && (
            <div className='mb-4 z-50'>
              <Toast
                className={`${
              toast.type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}
              >
                <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg'>
                  {toast.type === 'success'
                    ? <HiCheckCircle className='h-6 w-6 text-green-700' />
                    : <HiXCircle className='h-6 w-6 text-red-700' />}
                </div>
                <div className='ml-3 text-sm font-normal'>{toast.message}</div>
              </Toast>
            </div>
          )}
          <button
            type='button'
            className='inline-flex w-full justify-center rounded-lg bg-sedimark-deep-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 disabled:opacity-50'
            onClick={handleNegotiation}
            disabled={isLoading || !!provider.error}
          >
            {isLoading
              ? <Spinner aria-label='Negotiating...' size='sm' light className='mr-2' />
              : <HiShoppingCart size={18} className='mr-1' />}
            {isLoading ? 'Negotiating...' : 'Negotiate'}
          </button>
        </div>
      </Card>

    </>
  )
}

export default NegotiateCard
