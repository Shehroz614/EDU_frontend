import { colors } from '@configs/styles/config'
import React from 'react'

type Props = {
  width?: string
  height?: string
  dificultyLevel: number // from 0 to 3. 0 - easy, 3 - the hardest.
}

const CourseDificultyIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, dificultyLevel } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 16 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter
          x="-10.6%"
          y="-11.3%"
          width="121.2%"
          height="122.5%"
          filterUnits="objectBoundingBox"
          id="filter-1"
        >
          <feGaussianBlur stdDeviation="18" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <path
          d="M0,0 L491,0 C500.941125,-1.82615513e-15 509,8.0588745 509,18 L509,514.5 C509,524.717268 500.717268,533 490.5,533 L18.5,533 C8.28273213,533 1.25125444e-15,524.717268 0,514.5 L0,0 L0,0 Z"
          id="path-2"
        ></path>
      </defs>
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="home-_зщз" transform="translate(-711.000000, -716.000000)">
          <g
            id="Group-5"
            transform="translate(1.000000, 93.000000)"
            opacity="0.2085891"
            stroke="#979797"
            strokeDasharray="5"
          >
            <path
              d="M243.744017,681.214221 L709.825536,410.006509 C715.139466,406.914392 721.708857,406.932373 727.005781,410.053534 L1055.06091,603.356858 C1063.14992,608.123228 1065.84345,618.544571 1061.07708,626.633579 C1059.59966,629.140916 1057.50329,631.226989 1054.98871,632.692053 L621.34409,885.345446 C603.627028,895.667897 581.776264,895.868472 563.872698,885.872992 L243.976057,707.276143 C236.74273,703.237809 234.152677,694.100324 238.19101,686.866997 C239.501857,684.519052 241.419784,682.566666 243.744017,681.214221 Z"
              id="Path-2-Copy-4"
            ></path>
          </g>
          <g
            id="pop"
            transform="translate(703.000000, 705.000000)"
            fill="#000000"
            opacity="0.0417131696"
          >
            <path
              d="M18.5,0 L510,0 L510,0 L510,460.5 C510,470.717268 501.717268,479 491.5,479 L18.5,479 C8.28273213,479 1.25125444e-15,470.717268 0,460.5 L0,18.5 C-1.25125444e-15,8.28273213 8.28273213,1.87688166e-15 18.5,0 Z"
              id="Rectangle"
              filter="url(#filter-1)"
            ></path>
          </g>
          <g id="notif-copy" transform="translate(114.000000, 488.000000)"></g>
          <g id="Group-20" transform="translate(673.000000, 612.000000)">
            <mask id="mask-3" fill="white">
              <use xlinkHref="#path-2"></use>
            </mask>
            <use
              id="Rectangle-Copy-50"
              fill="#FFFFFF"
              xlinkHref="#path-2"
            ></use>
          </g>
          <g
            id="Group-19"
            transform="translate(711.000000, 716.000000)"
            fill={colors.uguPurple}
          >
            <rect
              id="Rectangle"
              x="0"
              y="10"
              opacity={dificultyLevel > 0 ? '1' : '0.347005208'}
              width="4"
              height="8"
              rx="2"
            ></rect>
            <rect
              id="Rectangle"
              opacity={dificultyLevel > 1 ? '1' : '0.347005208'}
              x="6"
              y="5"
              width="4"
              height="13"
              rx="2"
            ></rect>
            <rect
              id="Rectangle"
              opacity={dificultyLevel > 2 ? '1' : '0.347005208'}
              x="12"
              y="0"
              width="4"
              height="18"
              rx="2"
            ></rect>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default CourseDificultyIcon
