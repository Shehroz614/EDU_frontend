import { colors } from '@configs/styles/config'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const UploadFilledIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, color } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_786_6055)">
        <path
          d="M23.2164 9.23C22.7889 9.14475 22.4388 8.87737 22.258 8.49504C20.2559 4.27 15.615 1.90754 10.9766 2.76262C6.75025 3.53762 3.43712 6.91145 2.73058 11.1597C2.52133 12.414 2.53683 13.6695 2.77321 14.8927C2.85071 15.2918 2.67892 15.7361 2.32629 16.0565C0.847333 17.4011 0 19.3166 0 21.3135C0 25.2299 3.18654 28.4177 7.10417 28.4177H21.3125C26.6548 28.4177 31 24.0725 31 18.7302C31 14.1254 27.7269 10.129 23.2164 9.23ZM19.5313 17.7059C19.2794 17.9578 18.9487 18.0844 18.6181 18.0844C18.2874 18.0844 17.9567 17.9578 17.7049 17.7059L15.5 15.501V21.9594C15.5 22.6737 14.9213 23.251 14.2083 23.251C13.4953 23.251 12.9167 22.6737 12.9167 21.9594V15.501L10.7118 17.7059C10.2067 18.211 9.39042 18.211 8.88537 17.7059C8.38033 17.2009 8.38033 16.3845 8.88537 15.8795L12.3819 12.383C12.8805 11.8844 13.5354 11.6338 14.1902 11.6299L14.2083 11.626L14.2264 11.6299C14.8826 11.6338 15.5362 11.8844 16.0347 12.383L19.5313 15.8795C20.0363 16.3845 20.0363 17.2009 19.5313 17.7059Z"
          fill={color ? color : colors.uguPurple}
        />
      </g>
      <defs>
        <clipPath id="clip0_786_6055">
          <rect width="31" height="31" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default UploadFilledIcon
