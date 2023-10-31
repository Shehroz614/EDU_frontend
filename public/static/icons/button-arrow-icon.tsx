/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

type Props = {
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const SvgWrapper = styled.div<Props>`
  display: flex;
  transform: ${(props) =>
    props.rotate
      ? `rotate(${props.rotate}) translateX(14%)`
      : 'translateX(14%)'};
`

const ButtonArrow: React.FunctionComponent<Props> = (props) => {
  const { width = '100%', height = '100%', rotate, color = '#1A1E3D' } = props

  return (
    <SvgWrapper rotate={rotate}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 4L0 8L0 0L8 4Z"
          css={css`
            fill: ${color};
          `}
        />
      </svg>
    </SvgWrapper>
  )
}

export default ButtonArrow
