import React from 'react'
type Props = {
  width?: string
  height?: string
  color?: string
}

const NotificationIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color } = props

  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 434 510"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="notifications-button"
          fill={color ? color : '#1A1E3D'}
          fillRule="nonzero"
        >
          <g id="Shape">
            <path d="M217,510 C245.05,510 268,487.05 268,459 L166,459 C166,487.05 188.95,510 217,510 Z M382.75,342.088312 L382.75,216.75 L382.75,216.75 C382.75,137.7 329.2,73.95 255.25,56.1 L255.25,38.25 C255.25,17.85 237.4,0 217,0 C196.6,0 178.75,17.85 178.75,38.25 L178.75,56.1 C104.8,73.95 51.25,137.7 51.25,216.75 L51.25,342.088312 C51.25,351.636105 47.4571537,360.792846 40.7058441,367.544156 L9.26561146,398.984389 C3.49301239,404.756988 0.25,412.586312 0.25,420.75 C0.25,427.791631 5.95836944,433.5 13,433.5 L421,433.5 C428.041631,433.5 433.75,427.791631 433.75,420.75 C433.75,412.586312 430.506988,404.756988 424.734389,398.984389 L393.294156,367.544156 C386.542846,360.792846 382.75,351.636105 382.75,342.088312 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default NotificationIcon
