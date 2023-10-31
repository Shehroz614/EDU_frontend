import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const DashedLineIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props

  return (
    <svg width={width ? width : ''} height={height ? height : '1px'}>
      <g
        id="Teacher-_add_step4"
        transform="translate(-245.000000, -564.000000)"
      >
        <line
          x1="245.5"
          y1="565"
          x2="1676.5"
          y2="565"
          id="Line"
          stroke="#979797"
          stroke-linecap="square"
          stroke-dasharray="5"
        ></line>
      </g>
    </svg>
  )
}

export default DashedLineIcon
