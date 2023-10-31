import React, { useRef } from 'react'

// TODO - USE TYPE SAFETY
const useDelayedCallback = (delay = 100) => {
  const ref = useRef<any>()
  React.useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [])

  const clearTimer = () => {
    if (ref.current) clearTimeout(ref.current)
  }
  return (callback: any, clear: boolean) => {
    //clear previously set timout
    if (ref.current) clearTimeout(ref.current)
    //check if clear option is true
    if (clear) {
      clearTimer()
    } else {
      //set timout with specified delay
      ref.current = setTimeout(callback, delay)
    }
  }
}

export default useDelayedCallback
