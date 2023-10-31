import React from 'react'
import styled from '@emotion/styled'

type Props = {
  opacity?: string
  color?: string
  width?: string
  height?: string
}

const SeparatorLineWrapper = styled.span<{
  width?: string
  opacity?: string
  color?: string
  height?: string
}>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '1px')};
  opacity: ${(props) => (props.opacity ? props.opacity : '1')};
  background-color: ${(props) =>
    props.color ? props.color : 'rgba(255, 255, 255, 0.13)'};
  margin: auto;
`

const SeparatorLine: React.FunctionComponent<Props> = (props) => {
  const { opacity = '', width = '', height = '', color = '' } = props
  return (
    <SeparatorLineWrapper
      width={width}
      height={height}
      color={color}
      opacity={opacity}
    ></SeparatorLineWrapper>
  )
}

export default SeparatorLine
