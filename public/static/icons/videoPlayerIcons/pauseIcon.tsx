import React from 'react'

type PlayIconProps = {
  color?: string
  width?: string
  height?: string
}

const PauseIcon: React.FunctionComponent<PlayIconProps> = (props) => {
  const { width, height, color } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 15 20"
      version="1.1"
    >
      <g id="fi-sr-pause" fill={color ? color : '#D8D8D8'} fillRule="nonzero">
        <path
          d="M3,0 C1.34314575,0 0,1.30583615 0,2.91666668 L0,17.0833334 C0,18.6941639 1.34314578,20 3,20 C4.65685422,20 6,18.6941639 6,17.0833334 L6,2.91666668 C6,1.30583615 4.65685425,0 3,0 Z"
          id="Path"
        ></path>
        <path
          d="M12,0 C10.3431458,0 9,1.30583615 9,2.91666667 L9,17.0833333 C9,18.6941639 10.3431458,20 12,20 C13.6568542,20 15,18.6941639 15,17.0833333 L15,2.91666667 C15,1.30583615 13.6568542,0 12,0 Z"
          id="Path"
        />
      </g>
    </svg>
  )
}

export default PauseIcon
