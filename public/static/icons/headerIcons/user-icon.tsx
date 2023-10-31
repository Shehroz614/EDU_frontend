import React from 'react'
type Props = {
  width?: string
  height?: string
}

const UserIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props

  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 17 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <rect id="path-1" x="0" y="0" width="45" height="45" rx="22.5"></rect>
        <filter
          x="-33.3%"
          y="-33.3%"
          width="166.7%"
          height="166.7%"
          filterUnits="objectBoundingBox"
          id="filter-2"
        >
          <feOffset
            dx="0"
            dy="0"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            stdDeviation="5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0352928322 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
      </defs>
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="category" transform="translate(-1705.000000, -37.000000)">
          <g id="Group-16" transform="translate(1690.000000, 25.000000)">
            <path
              d="M23.0000568,22 C25.2090713,22 27,19.761446 27,17.0000292 C27,14.238554 26.4120118,12 23.0000568,12 C19.5881017,12 19,14.238554 19,17.0000292 C19,19.761446 20.7909287,22 23.0000568,22 Z"
              id="Path"
              fill="#ccc"
              fillRule="nonzero"
              opacity="1"
            ></path>
            <path
              d="M30.9910435,29.0043539 C30.9125992,24.224254 30.2661698,22.8621851 25.3194879,22 C25.3194879,22 24.6231666,22.8569024 23.0001803,22.8569024 C21.377194,22.8569024 20.6807526,22 20.6807526,22 C15.78805,22.8527807 15.1023082,24.1946476 15.0121423,28.8490654 C15.0047487,29.2291304 15.0013224,29.2491002 15,29.2049808 C15.0003006,29.2876466 15.0006612,29.440555 15.0006612,29.7071868 C15.0006612,29.7071868 16.1783482,32 23.0001803,32 C29.8218923,32 30.9996994,29.7071868 30.9996994,29.7071868 C30.9996994,29.535876 30.9998197,29.4167537 31,29.3357135 C30.9986776,29.3629978 30.9960327,29.3101126 30.9910435,29.0043539 Z"
              id="Path"
              fill="#ccc"
              fillRule="nonzero"
              opacity="1"
            ></path>
          </g>
          <g
            id="man-user"
            opacity="0.124232701"
            transform="translate(1705.000000, 37.000000)"
            fill="#ccc"
            fillRule="nonzero"
          >
            <path
              d="M1.00069282,17.05 C0.99949282,16.8554143 0.99829282,16.9951757 1.00069282,17.05 L1.00069282,17.05 Z"
              id="Path"
            ></path>
            <path
              d="M15.9989918,17.0995025 C16.0027918,17.0395251 16.0002918,16.6833859 15.9989918,17.0995025 L15.9989918,17.0995025 Z"
              id="Path"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default UserIcon
