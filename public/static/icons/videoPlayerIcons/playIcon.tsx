import React from 'react'

type PlayIconProps = {
  color?: string
  width?: string
  height?: string
}

const PlayIcon: React.FunctionComponent<PlayIconProps> = (props) => {
  const { width, height, color } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 320 368"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="play-svgrepo-com"
          fill={color ? color : '#D8D8D8'}
          fillRule="nonzero"
        >
          <path
            d="M36.96,368.00177 C30.8202122,367.990381 24.789133,366.380945 19.46,363.33177 C7.46,356.53177 2.84217094e-14,343.33177 2.84217094e-14,329.00177 L2.84217094e-14,39.0017705 C2.84217094e-14,24.6317705 7.46,11.4717705 19.46,4.67177046 C30.5726422,-1.71477738 44.2815397,-1.54231431 55.23,5.12177046 L303.08,153.48177 C313.580233,160.065793 319.955409,171.588052 319.955409,183.98177 C319.955409,196.375489 313.580233,207.897748 303.08,214.48177 L55.19,362.88177 C49.6889626,366.207467 43.3881458,367.977087 36.96,368.00177 Z"
            id="Path"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default PlayIcon
