'use client'
import { Modal } from 'flowbite-react'

const Home = ({ title, children, onContracting, isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false)
  }
  const handleContracting = () => {
    setIsOpen(false)
    onContracting()
  }

  return (
    <Modal show={isOpen} onClose={handleClose}>
      <Modal.Header>
        <h1>{title}</h1>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleContracting}
          className={
                        'relative inline-flex ring-1 ring-inset items-center ' +
                        'rounded-l-md px-2 py-2 focus:z-20 focus:outline-offset-0 text-white bg-indigo-600 ' +
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
                        'focus-visible:outline-indigo-400 hover:bg-indigo-400'
                    }
        >
          Contract
        </button>
        <button
          onClick={handleClose}
          className={
                        'relative inline-flex ring-1 ring-inset items-center ' +
                        'rounded-r-md px-2 py-2 focus:z-20 focus:outline-offset-0 text-white bg-red-600 ' +
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
                        'focus-visible:outline-red-400 hover:bg-red-400'
                    }
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default Home
