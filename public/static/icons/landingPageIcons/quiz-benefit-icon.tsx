import { colors } from '@configs/styles/config'
import React, { SVGProps } from 'react'

export const QuizBenefitIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M48.7296 24.9158H33.1017C31.8812 24.9158 30.8691 23.9037 30.8691 22.6832C30.8691 21.4628 31.8812 20.4507 33.1017 20.4507H48.7296C49.9501 20.4507 50.9622 21.4628 50.9622 22.6832C50.9622 23.9037 49.9798 24.9158 48.7296 24.9158Z"
      fill={props.color ? props.color : colors.uguPurple}
    />
    <path
      d="M17.4713 27.1779C16.9058 27.1779 16.3402 26.9695 15.8937 26.523L13.6611 24.2904C12.7979 23.4271 12.7979 21.9983 13.6611 21.135C14.5244 20.2718 15.9532 20.2718 16.8165 21.135L17.4713 21.7899L22.5913 16.6699C23.4546 15.8066 24.8834 15.8066 25.7467 16.6699C26.61 17.5332 26.61 18.962 25.7467 19.8253L19.049 26.523C18.6323 26.9398 18.0667 27.1779 17.4713 27.1779Z"
      fill={props.color ? props.color : colors.uguPurple}
    />
    <path
      d="M48.7296 45.7527H33.1017C31.8812 45.7527 30.8691 44.7406 30.8691 43.5202C30.8691 42.2997 31.8812 41.2876 33.1017 41.2876H48.7296C49.9501 41.2876 50.9622 42.2997 50.9622 43.5202C50.9622 44.7406 49.9798 45.7527 48.7296 45.7527Z"
      fill={props.color ? props.color : colors.uguPurple}
    />
    <path
      d="M17.4713 48.0152C16.9058 48.0152 16.3402 47.8068 15.8937 47.3603L13.6611 45.1278C12.7979 44.2645 12.7979 42.8357 13.6611 41.9724C14.5244 41.1092 15.9532 41.1092 16.8165 41.9724L17.4713 42.6273L22.5913 37.5073C23.4546 36.644 24.8834 36.644 25.7467 37.5073C26.61 38.3706 26.61 39.7994 25.7467 40.6627L19.049 47.3603C18.6323 47.7771 18.0667 48.0152 17.4713 48.0152Z"
      fill={props.color ? props.color : colors.uguPurple}
    />
    <path
      d="M40.9302 64H23.0698C6.90605 64 0 57.094 0 40.9302V23.0698C0 6.90605 6.90605 0 23.0698 0H40.9302C57.094 0 64 6.90605 64 23.0698V40.9302C64 57.094 57.094 64 40.9302 64ZM23.0698 4.46512C9.34698 4.46512 4.46512 9.34698 4.46512 23.0698V40.9302C4.46512 54.653 9.34698 59.5349 23.0698 59.5349H40.9302C54.653 59.5349 59.5349 54.653 59.5349 40.9302V23.0698C59.5349 9.34698 54.653 4.46512 40.9302 4.46512H23.0698Z"
      fill={props.color ? props.color : colors.uguPurple}
    />
  </svg>
)