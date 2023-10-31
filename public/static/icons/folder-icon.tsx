import React, { ReactNode } from 'react'
type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
}

const FolderIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 48 48"
    >
      <path d="M43,9H23a2,2,0,0,1,0-4H43A2,2,0,0,1,43,9Z" fill="#2979ff" />
      <path
        d="M20,12L18,7.42A4,4,0,0,0,14.36,5H2A2,2,0,0,0,0,7V43a4,4,0,0,0,4,4H44a4,4,0,0,0,4-4V16a4,4,0,0,0-4-4H20Z"
        fill="#2979ff"
      />
    </svg>
  )
}

export default FolderIcon
