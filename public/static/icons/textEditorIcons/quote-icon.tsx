import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const QuoteIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 96 81"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="quote" fill="#1A1E3D" fillRule="nonzero">
          <path
            d="M0.0639534884,40.5 L0.0639534884,81 L41.0639535,81 L41.0639535,40.5 L13.7306981,40.5 C13.7306981,25.6125351 25.9926927,13.500077 41.0639535,13.500077 L41.0639535,0 C18.4551924,0 0.0639534884,18.1669555 0.0639534884,40.5 Z"
            id="Path"
          ></path>
          <path
            d="M95.0639535,13.500077 L95.0639535,0 C72.4551924,0 54.0639535,18.1669555 54.0639535,40.5 L54.0639535,81 L95.0639535,81 L95.0639535,40.5 L67.7306981,40.5 C67.7306981,25.6125351 79.9926927,13.500077 95.0639535,13.500077 Z"
            id="Path"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default QuoteIcon
