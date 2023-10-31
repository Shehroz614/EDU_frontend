import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
}

const CodeIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 207 130"
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
        <g id="source" fill="#1A1E3D" fillRule="nonzero">
          <polygon
            id="Path"
            points="64.7016239 0 0 65.0002223 64.7016239 130 83 111.617302 36.5971949 65.0002223 83 18.3826975"
          ></polygon>
          <polygon
            id="Path"
            points="142.298376 0 124 18.3827604 170.402805 65.0004447 124 111.61724 142.298376 130 207 65"
          ></polygon>
        </g>
      </g>
    </svg>
  )
}

export default CodeIcon
