import { colors } from '@configs/styles/config'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

export const StudentQtyIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
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
        <rect id="path-1" x="0" y="0" width="1920" height="380"></rect>
      </defs>
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="course-page" transform="translate(-382.000000, -277.000000)">
          <g id="Group-5" transform="translate(1.000000, 93.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
            <path
              d="M380.713623,90.2853932 L843.617557,-146.02911 C848.499849,-148.521541 854.284415,-148.506783 859.153925,-145.98947 L1183.62255,21.7458619 C1191.96287,26.057419 1195.22882,36.3137854 1190.91726,44.6540975 C1189.28776,47.8062245 1186.71275,50.3694454 1183.55317,51.9844682 L751.578361,272.789492 C735.310328,281.104939 716.075128,281.269126 699.667518,273.232592 L380.935748,117.116087 C373.49598,113.47205 370.418933,104.486851 374.062971,97.0470831 C375.490201,94.1332094 377.823778,91.7606716 380.713623,90.2853932 Z"
              id="Path-2-Copy"
              stroke="#979797"
              opacity="0.0933547247"
              strokeDasharray="5"
              mask="url(#mask-2)"
            ></path>
          </g>
          <g
            id="man-user"
            transform="translate(382.000000, 277.000000)"
            fillRule="nonzero"
          >
            <path
              d="M7.64290681,8 C9.57579453,8 11.1428571,6.20915682 11.1428571,4.00002337 C11.1428571,1.79084318 10.6283675,0 7.64290681,0 C4.65744615,0 4.14285714,1.79084318 4.14285714,4.00002337 C4.14285714,6.20915682 5.70991976,8 7.64290681,8 Z"
              id="Path"
              fill={colors.uguBlue}
            ></path>
            <path
              d="M0.143549963,15.05 C0.142349963,14.8554143 0.141149963,14.9951757 0.143549963,15.05 L0.143549963,15.05 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M14.141849,15.0969388 C14.145649,15.0385068 14.143149,14.6915435 14.141849,15.0969388 L14.141849,15.0969388 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M15.1344604,15.3039185 C15.0609189,11.0018286 14.4548913,9.77596656 9.81737701,9 C9.81737701,9 9.16457586,9.77121212 7.6430262,9.77121212 C6.12147655,9.77121212 5.46856269,9 5.46856269,9 C0.881654029,9.76750261 0.238771125,10.9751829 0.154240588,15.1641588 C0.147309084,15.5062173 0.144096924,15.5241902 0.142857143,15.4844828 C0.143138911,15.5588819 0.143477033,15.6964995 0.143477033,15.9364681 C0.143477033,15.9364681 1.24755854,18 7.6430262,18 C14.0383812,18 15.1425754,15.9364681 15.1425754,15.9364681 C15.1425754,15.7822884 15.1426881,15.6750784 15.1428571,15.6021421 C15.1416174,15.626698 15.1391378,15.5791014 15.1344604,15.3039185 Z"
              id="Path"
              fill={colors.uguBlue}
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export const StudentQtyIconNew: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.625 9.75C4.95749 9.75 4.30497 9.55206 3.74995 9.18121C3.19493 8.81036 2.76235 8.28326 2.50691 7.66656C2.25146 7.04986 2.18462 6.37126 2.31485 5.71657C2.44507 5.06189 2.76651 4.46052 3.23851 3.98852C3.71052 3.51651 4.31188 3.19508 4.96657 3.06485C5.62126 2.93463 6.29986 3.00146 6.91656 3.25691C7.53326 3.51235 8.06036 3.94494 8.43121 4.49995C8.80206 5.05497 9 5.70749 9 6.375C8.99901 7.2698 8.64311 8.12767 8.01039 8.76039C7.37767 9.39311 6.5198 9.74901 5.625 9.75ZM10.5 18H0.75C0.551088 18 0.360322 17.921 0.21967 17.7803C0.0790176 17.6397 0 17.4489 0 17.25V16.875C0 15.3832 0.592632 13.9524 1.64752 12.8975C2.70242 11.8426 4.13316 11.25 5.625 11.25C7.11684 11.25 8.54758 11.8426 9.60248 12.8975C10.6574 13.9524 11.25 15.3832 11.25 16.875V17.25C11.25 17.4489 11.171 17.6397 11.0303 17.7803C10.8897 17.921 10.6989 18 10.5 18ZM13.125 6.75C12.4575 6.75 11.805 6.55206 11.25 6.18121C10.6949 5.81036 10.2624 5.28326 10.0069 4.66656C9.75146 4.04986 9.68462 3.37126 9.81485 2.71657C9.94507 2.06189 10.2665 1.46052 10.7385 0.988516C11.2105 0.516514 11.8119 0.195076 12.4666 0.0648512C13.1213 -0.0653739 13.7999 0.00146234 14.4166 0.256908C15.0333 0.512354 15.5604 0.944936 15.9312 1.49995C16.3021 2.05497 16.5 2.70749 16.5 3.375C16.499 4.2698 16.1431 5.12767 15.5104 5.76039C14.8777 6.39311 14.0198 6.74901 13.125 6.75ZM12.0592 8.26575C11.3607 8.35947 10.6891 8.59643 10.0864 8.96179C9.48368 9.32715 8.96293 9.81303 8.55675 10.389C10.2374 11.1522 11.558 12.5357 12.2423 14.25H17.25C17.4489 14.25 17.6397 14.171 17.7803 14.0303C17.921 13.8897 18 13.6989 18 13.5V13.4715C17.9992 12.7239 17.839 11.9851 17.5299 11.3043C17.2209 10.6236 16.7702 10.0166 16.208 9.52392C15.6457 9.03121 14.9848 8.66413 14.2694 8.44717C13.5539 8.2302 12.8005 8.16835 12.0592 8.26575Z"
        fill="#1A1E3D"
      />
    </svg>
  )
}