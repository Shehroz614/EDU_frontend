import { colors } from '@configs/styles/config'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const LecturesQtyIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 21 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter
          x="-11.1%"
          y="-6.0%"
          width="122.2%"
          height="112.1%"
          filterUnits="objectBoundingBox"
          id="filter-1"
        >
          <feGaussianBlur stdDeviation="19" in="SourceGraphic"></feGaussianBlur>
        </filter>
      </defs>
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="course-page" transform="translate(-1293.000000, -901.000000)">
          <rect
            id="Rectangle"
            fill="#000000"
            opacity="0.045921689"
            filter="url(#filter-1)"
            x="1176"
            y="237"
            width="514"
            height="944"
            rx="1"
          ></rect>
          <rect
            id="Rectangle-Copy-4"
            fill="#FFFFFF"
            x="1215"
            y="183"
            width="520"
            height="973"
            rx="15"
          ></rect>
          <g
            id="Group-19"
            transform="translate(1293.000000, 901.000000)"
            fill={color ? color : colors.uguBlue}
            fillRule="nonzero"
          >
            <path
              d="M3.70380489,0.875 C3.70327367,0.875 3.70267604,0.875 3.70214482,0.875 C3.51561892,0.875 3.34018232,0.951128368 3.20770843,1.08948038 C3.07377368,1.22936191 3,1.4156157 3,1.61389708 L3,12.6935294 C3,13.0998255 3.31694129,13.4311751 3.70659381,13.4322179 C5.34927004,13.4363198 8.10140679,13.7947836 10,15.875 L10,4.27984997 C10,4.14212367 9.96640011,4.0127402 9.90298529,3.90567382 C8.34470721,1.27823702 5.35019968,0.87903237 3.70380489,0.875 Z"
              id="Path"
            ></path>
            <path
              d="M18,12.693599 L18,1.61389708 C18,1.4156157 17.9262256,1.22936191 17.7922896,1.08948038 C17.6598144,0.951128368 17.4842434,0.875 17.2979149,0.875 C17.2973173,0.875 17.2967197,0.875 17.2961884,0.875 C15.6498444,0.879101894 12.6553085,1.27830654 11.0969492,3.90574335 C11.0335338,4.01280973 11,4.14219319 11,4.27991949 L11,15.875 C12.8986112,13.7947836 15.6507741,13.4363198 17.2934659,13.4322179 C17.6830557,13.4311751 18,13.0998255 18,12.693599 Z"
              id="Path"
            ></path>
            <path
              d="M20.2380793,3.875 L19.6855326,3.875 L19.6855326,12.9842515 C19.6855326,14.0043515 18.813834,14.8361695 17.7422978,14.8386991 C16.2377447,14.8421174 13.7569493,15.1226261 12,16.7081189 C15.0386481,15.9987458 18.2419274,16.4598793 20.0674968,16.8565431 C20.295442,16.9060406 20.5309878,16.8549023 20.7136165,16.7161179 C20.8955998,16.5776752 21,16.3707291 21,16.1486056 L21,4.60146488 C21,4.2009042 20.6581897,3.875 20.2380793,3.875 Z"
              id="Path"
            ></path>
            <path
              d="M1.31447784,12.9843615 L1.31447784,3.875 L0.761926766,3.875 C0.3418847,3.875 0,4.20090814 0,4.60147365 L0,16.1485488 C0,16.3707433 0.104401033,16.5776236 0.286385799,16.7160679 C0.468872494,16.8547856 0.704205042,16.9061297 0.932510596,16.8564948 C2.75809459,16.4597579 5.96147105,15.9986871 9,16.7080689 C7.24310845,15.1226252 4.76229325,14.8421815 3.2577281,14.8387631 C2.18625514,14.8363019 1.31447784,14.0044739 1.31447784,12.9843615 Z"
              id="Path"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default LecturesQtyIcon
