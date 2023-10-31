import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const VideoContentTypeIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="course-page" transform="translate(-271.000000, -1869.000000)">
          <g
            id="Group-4"
            transform="translate(660.000000, 1882.500000) rotate(-270.000000) translate(-660.000000, -1882.500000) translate(584.000000, 1441.000000)"
          ></g>
          <g id="Group-6" transform="translate(271.000000, 1869.000000)">
            <rect
              id="Rectangle"
              fill="#1A1E3D"
              x="0"
              y="0"
              width="24"
              height="24"
              rx="8"
            ></rect>
            <polygon
              id="Triangle"
              fill="#FFFFFF"
              transform="translate(12.500000, 12.500000) rotate(-270.000000) translate(-12.500000, -12.500000) "
              points="12.5 10 15 15 10 15"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default VideoContentTypeIcon
