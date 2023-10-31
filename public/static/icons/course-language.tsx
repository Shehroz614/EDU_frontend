import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

export const CourseLanguageIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.60554 4H4.39446L4 7H5L4.60554 4Z" fill="#1A1E3D" />
      <path
        d="M12 9C12.1289 9.32022 12.3003 9.77944 12.4901 10C12.6798 9.77944 13 9 13 9H12Z"
        fill="#1A1E3D"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.50552 2.9082H14.5416C15.3457 2.9082 15.9997 3.60358 15.9997 4.41803V15.2494C15.9997 16.0638 15.3457 16.7264 14.5416 16.7264H7.27246L9.40385 14.259C9.67344 13.9506 9.78637 13.5566 9.76411 13.1382L8.50552 2.9082ZM14.4118 8.35558H14.5416C14.8102 8.35558 15.0276 8.13538 15.0276 7.86325C15.0276 7.59112 14.8102 7.37091 14.5416 7.37091H13.051V6.87858C13.051 6.60645 12.8337 6.38624 12.565 6.38624C12.2964 6.38624 12.079 6.60645 12.079 6.87858V7.37091H10.6208C10.3522 7.37091 10.1348 7.59112 10.1348 7.86325C10.1348 8.13538 10.3522 8.35558 10.6208 8.35558H10.7506C11.0272 9.25439 11.4334 9.95767 11.8891 10.5121C11.5811 10.7973 11.2788 11.0384 10.9578 11.2943C10.9067 11.335 10.8552 11.3761 10.8031 11.4178C10.5938 11.5875 10.5596 11.8971 10.7276 12.1096C10.8949 12.3218 11.2018 12.3562 11.4107 12.1861C11.4591 12.1473 11.5067 12.1094 11.5537 12.0719C11.9069 11.7903 12.2233 11.538 12.565 11.2204C12.8402 11.4762 13.1154 11.6897 13.3997 11.9101C13.5153 11.9998 13.6325 12.0907 13.7518 12.1861C13.9607 12.3562 14.2675 12.3218 14.4348 12.1096C14.6028 11.8971 14.5686 11.5875 14.3593 11.4178C14.244 11.3255 14.1285 11.2362 14.0136 11.1474C13.7501 10.9437 13.4895 10.7423 13.2409 10.5121C13.6966 9.95764 14.1352 9.25435 14.4118 8.35558Z"
        fill="#1A1E3D"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.51021 0C7.24915 0 7.87577 0.554954 7.96707 1.29076C7.9737 1.34393 9.45578 13.2844 9.45454 13.338C9.45014 13.5242 9.35882 13.626 9.24101 13.7574C9.22353 13.7769 9.20546 13.797 9.18701 13.8182H1.46835C0.658669 13.8182 0 13.1572 0 12.3447V1.4735C0 0.660981 0.658669 0 1.46835 0H6.51021ZM5.42654 9.00431C5.48005 9.27399 5.74295 9.44309 6.00249 9.38948C6.26732 9.33624 6.43937 9.07772 6.38632 8.81151L5.40742 3.89984C5.36154 3.67056 5.16077 3.50507 4.92753 3.50507H3.916C3.68276 3.50507 3.48199 3.67056 3.43611 3.89984L2.45724 8.81151C2.40418 9.07772 2.57628 9.33624 2.84107 9.38948C3.10919 9.44463 3.36445 9.27003 3.41702 9.00431L3.72984 7.43441H5.11371L5.42654 9.00431Z"
        fill="#1A1E3D"
      />
    </svg>
  )
}
