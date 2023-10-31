import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const ProgressIcon: React.FunctionComponent<Props> = (props) => {
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
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="my_cours" transform="translate(-528.000000, -397.000000)">
          <rect
            id="Rectangle-Copy-35"
            stroke="#979797"
            opacity="0.156436012"
            x="501.5"
            y="376.5"
            width="275"
            height="59"
            rx="6"
          ></rect>
          <g
            id="Group-7"
            transform="translate(528.000000, 397.000000)"
            stroke="#1A1E3D"
          >
            <circle id="Oval" cx="9" cy="9" r="8.5"></circle>
            <path
              d="M0.791816899,6.7842328 C1.52717135,8.04369654 2.54393908,9.11852076 3.75594751,9.92245716 C5.25876647,10.9192909 7.06154991,11.5 9,11.5 C10.93808,11.5 12.7405458,10.9195117 14.2432409,9.923198 C15.4557179,9.11930414 16.4728944,8.04446394 17.2085625,6.78558215 C17.3987032,7.49134366 17.5,8.23384427 17.5,9 C17.5,11.3472102 16.5486051,13.4722102 15.0104076,15.0104076 C13.4722102,16.5486051 11.3472102,17.5 9,17.5 C6.65278981,17.5 4.52778981,16.5486051 2.98959236,15.0104076 C1.45139491,13.4722102 0.5,11.3472102 0.5,9 C0.5,8.23335576 0.60142942,7.49039844 0.791816899,6.7842328 Z"
              id="Combined-Shape"
              fill="#1A1E3D"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default ProgressIcon
