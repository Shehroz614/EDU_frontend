import { colors } from '@configs/styles/config'
import React, { SVGProps } from 'react'

export const AIIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="58%"
    height="58%"
    viewBox="0 0 141 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M43.5234 84.0362L55.4429 52.7403C55.6865 52.145 56.5294 52.1439 56.7742 52.7389L68.5853 84.0362"
      stroke={props.color ? props.color : colors.uguPurple}
      strokeWidth="8"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47.2412 76.2422H64.9285"
      stroke={props.color ? props.color : colors.uguPurple}
      strokeWidth="8"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M84.3994 51.8237V83.5666"
      stroke={props.color ? props.color : colors.uguPurple}
      strokeWidth="8"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M127.908 87.7184C135.121 65.7979 130.015 40.7101 112.583 23.2779C87.9217 -1.383 47.9388 -1.383 23.2779 23.2779C-1.383 47.9388 -1.383 87.9217 23.2779 112.583C47.9388 137.243 87.9217 137.243 112.583 112.583C112.718 112.448 112.848 112.309 112.982 112.173L137.054 136.218"
      stroke={props.color ? props.color : colors.uguPurple}
      strokeWidth="8"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
