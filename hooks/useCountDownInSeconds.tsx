import { useEffect, useRef, useState } from 'react'

const useCountDownInSeconds = (countDownSeconds: number) => {
  const [countDown, setCountDown] = useState<number>(countDownSeconds)
  const [isCountDownOn, setIsCountDownOn] = useState<boolean>(false)
  var interval = useRef<any>()

  useEffect(() => {
    if (isCountDownOn) {
      interval.current = setInterval(() => {
        if (countDown - 1 >= 0) {
          const tempCountDown = countDown
          setCountDown(tempCountDown - 1)
        } else {
          setIsCountDownOn(false)
        }
      }, 1000)
    }
    return () => clearInterval(interval.current)
  }, [countDownSeconds, isCountDownOn, countDown])

  const startCountdown = () => {
    setIsCountDownOn(true)
  }

  const reset = () => {
    setIsCountDownOn(false)
    setCountDown(countDownSeconds)
    // clearInterval(interval.current)
  }

  return { countDown, isCountDownOn, startCountdown, reset }
  // return { countDown }
}

export default useCountDownInSeconds
