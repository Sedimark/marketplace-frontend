'use client'

import { createContext, useContext, useState } from 'react'

const RegistrationContext = createContext()

export const RegistrationProvider = ({ children }) => {
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [registeredIdentity, setRegisteredIdentity] = useState(null)

  const completeRegistration = (identity) => {
    setRegisteredIdentity(identity)
    setRegistrationComplete(true)
  }

  return (
    <RegistrationContext.Provider
      value={{
        registrationComplete,
        registeredIdentity,
        completeRegistration
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

export const useRegistration = () => useContext(RegistrationContext)
