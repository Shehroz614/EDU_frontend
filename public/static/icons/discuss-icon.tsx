import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const DiscussIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6667 0H6.66667C6.29867 0 6 0.305434 6 0.681772C6 1.05811 6.29867 1.36354 6.66667 1.36354H14.6667V9.5448H7.33333C7.162 9.5448 6.99767 9.61196 6.87367 9.73297L3.33333 13.1797V10.2266C3.33333 9.85024 3.03467 9.5448 2.66667 9.5448H1.33333V5.45417C1.33333 5.07784 1.03467 4.7724 0.666667 4.7724C0.298667 4.7724 0 5.07784 0 5.45417V9.5448C0 10.2968 0.598 10.9083 1.33333 10.9083H2V13.9756C2 14.3799 2.223 14.7358 2.58233 14.9049C2.71833 14.969 2.86133 15 3.003 15C3.23567 15 3.46467 14.9155 3.65133 14.7515C3.66 14.744 3.66867 14.7362 3.677 14.728L7.6 10.9083H14.6667C15.402 10.9083 16 10.2968 16 9.5448V1.36354C16 0.611549 15.402 0 14.6667 0Z"
        fill="black"
      />
    </svg>
  )
}

export default DiscussIcon
