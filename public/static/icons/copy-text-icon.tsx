import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const CopyTextIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 3.54167V13.4583C15 13.8493 14.68 14.1667 14.2857 14.1667H11.4286V16.2917C11.4286 16.6827 11.1086 17 10.7143 17H0.714286C0.32 17 0 16.6827 0 16.2917V3.54167C0 3.15067 0.32 2.83333 0.714286 2.83333H3.57143V0.708333C3.57143 0.317333 3.89143 0 4.28571 0H11.4286C11.6179 0 11.7996 0.0747292 11.9336 0.207542L14.7907 3.04087C14.9246 3.17369 15 3.35396 15 3.54167ZM11.4286 3.54167H13.2754L11.4286 1.70992V3.54167ZM10 15.5833H1.42857V4.25H3.57143V13.4583C3.57143 13.8493 3.89143 14.1667 4.28571 14.1667H10V15.5833ZM5 1.41667V12.75H13.5714V4.95833H10.7143C10.32 4.95833 10 4.641 10 4.25V1.41667H5Z"
        fill="black"
      />
    </svg>
  )
}

export default CopyTextIcon
