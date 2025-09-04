'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { HiTrash } from 'react-icons/hi'

export default function OfferingActions ({ offeringUrl }) {
  const [openModal, setOpenModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  // This is the only way to handle the situation of this component, as its the only client component, that is being called on a server one while being
  // nested on the accordion. Without this, the Modal from flow-bite wouldn't render correctly!
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only reload in case that the call goes correctly
  const handleDelete = async () => {
    try {
      setDeleteError(null)
      const response = await fetch('/api/offeringManager', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ offeringId: offeringUrl })
      })
      const result = await response.json()

      if (response.ok && !result.error) {
        setOpenModal(false)
        window.location.reload()
      } else {
        setDeleteError(result?.error || 'Failed to delete the offering.')
      }
    } catch (error) {
      console.error('Unexpected error on delete:', error)
      setDeleteError('An unexpected error occurred. Please try again.')
    }
  }

  if (!mounted) {
    return (
      <button
        onClick={() => setOpenModal(true)}
        className='bg-red-600 hover:bg-red-700 text-white rounded p-2 transition duration-150 ease-in-out'
        title='Delete offering'
      >
        <HiTrash size={20} />
      </button>
    )
  }

  const modal = (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' onClick={() => setOpenModal(false)}>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4' onClick={e => e.stopPropagation()}>
        <div className='text-center'>
          <HiTrash className='mx-auto mb-4 h-12 w-12 text-red-600' />
          <h3 className='mb-5 text-lg font-normal text-gray-700'>
            Are you sure you want to delete the offering (ID: <strong>{offeringUrl}</strong>)?
            <br />
            This step is <span className='text-red-600 font-semibold'>irreversible!</span>
          </h3>
          {deleteError && (
            <p className='text-red-600 font-medium mb-4'>{deleteError}</p>
          )}
          <div className='flex justify-center gap-4 mt-6'>
            <button
              className='bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2'
              onClick={handleDelete}
            >
              Yes, delete
            </button>
            <button
              className='bg-gray-300 hover:bg-gray-400 rounded px-4 py-2'
              onClick={() => {
                setOpenModal(false)
                setDeleteError(null)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className='bg-red-600 hover:bg-red-700 text-white rounded p-2 transition duration-150 ease-in-out'
        title='Delete offering'
      >
        <HiTrash size={20} />
      </button>
      {/* ONLY WAY TO DO THIS, as the parent component is server side, the built in 'popup' class that should do everything does nothing */}
      {openModal && createPortal(modal, document.body)}
    </>
  )
}
