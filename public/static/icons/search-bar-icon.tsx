import React from 'react'

type Props = {
  width?: string
  height?: string
}

const SearchBarIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
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
          id="course_stady_2"
          transform="translate(-1656.000000, -1189.000000)"
        >
          <rect
            id="Rectangle-Copy-19"
            stroke="rgba(26, 30, 61, 1)"
            opacity="0.248418899"
            x="287.5"
            y="1169.5"
            width="1422"
            height="60"
            rx="30"
          ></rect>
          <g
            id="Group-2-Copy"
            transform="translate(1658.000000, 1191.000000)"
            stroke="rgba(26, 30, 61, 1)"
            strokeWidth="3"
          >
            <circle id="Oval" cx="9" cy="9" r="9"></circle>
            <line
              x1="15.4882208"
              y1="15.4682654"
              x2="19.7290406"
              y2="19.7297904"
              id="Path"
              strokeLinecap="round"
            ></line>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SearchBarIcon
