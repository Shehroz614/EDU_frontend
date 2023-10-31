import React, { ReactNode } from 'react'
import { StringDecoder } from 'string_decoder'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: StringDecoder
}

const PlusIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.15137 8.07617H16.2896V9.88086H9.15137V17.6475H7.20166V9.88086H0.208496V8.07617H7.20166V0.567383H9.15137V8.07617Z"
        fill="#1A1E3D"
      />
    </svg>
  )
}

export default PlusIcon
