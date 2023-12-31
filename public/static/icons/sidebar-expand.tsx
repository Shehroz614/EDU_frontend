import React from 'react'

const SidebarExpand = ({
  width,
  height,
}: {
  width?: string
  height?: string
}) => {
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="invisible_box" data-name="invisible box">
          <rect width="48" height="48" fill="none" />
        </g>
        <g id="Layer_7" data-name="Layer 7">
          <g>
            <path d="M40,2a2,2,0,0,0-2,2V44a2,2,0,0,0,4,0V4A2,2,0,0,0,40,2Z" />
            <path d="M32,6H16a2,2,0,0,0-2,2V20a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Z" />
            <path d="M32,26H8a2,2,0,0,0-2,2V40a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V28A2,2,0,0,0,32,26Z" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SidebarExpand
