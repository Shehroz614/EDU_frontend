import { colors } from '@configs/styles/config'
import React, { SVGProps } from 'react'

export const LearnAnywhereIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="58"
    height="58"
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3808_26221)">
      <path
        d="M36.3581 0.000103516C36.2929 -0.00231315 21.7058 -0.00231315 21.6406 0.000103516C15.0286 0.0581035 9.66602 5.45694 9.66602 12.081V45.9144C9.66602 52.5771 15.0866 57.9977 21.7493 57.9977H36.2493C42.9121 57.9977 48.3327 52.5771 48.3327 45.9144V12.0834C48.3327 5.45694 42.9701 0.0605202 36.3581 0.000103516ZM43.4994 45.9144C43.4994 49.9115 40.2465 53.1644 36.2493 53.1644H21.7493C17.7522 53.1644 14.4993 49.9115 14.4993 45.9144V12.0834C14.4993 8.57202 17.0078 5.63819 20.3259 4.9736L22.0031 8.33035C22.4115 9.1496 23.2501 9.66677 24.166 9.66677H33.8327C34.7486 9.66677 35.5848 9.1496 35.9956 8.33035L37.6728 4.9736C40.9908 5.63577 43.4994 8.57202 43.4994 12.0834V45.9144ZM31.416 48.331H26.5827C25.2487 48.331 24.166 47.2484 24.166 45.9144C24.166 44.5804 25.2487 43.4977 26.5827 43.4977H31.416C32.75 43.4977 33.8327 44.5804 33.8327 45.9144C33.8327 47.2484 32.75 48.331 31.416 48.331Z"
        fill={props.color ? props.color : colors.uguPurple}
      />
    </g>
    <defs>
      <clipPath id="clip0_3808_26221">
        <rect width="58" height="58" fill="white" />
      </clipPath>
    </defs>
  </svg>
)