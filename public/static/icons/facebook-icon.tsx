import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const LinkIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : '100%'}
      height={height ? height : '100%'}
    >
      <path
        d="M16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0Z"
        fill="#039BE5"
      />
      <path
        d="M17.9333 19.9776H22.2758L22.9576 15.6771H17.9324V13.3267C17.9324 11.5403 18.5312 9.95609 20.2454 9.95609H23V6.20319C22.516 6.13947 21.4924 6 19.5583 6C15.5196 6 13.1518 8.07921 13.1518 12.8162V15.6771H9V19.9776H13.1518V31.7977C13.974 31.9182 14.8068 32 15.6617 32C16.4345 32 17.1887 31.9311 17.9333 31.833V19.9776Z"
        fill="white"
      />
    </svg>
  )
}

export default LinkIcon
