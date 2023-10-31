import { colors } from '@configs/styles/config'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
  fill?: boolean
  padding?: string
}

const StarIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color, fill = false } = props
  return (
    // <svg
    //   width={width ? width : '100%'}
    //   height={height ? height : '100%'}
    //   viewBox="0 0 21 20"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     fillRule="evenodd"
    //     clipRule="evenodd"
    //     d="M10.6247 16.1733L5.775 18.6083C5.03877 18.978 4.19642 18.3487 4.34204 17.5379L5.2561 12.4482L1.42709 8.88362C0.810455 8.30957 1.13653 7.27698 1.97101 7.16118L7.30674 6.42071L9.73635 1.71914C10.1091 0.997922 11.1404 0.997921 11.5131 1.71913L13.9427 6.42071L19.2785 7.16118C20.113 7.27698 20.439 8.30958 19.8224 8.88362L15.9934 12.4482L16.9074 17.5379C17.0531 18.3487 16.2107 18.978 15.4745 18.6083L10.6247 16.1733Z"
    //     stroke={color ? color : colors.uguYellow}
    //     fill={fill ? (color ? color : colors.uguYellow) : ''}
    //   />
    // </svg>

    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 16.3906L5.53394 19.0014C4.80032 19.3871 3.94288 18.7642 4.08299 17.9473L5.03142 12.4175L1.0138 8.50126C0.420283 7.92272 0.747792 6.91475 1.56801 6.79556L7.12023 5.98878L9.60326 0.957612C9.97008 0.214366 11.0299 0.214365 11.3967 0.95761L13.8798 5.98878L19.432 6.79556C20.2522 6.91475 20.5797 7.92272 19.9862 8.50126L15.9686 12.4175L16.917 17.9473C17.0571 18.7642 16.1997 19.3871 15.4661 19.0014L10.5 16.3906Z"
        stroke={color ? color : colors.uguYellow}
        fill={fill ? (color ? color : colors.uguYellow) : ''}
      />
    </svg>
  )
}

export default StarIcon
