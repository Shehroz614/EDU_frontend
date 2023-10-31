import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const AttachResourcesIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Teacher-_add_step2.1"
          transform="translate(-1639.000000, -1116.000000)"
        >
          <g
            id="fi-sr-clip"
            transform="translate(1639.000000, 1116.000000)"
            fill={color ? color : '#1A1E3D'}
            fillRule="nonzero"
          >
            <path
              d="M22.95,9.6 C22.5595001,9.20961806 21.9264999,9.20961806 21.536,9.6 L10.644,20.539 C8.69139727,22.4918789 5.52537888,22.4921027 3.5725,20.5395 C1.61962112,18.5868973 1.61939727,15.4208789 3.572,13.468 L14.121,2.876 C15.295143,1.72055252 17.1813288,1.72800978 18.3462988,2.89270523 C19.5112688,4.05740068 19.5191707,5.9435847 18.364,7.118 L7.815,17.71 C7.41972462,18.0886748 6.79627538,18.0886748 6.401,17.71 C6.01061806,17.3195001 6.01061806,16.6864999 6.401,16.296 L15.793,6.861 C16.1719722,6.46862111 16.1665524,5.84491522 15.7808186,5.45918142 C15.3950848,5.07344763 14.7713789,5.06802779 14.379,5.447 L4.987,14.882 C4.42428095,15.4446237 4.10814067,16.2077625 4.10814067,17.0035 C4.10814067,17.7992375 4.42428095,18.5623763 4.987,19.125 C6.17439336,20.2580821 8.04260664,20.2580821 9.23,19.125 L19.778,8.532 C21.68833,6.5723504 21.6682671,3.44103305 19.7329833,1.50602299 C17.7976995,-0.428987074 14.6663794,-0.448607115 12.707,1.462 L2.158,12.054 C-0.575809413,14.7878095 -0.575809367,19.2201904 2.1580001,21.9539999 C4.89180958,24.6878094 9.32419047,24.6878094 12.058,21.954 L22.95,11.018 C23.1386973,10.8303118 23.2447915,10.5751456 23.2447915,10.309 C23.2447915,10.0428544 23.1386973,9.78768816 22.95,9.6 Z"
              id="Path"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default AttachResourcesIcon
