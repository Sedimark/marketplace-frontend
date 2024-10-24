import { Progress } from 'flowbite-react'
import { useEffect, useState } from 'react'

const LoadingSpinner = ({ color = 'blue-gray-50', align = 'flex-start' }) => {
  const [count, setCount] = useState(0)
  const [increasing, setIncreasing] = useState(true)
  const n = 10

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (increasing) {
        if (count < 100) {
          setCount(count + 1)
        } else {
          setIncreasing(false)
        }
      } else {
        if (count > 0) {
          setCount(count - n)
        } else {
          setIncreasing(true)
        }
      }
    }, 10)
    return () => clearInterval(intervalId)
  }, [count, increasing])

  return <Progress value={count} color='indigo' />
}

export default LoadingSpinner
