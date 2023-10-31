import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const VideoPlayIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" rx="15" fill="#1A1E3D" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.2111 31.1056C36.9482 31.4741 36.9482 32.5259 36.2111 32.8944L27.4472 37.2764C26.7823 37.6088 26 37.1253 26 36.382V27.618C26 26.8747 26.7823 26.3912 27.4472 26.7236L36.2111 31.1056Z"
        fill="white"
      />
    </svg>
  )
}

{
  /*<svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6334 6.31672C16.8446 7.42229 16.8446 10.5777 14.6334 11.6833L4.34165 16.8292C2.34694 17.8265 0 16.376 0 14.1459L0 3.8541C0 1.62396 2.34694 0.173469 4.34164 1.17082L14.6334 6.31672Z"
        fill="#1A1E3D"
      />
  </svg>*/
}

export default VideoPlayIcon
