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
        d="M32 16C32 24.836 24.836 32 16 32C7.164 32 0 24.836 0 16C0 7.164 7.164 0 16 0C24.836 0 32 7.164 32 16Z"
        fill="url(#paint0_linear_0_1)"
      />
      <path
        d="M6.21284 15.4481C11.7518 13.0088 18.9193 10.0349 19.909 9.62322C22.5042 8.54597 23.3006 8.75222 22.9036 11.1383C22.6183 12.8534 21.7958 18.5307 21.1396 22.0646C20.7506 24.1604 19.8773 24.4087 18.5048 23.502C17.8448 23.0657 14.5126 20.8597 13.7892 20.3417C13.1291 19.8697 12.2186 19.3017 13.3605 18.1832C13.767 17.785 16.4303 15.2387 18.5056 13.2571C18.7774 12.9969 18.4359 12.5694 18.1221 12.778C15.3249 14.635 11.4468 17.2123 10.9531 17.5478C10.2074 18.0547 9.49108 18.2872 8.20577 17.9175C7.23427 17.6383 6.28574 17.3051 5.91647 17.1782C4.49408 16.6895 4.83165 16.0565 6.21284 15.4481Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_1"
          x1="4.6864"
          y1="4.6864"
          x2="27.3136"
          y2="27.3136"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#33BEF0" />
          <stop offset="1" stop-color="#0A85D9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default LinkIcon
