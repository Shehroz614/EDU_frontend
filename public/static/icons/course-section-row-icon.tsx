import { colors } from '@configs/styles/config'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
  fillColor?: string
}

const CourseSectionRowIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, fillColor } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 28 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="course-page" transform="translate(-227.000000, -2032.000000)">
          <circle
            id="Oval-Copy-3"
            fill={fillColor ? fillColor : colors.uguBlue}
            cx="241"
            cy="2046"
            r="14"
          ></circle>
          <polyline
            id="Path-5-Copy"
            stroke="#FFFFFF"
            transform="translate(241.000000, 2046.000000) rotate(-90.000000) translate(-241.000000, -2046.000000) "
            points="236 2044 240.891009 2048 246 2044"
          ></polyline>
        </g>
      </g>
    </svg>
  )
}

export default CourseSectionRowIcon
