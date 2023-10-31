import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const NoteTextIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 13 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5556 17C12.3522 17 13 16.3646 13 15.5833V3.54167C13 2.76038 12.3522 2.125 11.5556 2.125H8.66667C8.66667 0.953063 7.69492 0 6.5 0C5.30508 0 4.33333 0.953063 4.33333 2.125H1.44444C0.647833 2.125 0 2.76038 0 3.54167V15.5833C0 16.3646 0.647833 17 1.44444 17H11.5556ZM5.77778 2.125C5.77778 1.73435 6.10169 1.41667 6.5 1.41667C6.89831 1.41667 7.22222 1.73435 7.22222 2.125V2.83333C7.22222 3.22433 7.54578 3.54167 7.94444 3.54167H8.66667V4.95833H4.33333V3.54167H5.05556C5.45422 3.54167 5.77778 3.22433 5.77778 2.83333V2.125ZM2.88889 3.54167H1.44444V15.5833H11.5556V3.54167H10.1111V4.95833C10.1111 5.73962 9.46328 6.375 8.66667 6.375H4.33333C3.53672 6.375 2.88889 5.73962 2.88889 4.95833V3.54167Z"
        fill="black"
      />
    </svg>
  )
}

export default NoteTextIcon
