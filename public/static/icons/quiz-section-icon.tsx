import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const QuizSectionIcon: React.FunctionComponent<Props> = (props) => {
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
          transform="translate(-1555.000000, -1116.000000)"
        >
          <g
            id="fi-sr-file-check"
            transform="translate(1555.000000, 1116.000000)"
            fill="#1A1E3D"
            fillRule="nonzero"
          >
            <path
              d="M12,7 L12,0.46 C12.9250548,0.809335251 13.7652886,1.35131158 14.465,2.05 L17.949,5.536 C18.6484803,6.23488032 19.1908762,7.07489513 19.54,8 L13,8 C12.4477153,8 12,7.55228475 12,7 Z M20,10.485 L20,19 C19.9966939,21.7600532 17.7600532,23.9966939 15,24 L5,24 C2.23994685,23.9966939 0.00330611633,21.7600532 0,19 L0,5 C0.00330611633,2.23994685 2.23994685,0.00330611633 5,0 L9.515,0 C9.678,0 9.839,0.013 10,0.024 L10,7 C10,8.65685425 11.3431458,10 13,10 L19.976,10 C19.987,10.161 20,10.322 20,10.485 Z M14.724,14.311 C14.3433423,13.911447 13.7109726,13.8957832 13.311,14.276 L9.711,17.707 C9.51657624,17.9025692 9.25002111,18.0091691 8.97435725,18.001596 C8.6986934,17.9940228 8.43839304,17.8729488 8.255,17.667 L6.666,16.253 C6.3991226,16.0150611 6.02557884,15.9375739 5.68607902,16.0497271 C5.34657921,16.1618802 5.09270144,16.446635 5.02007902,16.7967271 C4.9474566,17.1468191 5.0671226,17.5090611 5.334,17.747 L6.878,19.121 C8.04297018,20.2862408 9.92969281,20.2938305 11.104,19.138 L14.689,15.724 C15.088553,15.3433423 15.1042168,14.7109726 14.724,14.311 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default QuizSectionIcon
