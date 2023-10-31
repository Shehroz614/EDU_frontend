import { useRef, useEffect } from 'react'

//NOTE:
//key values can be found here:
//https://developer.mozilla.org/ru/docs/Web/API/KeyboardEvent/key/Key_Values
//code values can be found here:
//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values

const useKeyPress = (key: string, code: string, cb: Function) => {
  const callbackRef = useRef(cb)

  useEffect(() => {
    callbackRef.current = cb
  }, [cb])

  useEffect(() => {
    const handlePress = (event: KeyboardEvent) => {
      if (event.key === key || event.code === code) {
        callbackRef.current()
      }
    }

    document.addEventListener('keydown', handlePress)
    return () => {
      document.removeEventListener('keydown', handlePress)
    }
  }, [key, code])
}

export default useKeyPress
