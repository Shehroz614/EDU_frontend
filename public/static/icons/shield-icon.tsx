import React from 'react'
import { colors } from '@configs/styles/config'

const ShieldIcon: React.FC<{
  color?: string
  width?: string | number
  height?: string | number
}> = (props) => {
  const { color = colors.uguPurple, width = 18, height = 18 } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2501_37313)">
        <path
          d="M19.944 2.634L12 0L4.056 2.634C3.45747 2.83242 2.93668 3.21438 2.5676 3.72563C2.19852 4.23689 1.99992 4.85144 2 5.482V11.991C2 19.515 11.2 23.67 11.594 23.843L11.948 24L12.316 23.878C12.711 23.747 22 20.568 22 11.991V5.482C22.0001 4.85144 21.8015 4.23689 21.4324 3.72563C21.0633 3.21438 20.5425 2.83242 19.944 2.634ZM13 19.052H11V17.052H13V19.052ZM13 15H11V5H13V15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2501_37313">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
export default ShieldIcon
