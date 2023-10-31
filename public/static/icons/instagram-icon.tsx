import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const LinkIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : '100%'}
      height={height ? height : '100%'}
    >
      <path
        d="M24.8997 31.9831L7.13135 32C3.2223 32.0035 0.0213251 28.8088 0.016883 24.8997L2.96183e-06 7.13135C-0.00355072 3.2223 3.19121 0.0213251 7.10025 0.016883L24.8686 2.96183e-06C28.7777 -0.00355072 31.9787 3.19121 31.9831 7.10026L32 24.8687C32.0044 28.7786 28.8088 31.9796 24.8997 31.9831Z"
        fill="url(#paint0_radial_0_1)"
      />
      <path
        d="M24.8997 31.9831L7.13135 32C3.2223 32.0035 0.0213251 28.8088 0.016883 24.8997L2.96183e-06 7.13135C-0.00355072 3.2223 3.19121 0.0213251 7.10025 0.016883L24.8686 2.96183e-06C28.7777 -0.00355072 31.9787 3.19121 31.9831 7.10026L32 24.8687C32.0044 28.7786 28.8088 31.9796 24.8997 31.9831Z"
        fill="url(#paint1_radial_0_1)"
      />
      <path
        d="M16 22C12.6923 22 10 19.3086 10 16C10 12.6914 12.6923 10 16 10C19.3077 10 22 12.6914 22 16C22 19.3086 19.3077 22 16 22ZM16 11.7143C13.6369 11.7143 11.7143 13.6369 11.7143 16C11.7143 18.3631 13.6369 20.2857 16 20.2857C18.3631 20.2857 20.2857 18.3631 20.2857 16C20.2857 13.6369 18.3631 11.7143 16 11.7143Z"
        fill="white"
      />
      <path
        d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z"
        fill="white"
      />
      <path
        d="M21.5385 28H10.4615C6.89938 28 4 25.1015 4 21.5385V10.4615C4 6.89846 6.89938 4 10.4615 4H21.5385C25.1006 4 28 6.89846 28 10.4615V21.5385C28 25.1015 25.1006 28 21.5385 28ZM10.4615 5.84615C7.91662 5.84615 5.84615 7.91662 5.84615 10.4615V21.5385C5.84615 24.0834 7.91662 26.1538 10.4615 26.1538H21.5385C24.0834 26.1538 26.1538 24.0834 26.1538 21.5385V10.4615C26.1538 7.91662 24.0834 5.84615 21.5385 5.84615H10.4615Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_0_1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11.8959 32.0231) scale(39.8892 39.8892)"
        >
          <stop stop-color="#FFDD55" />
          <stop offset="0.328" stop-color="#FF543F" />
          <stop offset="0.348" stop-color="#FC5245" />
          <stop offset="0.504" stop-color="#E64771" />
          <stop offset="0.643" stop-color="#D53E91" />
          <stop offset="0.761" stop-color="#CC39A4" />
          <stop offset="0.841" stop-color="#C837AB" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_0_1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(5.14928 -0.399517) scale(26.4865 17.6479)"
        >
          <stop stop-color="#4168C9" />
          <stop offset="0.999" stop-color="#4168C9" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default LinkIcon
