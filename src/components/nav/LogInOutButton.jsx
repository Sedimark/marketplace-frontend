import { Button } from 'flowbite-react'
import Link from 'next/link'
import { useSDK } from '@metamask/sdk-react'

/**
 * Component that will return logIn or logOut buttons depending on the user session.
 * @returns {JSX} JSX depending on the user session.
 */
export default function LogInButton () {
  const { sdk, connecting, account } = useSDK()
  const connect = async () => {
    try {
      await sdk?.connect()
    } catch (err) {
      console.warn('No accounts found', err)
    }
  }
  const disconnect = () => {
    if (sdk) {
      sdk.terminate()
    }
  }

  return (
    <div className='flex gap-4 w-25 h-25'>
      <Link href='/onboarding'>
        <Button color='gray' className=''>
          Register
        </Button>
      </Link>
      {account // Used account because the useSDK hook 'connected' wasn't working correctly...
        ? (
          <Button color='failure' onClick={disconnect}>Disconnect Wallet</Button>)
        : (
          <Button disabled={connecting} onClick={connect} className='flex flex-wrap gap-2'>
            <svg className='text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z' clipRule='evenodd' />
              <path fillRule='evenodd' d='M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z' clipRule='evenodd' />
            </svg>
            Connect Wallet
          </Button>
          )}
    </div>
  )
}
