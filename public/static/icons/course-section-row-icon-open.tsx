import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
  fillColor?: string
}

const CourseSectionRowOpenIcon: React.FunctionComponent<Props> = (props) => {
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
      <defs>
        <rect id="path-1" x="0" y="0" width="1920" height="380"></rect>
        <filter
          x="-3.9%"
          y="-7.9%"
          width="107.7%"
          height="115.7%"
          filterUnits="objectBoundingBox"
          id="filter-3"
        >
          <feGaussianBlur stdDeviation="19" in="SourceGraphic"></feGaussianBlur>
        </filter>
      </defs>
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="course_stady" transform="translate(-1242.000000, -300.000000)">
          <g id="Group-5" transform="translate(1.000000, 93.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
            {/* <use id="Rectangle" fill="#F8F8F8" xlinkHref="#path-1"></use> */}
          </g>
          <circle
            id="Oval"
            fill={fillColor ? fillColor : '#E9B839'}
            transform="translate(1256.000000, 314.000000) rotate(-270.000000) translate(-1256.000000, -314.000000) "
            cx="1256"
            cy="314"
            r="14"
          ></circle>
          <polyline
            id="Path-5"
            stroke="#FFFFFF"
            transform="translate(1256.000000, 314.000000) rotate(-360.000000) translate(-1256.000000, -314.000000) "
            points="1251 312 1255.89101 316 1261 312"
          ></polyline>
        </g>
      </g>
    </svg>
  )
}

export default CourseSectionRowOpenIcon
