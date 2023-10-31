import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const VideoSectionIcon: React.FunctionComponent<Props> = (props) => {
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
          id="Teacher-_add_step2.1"
          transform="translate(-1411.000000, -1117.000000)"
        >
          <path
            d="M1430,1117 C1432.76005,1117.00331 1434.99669,1119.23995 1435,1122 L1435,1122 L1435,1136 C1434.99669,1138.76005 1432.76005,1140.99669 1430,1141 L1430,1141 L1416,1141 C1413.23995,1140.99669 1411.00331,1138.76005 1411,1136 L1411,1136 L1411,1122 C1411.00331,1119.23995 1413.23995,1117.00331 1416,1117 L1416,1117 Z M1415,1136 L1413,1136 C1413.00525,1137.26679 1413.80565,1138.39375 1415,1138.816 L1415,1138.816 L1415,1136 Z M1433,1136 L1431,1136 L1431,1138.816 C1432.19435,1138.39375 1432.99475,1137.26679 1433,1136 L1433,1136 Z M1415,1132 L1413,1132 L1413,1134 L1415,1134 L1415,1132 Z M1433,1132 L1431,1132 L1431,1134 L1433,1134 L1433,1132 Z M1420.86502,1126.06096 C1420.7224,1125.98466 1420.5424,1125.97957 1420.39471,1126.04805 C1420.24702,1126.11692 1420.15517,1126.24839 1420.15517,1126.39122 L1420.15517,1126.39122 L1420.15517,1131.86948 C1420.15517,1132.01231 1420.24702,1132.14379 1420.39471,1132.21266 C1420.46394,1132.24474 1420.5401,1132.26079 1420.61671,1132.26079 C1420.70302,1132.26079 1420.78933,1132.24005 1420.86456,1132.19974 L1420.86456,1132.19974 L1425.94148,1129.46061 C1426.0744,1129.38861 1426.15517,1129.26418 1426.15517,1129.13035 C1426.15517,1128.99652 1426.0744,1128.87209 1425.94194,1128.80009 L1425.94194,1128.80009 Z M1433,1128 L1431,1128 L1431,1130 L1433,1130 L1433,1128 Z M1415,1128 L1413,1128 L1413,1130 L1415,1130 L1415,1128 Z M1433,1124 L1431,1124 L1431,1126 L1433,1126 L1433,1124 Z M1415,1124 L1413,1124 L1413,1126 L1415,1126 L1415,1124 Z M1431,1119.184 L1431,1122 L1433,1122 C1432.99475,1120.73321 1432.19435,1119.60625 1431,1119.184 L1431,1119.184 Z M1415,1119.184 C1413.80565,1119.60625 1413.00525,1120.73321 1413,1122 L1413,1122 L1415,1122 Z"
            id="Combined-Shape"
            fill="#1A1E3D"
            fillRule="nonzero"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default VideoSectionIcon
