import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const TextSectionIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 20 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Teacher-_add_step2.1"
          transform="translate(-1485.000000, -1116.000000)"
        >
          <g
            id="fi-sr-document"
            transform="translate(1485.000000, 1116.000000)"
            fill="#1A1E3D"
            fillRule="nonzero"
          >
            <path
              d="M12,7 L12,0.46 C12.9250548,0.809335251 13.7652886,1.35131158 14.465,2.05 L17.949,5.536 C18.6484803,6.23488032 19.1908762,7.07489513 19.54,8 L13,8 C12.4477153,8 12,7.55228475 12,7 Z M20,10.485 L20,19 C19.9966939,21.7600532 17.7600532,23.9966939 15,24 L5,24 C2.23994685,23.9966939 0.00330611633,21.7600532 0,19 L0,5 C0.00330611633,2.23994685 2.23994685,0.00330611633 5,0 L9.515,0 C9.678,0 9.839,0.013 10,0.024 L10,7 C10,8.65685425 11.3431458,10 13,10 L19.976,10 C19.987,10.161 20,10.322 20,10.485 Z M12,19 C12,18.4477153 11.5522847,18 11,18 L6,18 C5.44771525,18 5,18.4477153 5,19 C5,19.5522847 5.44771525,20 6,20 L11,20 C11.5522847,20 12,19.5522847 12,19 Z M15,15 C15,14.4477153 14.5522847,14 14,14 L6,14 C5.44771525,14 5,14.4477153 5,15 C5,15.5522847 5.44771525,16 6,16 L14,16 C14.5522847,16 15,15.5522847 15,15 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default TextSectionIcon
