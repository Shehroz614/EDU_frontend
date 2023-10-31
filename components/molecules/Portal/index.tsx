import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  selector: string
  children: JSX.Element | JSX.Element[]
}

const Portal: React.FunctionComponent<Props> = (props) => {
  const { selector, children } = props
  const [element, updateElement] = useState<Element | null>(null)
  useEffect(() => {
    updateElement(document.querySelector(selector))
  }, [element, selector])
  return element ? ReactDOM.createPortal(children, element) : null
}
export default Portal
