import { colors } from '@configs/styles/config'
import React, { SVGProps } from 'react'

const PlusIconRounded: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 0.730469C4.44772 0.730469 4 1.17818 4 1.73047V4.73047H1C0.447715 4.73047 0 5.17818 0 5.73047C0 6.28275 0.447715 6.73047 1 6.73047H4V9.73047C4 10.2828 4.44772 10.7305 5 10.7305C5.55228 10.7305 6 10.2828 6 9.73047V6.73047H9C9.55229 6.73047 10 6.28275 10 5.73047C10 5.17818 9.55228 4.73047 9 4.73047H6V1.73047C6 1.17818 5.55228 0.730469 5 0.730469Z"
        fill={props.color ? props.color : colors.uguPurple}
      />
    </svg>
  )
}

export default PlusIconRounded
