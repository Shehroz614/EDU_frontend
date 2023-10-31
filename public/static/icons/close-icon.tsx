import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  backgroundColor?: string
  width?: string
  height?: string
  rotate?: string
}

const CloseIcon: React.FunctionComponent<Props> = (props) => {
  const {
    width,
    height,
    color = '#000000',
    backgroundColor = '#F0F0F0',
  } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 10 10"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="cart" transform="translate(-1114.000000, -626.000000)">
          <g
            id="Group-9-Copy"
            transform="translate(428.000000, 322.000000)"
          ></g>
          <circle
            id="Oval-Copy-3"
            fill={backgroundColor}
            cx="1119"
            cy="631"
            r="11"
          ></circle>
          <polygon
            id="+-copy"
            fill={color}
            fillRule="nonzero"
            transform="translate(1119.063263, 631.000000) rotate(-315.000000) translate(-1119.063263, -631.000000) "
            points="1119.90194 630.009434 1123.56326 630.009434 1123.56326 631.660377 1119.90194 631.660377 1119.90194 636 1118.22459 636 1118.22459 631.660377 1114.56326 631.660377 1114.56326 630.009434 1118.22459 630.009434 1118.22459 626 1119.90194 626"
          ></polygon>
        </g>
      </g>
    </svg>
  )
}

export default CloseIcon
