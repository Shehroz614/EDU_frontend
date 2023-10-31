import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const WidthTextIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 10 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.714286 17H7.14286C8.71821 17 10 15.7289 10 14.1667V10.2708C10 9.42544 9.62464 8.6654 9.03071 8.14583C9.62464 7.62627 10 6.86623 10 6.02083V2.83333C10 1.2711 8.71821 0 7.14286 0H0.714286C0.32 0 0 0.317333 0 0.708333V16.2917C0 16.6827 0.32 17 0.714286 17ZM2.14286 9.20833H7.14286C7.25107 9.20833 7.3525 9.23419 7.44429 9.27704C7.69893 9.53275 7.85714 9.88373 7.85714 10.2708V13.4583C7.85714 14.2396 7.21643 14.875 6.42857 14.875H2.14286V9.20833ZM7.85714 6.02083V3.54167C7.85714 2.76038 7.21643 2.125 6.42857 2.125H2.14286V7.08333H7.14286C7.25107 7.08333 7.3525 7.05748 7.44429 7.01463C7.69893 6.75892 7.85714 6.40794 7.85714 6.02083Z"
        fill="black"
      />
    </svg>
  )
}

export default WidthTextIcon
