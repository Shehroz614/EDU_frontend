import { colors } from '@configs/styles/config'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const WishlistIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 17 16"
      version="1.1"
    >
      <defs>
        <rect id="path-1" x="0" y="0" width="1920" height="380"></rect>
      </defs>
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="course-page" transform="translate(-539.000000, -409.000000)">
          <g id="Group-5" transform="translate(1.000000, 93.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
          </g>
          <rect
            id="Rectangle-Copy-5"
            stroke="#65677C"
            x="509.5"
            y="389.5"
            width="257"
            height="56"
            rx="7"
          ></rect>
          <g
            id="favorite-heart-button-(1)"
            transform="translate(539.000000, 409.000000)"
            fill={color ? color : colors.uguRed}
            fillRule="nonzero"
          >
            <path
              d="M8.5,16 L7.31,14.7826087 C2.89,10.7826087 0,8.08695652 0,4.7826087 C0,2.08695652 2.04,0 4.675,0 C6.12,0 7.565,0.695652174 8.5,1.82608696 C9.435,0.695652174 10.88,0 12.325,0 C14.96,0 17,2.08695652 17,4.7826087 C17,8.08695652 14.11,10.7826087 9.69,14.7826087 L8.5,16 Z"
              id="Path"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default WishlistIcon
