import React from 'react'
type Props = {
  width?: string
  height?: string
}

const MyCourseIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props

  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 266 266"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="play-button" fill="#1A1E3D" fillRule="nonzero">
          <path
            d="M133,0 C59.5471133,0 0,59.5460742 0,133 C0,206.453926 59.5471133,266 133,266 C206.452887,266 266,206.453926 266,133 C266,59.5460742 206.452887,0 133,0 Z M178.968125,140.050039 L112.468125,181.612539 C111.122539,182.452621 109.59252,182.875 108.0625,182.875 C106.676391,182.875 105.288203,182.530031 104.031977,181.831781 C101.389641,180.366703 99.75,177.586172 99.75,174.5625 L99.75,91.4375 C99.75,88.4138281 101.389641,85.6332969 104.031977,84.1682188 C106.674312,82.6948281 109.905277,82.7841875 112.468125,84.3874609 L178.968125,125.949961 C181.397453,127.472188 182.875,130.134785 182.875,133 C182.875,135.865215 181.397453,138.528332 178.968125,140.050039 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default MyCourseIcon
