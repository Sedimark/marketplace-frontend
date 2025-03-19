import { Avatar, Button } from 'flowbite-react'
import Link from 'next/link'
import { getIdentity } from '@/utils/dlt'
import { useState, useEffect } from 'react'

/**
 * Component that will return logIn or logOut buttons depending on the user session.
 * @returns {JSX} JSX depending on the user session.
 */
export default function LogInButton () {
  const [identity, setIdentity] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchIdentity() {
      try {
        const result = await getIdentity()
        setIdentity(result)
      } catch (error) {
        console.error("Error fetching identity:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchIdentity()
  }, [])
  
  if (loading) {
    return (
      <div className='flex gap-4 w-25 h-25'>
        <span>Loading...</span>
      </div>
    )
  }
  
  if (identity?.data) {
    return (
      <div className='flex gap-4 w-25 h-25 items-center'>
	<Avatar size='md' rounded />
        <p>{identity.data.vc.credentialSubject['schema:alternateName']}</p>
      </div>
    )
  }
  
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
