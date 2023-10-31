import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'
import CheckMarkIcon from 'public/static/icons/checkmark-icon'

type CheckmarkProps = {
  width?: string
  height?: string
  minHeight?: string
  minWidth?: string
  opacity?: number
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  onClick: (value: boolean) => void
  value: boolean
  disabled?: boolean
  borderRadius?: string
}

const RoundedItem = styled.div<{
  width?: string
  height?: string
  minHeight?: string
  minWidth?: string
  marginLeft?: string
  marginRight?: string
  borderRadius?: string
  marginTop: string
  marginBottom: string
  opacity: number
  clicked: boolean
}>`
  display: flex;
  flex-shrink: 0;
  width: ${(props) => (props.width ? props.width : '1.3rem')};
  height: ${(props) => (props.height ? props.height : '1.3rem')};
  border: ${(props) =>
    props.clicked ? '' : '1px solid' + colors.uguPurple}; /*#d8d8d8 */
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '25px'};
  background-color: ${(props) =>
    props.clicked ? colors.uguYellow : 'inherit'};
  align-items: center;
  justify-content: center;
  min-height: ${(props) => (props.minHeight ? props.minHeight : '')};
  min-width: ${(props) => (props.minWidth ? props.minWidth : '')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  opacity: ${(props) => (props.opacity ? props.opacity : 1)};
  cursor: pointer;
`

const Checkbox: React.FC<CheckmarkProps> = (props) => {
  const {
    width = '',
    height = '',
    minHeight = '',
    minWidth = '',
    marginLeft = '',
    marginRight = '',
    marginTop = '',
    marginBottom = '',
    opacity = 1,
    borderRadius = '',
    disabled = false,
    onClick,
    value = false,
  } = props
  //   const [checked, setChecked] = useState(value)
  return (
    <RoundedItem
      onClick={() => {
        // setChecked(!checked)
        !disabled && onClick(!value)
      }}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      opacity={opacity}
      width={width}
      height={height}
      minHeight={minHeight}
      minWidth={minWidth}
      clicked={value}
      borderRadius={borderRadius}
    >
      {value && <CheckMarkIcon width="0.4rem" color="#ffffff" />}
    </RoundedItem>
  )
}
export default Checkbox
