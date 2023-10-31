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
        d="M32 27.5556C32 30.0107 30.0107 32 27.5556 32H4.44444C1.99022 32 0 30.0107 0 27.5556V4.44444C0 1.98933 1.99022 0 4.44444 0H27.5556C30.0107 0 32 1.98933 32 4.44444V27.5556Z"
        fill="#0078D4"
      />
      <path
        d="M5.20947 11.2865H9.55056V26.0462H5.20947V11.2865ZM7.36699 9.55007H7.34268C6.0473 9.55007 5.20947 8.58461 5.20947 7.37866C5.20947 6.14666 6.07335 5.20898 7.39217 5.20898C8.71273 5.20898 9.52625 6.14666 9.55056 7.37866C9.55056 8.58374 8.71273 9.55007 7.36699 9.55007ZM26.0467 26.0462H21.7056V18.1463C21.7056 16.2379 20.642 14.9356 18.9342 14.9356C17.6311 14.9356 16.9261 15.8143 16.584 16.6634C16.459 16.9672 16.4963 17.8077 16.4963 18.2322V26.0462H12.1552V11.2865H16.4963V13.5578C17.1223 12.5888 18.1025 11.2865 20.6099 11.2865C23.7164 11.2865 26.0458 13.24 26.0458 17.6019L26.0467 26.0462Z"
        fill="white"
      />
    </svg>
  )
}

export default LinkIcon
