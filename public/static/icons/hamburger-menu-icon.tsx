import { colors } from 'configs/styles/config'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

export const HamburgerMenuIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      fill={color ? color : colors.uguPurple}
    >
      <g>
        <path d="M480,224H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
        <path d="M32,138.667h448c17.673,0,32-14.327,32-32s-14.327-32-32-32H32c-17.673,0-32,14.327-32,32S14.327,138.667,32,138.667z" />
        <path d="M480,373.333H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,373.333,480,373.333z" />
      </g>
    </svg>

    /* <g>
        <path d="M469.333,224h-448C9.551,224,0,233.551,0,245.333c0,11.782,9.551,21.333,21.333,21.333h448   c11.782,0,21.333-9.551,21.333-21.333C490.667,233.551,481.115,224,469.333,224z" />
        <path d="M21.333,117.333h448c11.782,0,21.333-9.551,21.333-21.333s-9.551-21.333-21.333-21.333h-448C9.551,74.667,0,84.218,0,96   S9.551,117.333,21.333,117.333z" />
        <path d="M469.333,373.333h-448C9.551,373.333,0,382.885,0,394.667C0,406.449,9.551,416,21.333,416h448   c11.782,0,21.333-9.551,21.333-21.333C490.667,382.885,481.115,373.333,469.333,373.333z" />
      </g>
    </svg> */
  )
}

export const CrossMenu: React.FunctionComponent<Props> = () => (
  <svg
    width="130%"
    viewBox="0 0 44 44"
    style={{ marginLeft: -5, marginTop: -5 }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="12.3701"
      y="9.34033"
      width="30.6101"
      height="4.28541"
      rx="2.14271"
      transform="rotate(45 12.3701 9.34033)"
      fill="#1A1E3D"
    />
    <rect
      x="9.34082"
      y="30.9854"
      width="30.6101"
      height="4.28541"
      rx="2.14271"
      transform="rotate(-45 9.34082 30.9854)"
      fill="#1A1E3D"
    />
  </svg>
)
