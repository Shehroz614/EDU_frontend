import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const EnglishIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 24 24"
    >
      <rect x="0" y="0" width={'100%'} height="12" fill="#0057b7" />
      <rect x="0" y="12" width={'100%'} height="20" fill="#ffd700" />
    </svg>
  )
}

export default EnglishIcon
