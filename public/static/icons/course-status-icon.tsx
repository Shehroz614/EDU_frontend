import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const ProgressIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 19 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="my_cours" transform="translate(-840.000000, -395.000000)">
          <rect
            id="Rectangle-Copy-36"
            stroke="#979797"
            opacity="0.156436012"
            x="821.5"
            y="376.5"
            width="275"
            height="59"
            rx="6"
          ></rect>
          <g id="Group-7" transform="translate(840.000000, 395.000000)">
            <rect
              id="Rectangle"
              stroke="#1A1E3D"
              strokeWidth="2"
              x="1"
              y="1"
              width="17"
              height="17"
              rx="3"
            ></rect>
            <rect
              id="Rectangle"
              fill="#1A1E3D"
              x="4"
              y="4"
              width="11"
              height="11"
              rx="1"
            ></rect>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default ProgressIcon
