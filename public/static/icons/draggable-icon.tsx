import React from 'react'

type DraggableIconProps = {
  color?: string
  width?: string
  height?: string
}

const DraggableIcon: React.FunctionComponent<DraggableIconProps> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 43 43"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-346.000000, -680.000000)">
          <g id="Group-8" transform="translate(292.000000, 350.000000)">
            <g id="Group-14" transform="translate(55.000000, 331.000000)">
              <path
                d="M20.5,0 C9.19617188,0 0,9.19617188 0,20.5 C0,31.8038281 9.19617188,41 20.5,41 C31.8038281,41 41,31.8038281 41,20.5 C41,9.19617188 31.8038281,0 20.5,0 Z"
                id="Path-Copy-14"
                stroke="#D8D8D8"
                fillRule="nonzero"
              ></path>
              <rect
                id="Rectangle"
                fill="#D8D8D8"
                x="12.6428571"
                y="15"
                width="16"
                height="2"
              ></rect>
              <rect
                id="Rectangle-Copy-40"
                fill="#D8D8D8"
                x="12.6428571"
                y="20"
                width="16"
                height="2"
              ></rect>
              <rect
                id="Rectangle-Copy-41"
                fill="#D8D8D8"
                x="12.6428571"
                y="25"
                width="16"
                height="2"
              ></rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default DraggableIcon
