import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

//
const XIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color = '#1A1E3D' } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? width : '100%'}
      viewBox="0 0 14 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Teacher-_add_step3"
          transform="translate(-439.000000, -816.000000)"
        >
          <g
            id="error-copy-2"
            transform="translate(439.000000, 816.000000)"
            fill={color}
            fillRule="nonzero"
          >
            <path
              d="M11.9521557,2.04791577 C9.2216966,-0.682503913 4.77867376,-0.682773265 2.04794532,2.04791577 C-0.682783117,4.77860481 -0.682513761,9.22129419 2.04794532,11.9519832 C4.7784044,14.6826723 9.22142725,14.6826723 11.9521557,11.9519832 C14.6826148,9.22129419 14.6826148,4.77833545 11.9521557,2.04791577 Z M9.76175485,9.761614 C9.55138802,9.97197779 9.21038366,9.97197779 9.00001684,9.761614 L7.0000505,7.76167652 L4.9050016,9.8566952 C4.69463477,10.067059 4.35363041,10.067059 4.14326358,9.8566952 C3.93289675,9.6463314 3.93289675,9.30533196 4.14326358,9.09496817 L6.23831249,6.9999495 L4.23834616,5.00001203 C4.02797933,4.78964823 4.02797933,4.44837944 4.23834616,4.238285 C4.44871299,4.02792121 4.78971735,4.02792121 5.00008417,4.238285 L7.0000505,6.23822247 L8.90466491,4.33363555 C9.11503173,4.12327176 9.45603609,4.12327176 9.66640292,4.33363555 C9.87676975,4.54399935 9.87676975,4.88499879 9.66640292,5.09536258 L7.76178852,6.9999495 L9.76175485,8.99988697 C9.97212168,9.21025076 9.97212168,9.5512502 9.76175485,9.761614 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default XIcon
