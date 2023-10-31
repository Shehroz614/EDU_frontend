import React, { ReactNode, Ref } from 'react'
import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'

type TextAreaProps = {
  ref?: Ref<HTMLDivElement>
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
  defaultValue?: string
  value: string
  onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  maxLength?: number
  alwaysShowMaxLength?: boolean //display how many char left always(in some cases will provide better UX)
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
}>`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'none'};
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'space-between'};
  align-items: ${(props) => (props.alignItems ? props.alignItems : '')};
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
`

const InputContainer = styled.textarea<{
  fontWeight?: string
  fontSize?: string
  fontFamily?: string
  color?: string
}>`
  display: flex;
  width: inherit;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '0.875rem')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  color: ${(props) => (props.color ? props.color : '#1A1E3D')};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : 'RobotoRegular'};
  border: none;
  resize: none;
`
const IconWrapper = styled.div`
  display: flex;
  height: 0.85rem;
  width: 0.85rem;
`

const CharLength = styled.div<{
  maximumReached: boolean
}>`
  display: flex;
  color: ${(props) =>
    props.maximumReached ? colors.uguRed : colors.uguPurple};
  font-size: 0.75rem;
  font-family: 'RobotoRegular';
`

const TextArea: React.FunctionComponent<TextAreaProps> = (props) => {
  const {
    ref,
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
    maxLength,
    alwaysShowMaxLength,
    disabled = false,
  } = props

  return (
    <RowWrapper
      ref={ref}
      paddingBottom={paddingBottom}
      width={width}
      height={height}
      backgroundColor={disabled ? '#eee' : backgroundColor}
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
    >
      <InputContainer
        ref={ref}
        placeholder={placeholder}
        color={color}
        fontWeight={fontWeight}
        fontSize={fontSize}
        fontFamily={fontFamily}
        onChange={onChange}
        onKeyDown={onKeyDown}
        defaultValue={defaultValue}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
      />
      {maxLength && (maxLength - value.length < 5 || alwaysShowMaxLength) ? (
        <CharLength maximumReached={!(value.length < maxLength)}>
          {value.length + '/' + maxLength}
        </CharLength>
      ) : (
        ''
      )}
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </RowWrapper>
  )
}

export default TextArea
