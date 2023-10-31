import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const TextIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.90909C12 3.31055 11.6838 3.63636 11.2941 3.63636C10.9045 3.63636 10.5882 3.31055 10.5882 2.90909V1.45455H8.11765V14.5455H9.52941C9.91906 14.5455 10.2353 14.8713 10.2353 15.2727C10.2353 15.6742 9.91906 16 9.52941 16H2.47059C2.08094 16 1.76471 15.6742 1.76471 15.2727C1.76471 14.8713 2.08094 14.5455 2.47059 14.5455H3.88235V1.45455H1.41176V2.90909C1.41176 3.31055 1.09553 3.63636 0.705882 3.63636C0.316235 3.63636 0 3.31055 0 2.90909V0.727273C0 0.325818 0.316235 0 0.705882 0H11.2941C11.6838 0 12 0.325818 12 0.727273V2.90909ZM5.29412 14.5455H6.70588V1.45455H5.29412V14.5455Z"
        fill="black"
      />
    </svg>
  )
}

export default TextIcon
