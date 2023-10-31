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
      viewBox="0 0 7 7"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Teacher-_add_step1"
          transform="translate(-669.000000, -425.000000)"
        >
          <rect
            id="Rectangle-Copy-20"
            stroke="#979797"
            opacity="0.248418899"
            x="182.5"
            y="396.5"
            width="526"
            height="60"
            rx="30"
          ></rect>
          <polygon
            id="Triangle"
            fill="#1A1E3D"
            transform="translate(672.500000, 428.500000) rotate(-180.000000) translate(-672.500000, -428.500000) "
            points="672.5 425 676 432 669 432"
          ></polygon>
        </g>
      </g>
    </svg>
  )
}

export default ButtonArrow
