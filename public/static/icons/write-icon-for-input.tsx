import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
}

const WriteIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6237 1.84787L14.9498 0.415245C14.3029 -0.138415 13.2525 -0.138415 12.6034 0.415245L11 1.78756L14.7534 5L16.6237 3.39927C17.1254 2.96982 17.1254 2.27729 16.6237 1.84787ZM10.6012 3L14 6.39818L5.39682 15L2 11.6018L10.6012 3ZM0.447711 16.9896C0.186588 17.0522 -0.0491433 16.8217 0.00887095 16.5644L0.813989 13L4 16.141L0.447711 16.9896Z"
        fill="#1A1E3D"
      />
    </svg>
  )
}

export default WriteIcon
