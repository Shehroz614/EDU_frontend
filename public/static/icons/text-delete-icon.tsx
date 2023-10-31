import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const TextDeleteIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.48022 2.75C1.48022 3.1295 1.17222 3.4375 0.792725 3.4375C0.413225 3.4375 0.105225 3.1295 0.105225 2.75V0.6875C0.105225 0.308 0.413225 0 0.792725 0H10.4177C10.7972 0 11.1052 0.308 11.1052 0.6875V2.75C11.1052 3.1295 10.7972 3.4375 10.4177 3.4375C10.0382 3.4375 9.73022 3.1295 9.73022 2.75V1.375H7.66772V9.625H8.69897C9.07847 9.625 9.38647 9.933 9.38647 10.3125C9.38647 10.692 9.07847 11 8.69897 11H2.51147C2.13197 11 1.82397 10.692 1.82397 10.3125C1.82397 9.933 2.13197 9.625 2.51147 9.625H3.54272V1.375H1.48022V2.75ZM4.91772 9.625H6.29272V1.375H4.91772V9.625Z"
        fill="black"
      />
    </svg>
  )
}

export default TextDeleteIcon
