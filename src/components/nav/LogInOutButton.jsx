import { Avatar, Button, Tooltip } from 'flowbite-react'
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
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function fetchIdentity() {
      const idResp = await getIdentity()
      console.dir(idResp)
      if (idResp?.error?.code == 'HTTP_404') {
        // Expected error when no identity is found, user can register
        console.log("No VC found: user registration required")
        setIdentity(null)
        setError(null)
      } else if (idResp?.error) {
        // Unexpected errors
        setError(idResp.error)
        console.error("Error fetching identity:", error)
      } else {
        setIdentity(idResp)
        setError(null)
      }
      setLoading(false)
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
        {error ? (
          <Tooltip content={`Error fetching identity: ${error.message}`}>
            <Button color='gray' disabled>
              Register
            </Button>
          </Tooltip>
        ) : (
          <Button color='gray'>
            Register
          </Button>
        )}
      </Link>
    </div>
  )
}
