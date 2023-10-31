import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const DownloadIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height, rotate } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      transform={rotate ? 'rotate(' + rotate + ')' : ''}
      viewBox="0 0 8 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.98534 4.98919C7.9556 4.9191 7.88619 4.87336 7.80917 4.87336H5.71989V0.187443C5.71989 0.0839776 5.63447 0 5.52922 0H2.47862C2.37337 0 2.28795 0.0839776 2.28795 0.187443V4.87337H0.190667C0.113645 4.87337 0.044238 4.91912 0.0144946 4.98884C-0.0148734 5.05894 0.00114226 5.13954 0.0556777 5.19315L3.8594 8.94489C3.89523 8.98013 3.94367 9 3.99438 9C4.04509 9 4.09353 8.98013 4.12937 8.94526L7.94416 5.19352C7.99869 5.13989 8.01508 5.05931 7.98534 4.98919Z"
        fill="white"
      />
    </svg>
  )
}

export default DownloadIcon
