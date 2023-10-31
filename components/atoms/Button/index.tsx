import React, { ReactNode } from 'react'
import { ButtonContainer } from './styled.components'

type Props = {
  type?: 'submit' | 'reset' | 'button'
  children?: ReactNode
  text?: string
  width?: string
  height?: string
  minHeight?: string
  backgroundColor?: string | 'cta'
  borderColor?: string
  color?: string
  fontWeight?: string
  fontSize?: string
  fontFamily?: string
  borderRadius?: string
  border?: string
  opacity?: number
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  justifyContent?: string
  padding?: string
  onClick?: () => void
  disabled?: boolean
  style?: React.CSSProperties
}

const Button: React.FunctionComponent<Props> = (props) => {
  const {
    children,
    text,
    backgroundColor = '',
    borderColor = '',
    color = '',
    opacity = 0,
    width = '',
    height = '',
    minHeight = '',
    fontWeight = '',
    fontSize = '',
    fontFamily = '',
    borderRadius = '',
    border = '',
    marginLeft = '',
    marginRight = '',
    marginTop = '',
    marginBottom = '',
    justifyContent = '',
    padding = '',
    disabled = false,
    onClick,
    style,
  } = props

  return (
    <ButtonContainer
      width={width}
      height={height}
      minHeight={minHeight}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      border={border}
      color={color}
      opacity={opacity}
      fontWeight={fontWeight}
      fontSize={fontSize}
      fontFamily={fontFamily}
      borderRadius={borderRadius}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      justifyContent={justifyContent}
      padding={padding}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children ? children : text ? text : ''}
    </ButtonContainer>
  )
}

export default Button
