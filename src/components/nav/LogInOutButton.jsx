import { Avatar, Button, Tooltip } from 'flowbite-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRegistration } from '@/context/RegistrationContext'

/**
 * Component that will return logIn or logOut buttons depending on the user session.
 * @returns {JSX} JSX depending on the user session.
 */
export default function LogInOutButton () {
  const [identity, setIdentity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { registrationComplete, registeredIdentity } = useRegistration()

  useEffect(() => {
    async function fetchIdentity () {
      if (registrationComplete && registeredIdentity) {
        setIdentity(registeredIdentity)
        setError(null)
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/identity')
        const idResp = await response.json()

        console.dir(idResp)

        if (response.status === 404 || idResp?.error?.code === 'HTTP_404') {
          // Expected error when no identity is found, user can register
          console.log('No VC found: user registration required')
          setIdentity(null)
          setError(null)
        } else if (idResp?.error) {
          // Unexpected errors
          setError(idResp.error)
          console.error('Error fetching identity:', idResp.error)
        } else {
          setIdentity(idResp)
          setError(null)
        }
      } catch (error) {
        console.error('Error calling identity API:', error)
        setError({ message: error.message || 'Failed to connect to server' })
      } finally {
        setLoading(false)
      }
    }

    fetchIdentity()
  }, [registrationComplete, registeredIdentity])

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
        {error
          ? (
            <Tooltip content={`Error fetching identity: ${error.message}`}>
              <Button color='gray' disabled>
                Register
              </Button>
            </Tooltip>
            )
          : (
            <Button color='gray'>
              Register
            </Button>
            )}
      </Link>
    </div>
  )
}
