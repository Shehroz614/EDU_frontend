import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const ButtonArrow: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Teacher-_add_step2.1"
          transform="translate(-1210.000000, -692.000000)"
        >
          <rect
            id="Rectangle-Copy-19"
            fill="#D8D8D8"
            opacity="0.248418899"
            x="182"
            y="299"
            width="1556"
            height="3554"
            rx="30.5"
          ></rect>
          <rect
            id="Rectangle-Copy-11"
            fill="#F1F1F1"
            x="334"
            y="672"
            width="1003"
            height="61"
            rx="10"
          ></rect>
          <path
            d="M1227.07451,694.925594 C1223.17385,691.024994 1216.82668,691.02461 1212.92564,694.925594 C1209.0246,698.826578 1209.02498,705.173277 1212.92564,709.074262 C1216.82629,712.975246 1223.17347,712.975246 1227.07451,709.074262 C1230.97516,705.173277 1230.97516,698.826194 1227.07451,694.925594 Z M1220.09064,707.265403 C1219.68956,707.265403 1219.36448,706.940327 1219.36448,706.539246 L1219.36448,702.726156 L1215.37011,702.726156 C1214.96903,702.726156 1214.64396,702.401081 1214.64396,702 C1214.64396,701.598919 1214.96903,701.273844 1215.37011,701.273844 L1219.36448,701.273844 L1219.36448,697.460754 C1219.36448,697.059673 1219.68982,696.734341 1220.09064,696.734597 C1220.49172,696.734597 1220.8168,697.059673 1220.8168,697.460754 L1220.8168,701.273844 L1224.44809,701.273844 C1224.84917,701.273844 1225.17425,701.598919 1225.17425,702 C1225.17425,702.401081 1224.84917,702.726156 1224.44809,702.726156 L1220.8168,702.726156 L1220.8168,706.539246 C1220.8168,706.940327 1220.49172,707.265403 1220.09064,707.265403 Z"
            id="Shape"
            fill="#1A1E3D"
            fillRule="nonzero"
          ></path>
          <g
            id="Group-8"
            transform="translate(292.000000, 350.000000)"
            opacity="0.184128534"
            stroke="#979797"
          >
            <rect
              id="Rectangle-Copy-39"
              x="0.5"
              y="0.5"
              width="1074"
              height="600"
              rx="30.5"
            ></rect>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default ButtonArrow
