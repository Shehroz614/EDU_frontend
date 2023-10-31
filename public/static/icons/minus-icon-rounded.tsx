import { colors } from '@configs/styles/config'
import React, { SVGProps } from 'react'

const MinusIconRounded: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="10"
      height="3"
      viewBox="0 0 10 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 2.73047C0.447716 2.73047 0 2.28275 0 1.73047V1.73047C0 1.17818 0.447715 0.730469 1 0.730469L9 0.730469C9.55228 0.730469 10 1.17818 10 1.73047V1.73047C10 2.28275 9.55228 2.73047 9 2.73047L1 2.73047Z"
        fill={props.color ? props.color : colors.uguPurple}
      />
    </svg>
  )
}

export default MinusIconRounded
