import { colors } from '@configs/styles/config'
import React, { SVGProps } from 'react'

export const TiersBenefitIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="62"
    height="62"
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M30.5 3C26.5813 3 23.375 6.20625 23.375 10.125V52.875C23.375 56.7937 26.5813 60 30.5 60C34.4187 60 37.625 56.7937 37.625 52.875V10.125C37.625 6.20625 34.4187 3 30.5 3ZM32.875 52.875C32.875 54.1813 31.8063 55.25 30.5 55.25C29.1937 55.25 28.125 54.1813 28.125 52.875V10.125C28.125 8.81875 29.1937 7.75 30.5 7.75C31.8063 7.75 32.875 8.81875 32.875 10.125V52.875ZM51.875 17.25C47.9563 17.25 44.75 20.4563 44.75 24.375V52.875C44.75 56.7937 47.9563 60 51.875 60C55.7937 60 59 56.7937 59 52.875V24.375C59 20.4563 55.7937 17.25 51.875 17.25ZM54.25 52.875C54.25 54.1813 53.1813 55.25 51.875 55.25C50.5687 55.25 49.5 54.1813 49.5 52.875V24.375C49.5 23.0687 50.5687 22 51.875 22C53.1813 22 54.25 23.0687 54.25 24.375V52.875ZM9.125 31.5C5.20625 31.5 2 34.7063 2 38.625V52.875C2 56.7937 5.20625 60 9.125 60C13.0437 60 16.25 56.7937 16.25 52.875V38.625C16.25 34.7063 13.0437 31.5 9.125 31.5ZM11.5 52.875C11.5 54.1813 10.4313 55.25 9.125 55.25C7.81875 55.25 6.75 54.1813 6.75 52.875V38.625C6.75 37.3187 7.81875 36.25 9.125 36.25C10.4313 36.25 11.5 37.3187 11.5 38.625V52.875Z"
      fill={props.color ? props.color : colors.uguPurple}
    />
  </svg>
)