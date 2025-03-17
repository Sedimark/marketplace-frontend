import { Button } from 'flowbite-react'
import Link from 'next/link'

/**
 * Component that will return logIn or logOut buttons depending on the user session.
 * @returns {JSX} JSX depending on the user session.
 */
export default function LogInButton () {
  return (
    <div className='flex gap-4 w-25 h-25'>
      <Link href='/onboarding'>
        <Button color='gray' className=''>
          Register
        </Button>
      </Link>
    </div>
  )
}
