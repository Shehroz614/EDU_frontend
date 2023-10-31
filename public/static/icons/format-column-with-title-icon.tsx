import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const FormatColumsWithTitleIcon: React.FunctionComponent<Props> = (props) => {
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
        d="M1.41667 0H15.5833C16.3646 0 17 0.635375 17 1.41667V15.5833C17 16.3646 16.3646 17 15.5833 17H1.41667C0.635375 17 0 16.3646 0 15.5833V1.41667C0 0.635375 0.635375 0 1.41667 0ZM15.5833 1.41667H1.41667H1.4156V2.83333H15.5833V1.41667ZM1.41596 4.25H7.79167V15.5833H1.41667L1.41596 4.25ZM9.20833 4.25V15.5833H15.5833V4.25H9.20833Z"
        fill="black"
      />
    </svg>
  )
}

export default FormatColumsWithTitleIcon
