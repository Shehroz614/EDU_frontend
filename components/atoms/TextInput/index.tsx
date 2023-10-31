import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from 'configs/styles/config'

type TextInputProps = {
  name?: string
  text?: string
  width?: string
  height?: string
  backgroundColor?: string
  borderColor?: string
  color?: string
  fontWeight?: string
  fontSize?: string
  fontFamily?: string
  borderRadius?: string
  border?: string
  opacity?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  justifyContent?: string
  padding?: string
  placeholder?: string
  paddingBottom?: string
  icon?: ReactNode
  multiLine?: boolean
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  defaultValue?: string
  value: string
  inputMode?:
    | 'search'
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | undefined
  maxLength?: number
  textAlign?:
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent'
  inputWidth?: string
  disabled?: boolean
}

const RowWrapper = styled.div<{
  justifyContent?: string
  alignItems?: string
  width?: string
  height?: string
  marginLeft?: string
  marginRight?: string
  borderRadius?: string
  backgroundColor?: string
  border?: string
  borderColor?: string
  opacity?: string
  padding?: string
  marginTop?: string
  marginBottom?: string
  paddingBottom?: string
  disabled?: boolean
}>`
  background-color: ${(props) =>
    props.disabled
      ? colors.uguLightLightGrey
      : props.backgroundColor
      ? props.backgroundColor
      : 'none'};
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'space-between'};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '10rem')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '40px'};
  border: ${(props) =>
    props.border
      ? props.border
      : '1px solid ' + props.borderColor
      ? props.borderColor
      : 'none'};
  padding: ${(props) => (props.padding ? props.padding : '')};
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : ''};
  :hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'auto')};
  }
`

const InputContainer = styled.input<{
  fontWeight?: string
  fontSize?: string
  fontFamily?: string
  color?: string
  textAlign?: string
  inputWidth?: string
  disabled?: boolean
}>`
  display: flex;
  width: ${(props) => (props.inputWidth ? props.inputWidth : 'inherit')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '0.875rem')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  color: ${(props) =>
    props.disabled
      ? colors.uguLightGrey
      : props.color
      ? props.color
      : colors.uguPurple};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : fontFamilies.regular};
  border: none;
  text-align: ${(props) => (props.textAlign ? props.textAlign : '')};
  background-color: inherit;
  cursor: inherit;
  &::placeholder {
    color: ${(props) =>
      props.disabled ? colors.uguLightGrey : colors.uguDarkGrey};
  }
`

const IconWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  height: 1rem;
  width: 1rem;
  margin-left: 0.2rem;
  opacity: ${(props) => (props.disabled ? '0.2' : '1')};
`

const CharLength = styled.div<{
  maximumReached: boolean
}>`
  display: flex;
  color: ${(props) =>
    props.maximumReached ? colors.uguRed : colors.uguPurple};
  font-size: 0.75rem;
  font-family: 'RobotoRegular', serif;
`

const TextInput: React.FunctionComponent<TextInputProps> = (props) => {
  const {
    name,
    backgroundColor = '',
    borderColor = '',
    color = '',
    opacity = '',
    width = '',
    height = '',
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
    placeholder = '',
    paddingBottom = '',
    onChange,
    icon = '',
    onKeyDown,
    defaultValue = '',
    value = '',
    inputMode,
    maxLength,
    textAlign = '',
    inputWidth = '',
    disabled = false,
  } = props

  return (
    <RowWrapper
      paddingBottom={paddingBottom}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      border={border}
      opacity={opacity}
      borderRadius={borderRadius}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      justifyContent={justifyContent}
      padding={padding}
      disabled={disabled}
    >
      <InputContainer
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue && defaultValue}
        value={value && value}
        color={color}
        fontWeight={fontWeight}
        fontSize={fontSize}
        fontFamily={fontFamily}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputMode={inputMode}
        maxLength={maxLength}
        textAlign={textAlign}
        inputWidth={inputWidth}
        disabled={disabled}
      />
      {maxLength && maxLength - value.length < 5 ? (
        <CharLength maximumReached={!(value.length < maxLength)}>
          {value.length + '/' + maxLength}
        </CharLength>
      ) : (
        ''
      )}
      {icon && <IconWrapper disabled={disabled}>{icon}</IconWrapper>}
    </RowWrapper>
  )
}

export default TextInput
