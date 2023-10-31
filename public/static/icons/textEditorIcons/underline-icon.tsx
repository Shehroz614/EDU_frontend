import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const ButtonArrow: React.FunctionComponent<Props> = (props) => {
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
        <g id="underline" fill="#1A1E3D" fillRule="nonzero">
          <polygon
            id="Path"
            points="0 114 98 114 98 130 1.98484676e-15 130"
          ></polygon>
          <path
            d="M65.3335196,0 L65.3335196,16.3077996 L73.5001397,16.3077996 L73.5001397,65.2309194 C73.5001397,78.7198356 62.5101904,89.6924793 49,89.6924793 C35.4898096,89.6924793 24.4998603,78.7198356 24.4998603,65.2309194 L24.4998603,16.3077996 L32.6664804,16.3077996 L32.6664804,0 L0,0 L0,16.3077996 L8.16662011,16.3077996 L8.16662011,65.2309194 C8.16662011,87.7097503 26.4857164,106 49,106 C71.5142836,106 89.8333799,87.7097503 89.8333799,65.2309194 L89.8333799,16.3077996 L98,16.3077996 L98,0 L65.3335196,0 Z"
            id="Path"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default ButtonArrow
