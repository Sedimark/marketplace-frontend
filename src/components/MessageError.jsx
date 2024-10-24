import { Alert } from 'flowbite-react'

const MessageError = ({ message }) => {
  return (
    <>
      <Alert color='failure'>
        <span className='font-medium text-md'>{message}</span>
      </Alert>
    </>
  )
}

export default MessageError
