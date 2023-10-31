import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const PencilIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props

  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Teacher-_add_step1"
          transform="translate(-662.000000, -324.000000)"
        >
          <rect
            id="Rectangle-Copy-19"
            stroke="#979797"
            opacity="0.248418899"
            x="182.5"
            y="299.5"
            width="526"
            height="60"
            rx="30"
          ></rect>
          <path
            d="M672.601249,327 L676,330.398182 L667.396824,339 L664,335.601818 L672.601249,327 Z M678.623699,325.847871 L676.949822,324.415245 C676.302926,323.861585 675.252501,323.861585 674.603407,324.415245 L673,325.787557 L676.753412,329 L678.623699,327.399273 C679.125434,326.969822 679.125434,326.277292 678.623699,325.847871 Z M662.008871,340.564419 C661.950857,340.821679 662.186588,341.052197 662.447711,340.989634 L666,340.140985 L662.813989,337 L662.008871,340.564419 Z"
            id="Shape"
            fill="#1A1E3D"
            fillRule="nonzero"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default PencilIcon
