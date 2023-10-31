import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

type Props = {
  onClick?: () => void
  children: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
  marginLeft?: string
  marginTop?: string
  border?: string
  fontSize?: string
  textColor?: string
  fontWeight?: string
  text?: string
  justifyContent?: string
  alignItems?: string
  textMarginLeft?: string
  iconMarginTop?: string
}

const RoundButtonContainer = styled.button<{
  fontWeight?: string
  height: string
  width: string
  color: string
  marginLeft?: string
  marginTop?: string
  border?: string
  fontSize?: string
  textColor?: string
  justifyContent?: string
  alignItems?: string
}>`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  display: flex;
  height: ${(props) => (props.height ? props.height : '2rem')};
  width: ${(props) => (props.width ? props.width : '2rem')};
  border-radius: 30px;
  border: ${(props) => (props.border ? props.border : '')};
  background: none;
  background-color: ${(props) => (props.color ? props.color : '#eeeeee')};
  padding: 0;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
  align-items: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '')};
  cursor: pointer;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  color: ${(props) => (props.textColor ? props.textColor : '')};
`
const IconWrapper = styled.div<{
  textMarginLeft?: string
  iconMarginTop?: string
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${(props) => (props.textMarginLeft ? props.textMarginLeft : '')};
  margin-top: ${(props) => (props.iconMarginTop ? props.iconMarginTop : '')};
`

const RoundButton: React.FunctionComponent<Props> = (props) => {
  const {
    color = '',
    iconMarginTop = '',
    children,
    width = '',
    height = '',
    onClick,
    marginLeft = '',
    marginTop = '',
    border = '',
    fontSize = '',
    textColor = '',
    fontWeight = '',
    text = '',
    textMarginLeft = '',
    justifyContent = '',
    alignItems = '',
  } = props
  return (
    <RoundButtonContainer
      fontWeight={fontWeight}
      textColor={textColor}
      fontSize={fontSize}
      onClick={onClick}
      color={color}
      width={width}
      height={height}
      marginLeft={marginLeft}
      marginTop={marginTop}
      border={border}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {text}{' '}
      <IconWrapper
        textMarginLeft={textMarginLeft}
        iconMarginTop={iconMarginTop}
      >
        {children}
      </IconWrapper>
    </RoundButtonContainer>
  )
}

export default RoundButton
