import React, { ReactNode } from 'react'
type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
}

const CategoriesIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props

  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 18 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>Group</title>
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="home"
          transform="translate(-318.000000, -37.000000)"
          fill="#1A1E3D"
        >
          <g id="Group" transform="translate(318.000000, 37.000000)">
            <rect id="Rectangle" x="0" y="0" width="8" height="8"></rect>
            <rect
              id="Rectangle-Copy-2"
              x="0"
              y="10"
              width="8"
              height="8"
            ></rect>
            <rect id="Rectangle-Copy" x="10" y="0" width="8" height="8"></rect>
            <rect
              id="Rectangle-Copy-3"
              x="10"
              y="10"
              width="8"
              height="8"
            ></rect>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default CategoriesIcon
