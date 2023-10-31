import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
}

const BoldIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 98 130"
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
        <g id="bold" fill="#1A1E3D" fillRule="nonzero">
          <path
            d="M84.3261921,64.9997221 C92.660371,58.29109 98,48.0356845 98,36.56217 C98,16.4007004 81.5148907,0 61.2497207,0 L0,0 L0,16.2500695 L8.16657355,16.2500695 L8.16657355,113.749931 L0,113.749931 L0,130 L61.25,130 C81.51517,130 98,113.5993 98,93.4375521 C98,81.9637597 92.660371,71.7083542 84.3261921,64.9997221 Z M61.2497207,113.749653 L24.4997207,113.749653 L24.4997207,73.1248958 L61.2497207,73.1248958 C72.506938,73.1248958 81.6662942,82.2377856 81.6662942,93.4372742 C81.6662942,104.636763 72.506938,113.749653 61.2497207,113.749653 Z M61.2497207,56.8748263 L24.4997207,56.8748263 L24.4997207,16.2500695 L61.2497207,16.2500695 C72.506938,16.2500695 81.6662942,25.3629593 81.6662942,36.5624479 C81.6662942,47.7619365 72.506938,56.8748263 61.2497207,56.8748263 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default BoldIcon
