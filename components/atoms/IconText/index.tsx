import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { fontFamilies } from '@configs/styles/config'

//Description: This component we use for icon with text

type Props = {
  icon?: ReactNode
  iconWidth?: string
  iconHeight?: string
  text: string
  width?: string
  maxWidth?: string
  opacity?: string //opacity of the Text
  fontSize?: string //font size of the Text
  fontFamily?: string //font family of the Text
  color?: string //color of the Text
  marginBetween?: string //margin between Icon and Text
  textColor?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  lineHeight?: string
  checkmark?: boolean
  alignItems?: string
  disabled?: boolean
}

const IconTextWrapper = styled.div<{
  marginBottom: string
  marginLeft: string
  marginRight: string
  checkmark: boolean
  width: string
  maxWidth: string
  alignItems: string
}>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => (props.alignItems ? props.alignItems : '')};
  width: ${(props) => (props.width ? props.width : '')};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : '')};
  align-items: ${(props) => (props.checkmark ? '' : 'center')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
`

const Icon = styled.div<{
  iconWidth: string
  iconHeight: string
  checkmark: boolean
  disabled: boolean
}>`
  display: flex;
  min-width: ${(props) => (props.iconWidth ? props.iconWidth : '1rem')};
  max-width: ${(props) => (props.iconWidth ? props.iconWidth : '1rem')};
  min-height: ${(props) => (props.iconHeight ? props.iconHeight : '1rem')};
  max-height: ${(props) => (props.iconHeight ? props.iconHeight : '1rem')};
  margin-top: ${(props) => (props.checkmark ? '2px' : '')};
  align-items: center;
  opacity: ${(props) => (props.disabled ? '0.2' : '1')};
`

const Text = styled.text<{
  fontSize: string
  opacity: string
  textColor: string
  marginBetween: string
  lineHeight: string
  fontFamily: string
  color: string
}>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '12px')};
  opacity: ${(props) => (props.opacity ? props.opacity : '0.5')};
  color: ${(props) => (props.textColor ? props.textColor : '#1a1e3d')};
  margin-left: ${(props) =>
    props.marginBetween ? props.marginBetween : '0.4rem'};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '1rem')};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : fontFamilies.light};
  /* width: 90%;
  max-width: 90%; */
  color: ${(props) => (props.color ? props.color : '')};
  word-wrap: break-word;
  width: inherit;
`

const IconTextBlock: React.FunctionComponent<Props> = (props) => {
  const {
    icon,
    text,
    opacity = '',
    fontSize = '',
    marginBetween = '',
    lineHeight = '',
    marginBottom = '',
    marginLeft = '',
    marginRight = '',
    iconHeight = '',
    iconWidth = '',
    textColor = '',
    width = '',
    maxWidth = '',
    checkmark = false,
    alignItems = '',
    fontFamily = '',
    color = '',
    disabled = false,
  } = props
  return (
    <IconTextWrapper
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      checkmark={checkmark}
      width={width}
      maxWidth={maxWidth}
      alignItems={alignItems}
    >
      <Icon
        iconHeight={iconHeight}
        iconWidth={iconWidth}
        disabled={disabled}
        checkmark={checkmark}
      >
        {icon}
      </Icon>
      <Text
        opacity={opacity}
        fontSize={fontSize}
        marginBetween={marginBetween}
        textColor={textColor}
        lineHeight={lineHeight}
        fontFamily={fontFamily}
        color={color}
      >
        {text}
      </Text>
    </IconTextWrapper>
  )
}

export default IconTextBlock
