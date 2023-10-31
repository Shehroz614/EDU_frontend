import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const ItalicIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 98 130"
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
        <g id="italic" fill="#1A1E3D" fillRule="nonzero">
          <polygon
            id="Path"
            points="98 16.2501042 98 0 48.9998603 0 48.9998603 16.2501042 61.1158105 16.2501042 19.1160101 113.749896 0 113.749896 0 130 49.0001397 130 49.0001397 113.749896 36.8841895 113.749896 78.8837106 16.2501042"
          ></polygon>
        </g>
      </g>
    </svg>
  )
}

export default ItalicIcon
