import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const BulletIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color } = props
  // return (
  //   <svg
  //     width={width ? width : '100%'}
  //     height={height ? height : '100%'}
  //     viewBox="0 0 10 9"
  //     version="1.1"
  //     xmlns="http://www.w3.org/2000/svg"
  //     xmlnsXlink="http://www.w3.org/1999/xlink"
  //   >
  //     <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
  //       <g
  //         id="Teacher-_add_step2.1"
  //         transform="translate(-435.000000, -3786.000000)"
  //       >
  //         <polyline
  //           id="Path-6"
  //           stroke={color}
  //           strokeWidth="2"
  //           stroke-linecap="round"
  //           points="436 3790.36315 439.260537 3793 444 3787"
  //         ></polyline>
  //       </g>
  //     </g>
  //   </svg>
  // )
  return (
    // <svg
    //   width={width ? width : '100%'}
    //   height={height ? height : '100%'}
    //   viewBox="0 0 19 16"
    // >
    //   <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //     <g
    //       id="Teacher-_add_step3"
    //       transform="translate(-328.000000, -1876.000000)"
    //     >
    //       <polyline
    //         id="Path-4-Copy-5"
    //         stroke={color ? color : 'black'}
    //         strokeWidth="3"
    //         points="330 1882.15792 334.65913 1889 345 1877"
    //       ></polyline>
    //     </g>
    //   </g>
    // </svg>
    // <svg

    //   viewBox="0 0 18 14"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M5.81189 13.4969C5.30095 13.4971 4.81093 13.294 4.44994 12.9324L0.332296 8.81628C-0.110765 8.37308 -0.110765 7.65464 0.332296 7.21144C0.775498 6.76838 1.49393 6.76838 1.93713 7.21144L5.81189 11.0862L16.0629 0.835225C16.5061 0.392164 17.2245 0.392164 17.6677 0.835225C18.1108 1.27843 18.1108 1.99686 17.6677 2.44006L7.17385 12.9324C6.81286 13.294 6.32284 13.4971 5.81189 13.4969Z"
    //     fill={color ? color : 'black'}
    //   />
    // </svg>
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6C1.344 6 0 4.656 0 3C0 1.344 1.344 0 3 0C4.656 0 6 1.344 6 3C6 4.656 4.656 6 3 6Z"
        fill={color ? color : 'black'}
      />
    </svg>
  )
}

export default BulletIcon
