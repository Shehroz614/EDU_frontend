import React from 'react'
import styled from '@emotion/styled'
import DarkCloseIcon from '../../../public/static/icons/close-icon-dark'

type Props = {
  height?: string
  width?: string
  promoText: string
  discount: number
  opacity?: string //opacity of the Text
  fontSize?: string //font size of the Text
  textColor?: string
  marginLeft?: string
}

const PromocodeWrapper = styled.div<{
  iconHeight: string
  width: string
  opacity: string
  textColor: string
  fontSize: string
  marginLeft: string
}>`
  display: flex;
  flex-direction: row;
  height: ${(props) => (props.iconHeight ? props.iconHeight : '2rem')};
  width: ${(props) => (props.width ? props.width : '')};
  align-items: center;
  opacity: ${(props) => (props.opacity ? props.opacity : '1')};
  color: ${(props) => (props.textColor ? props.textColor : '#1a1e3d')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '12px')};
  padding: 0 1rem 0 1rem;
  border-radius: 30px;
  box-sizing: border-box;
  border: 1px solid #1a1e3d;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0')};
  margin-right: 1rem;
  margin-top: 0.5rem;
`

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 0.7rem;
  height: 0.6rem;
  margin-left: 0.5rem;
  padding: 0 1px;
`

const PromocodeText = styled.div``

const PromocodeDiscount = styled.div`
  margin: 0 0.5rem;
`

const Promocode: React.FunctionComponent<Props> = (props) => {
  const {
    promoText,
    discount,
    opacity = '',
    fontSize = '',
    height = '',
    width = '',
    textColor = '',
    marginLeft = '',
  } = props
  return (
    <PromocodeWrapper
      iconHeight={height}
      width={width}
      textColor={textColor}
      opacity={opacity}
      fontSize={fontSize}
      marginLeft={marginLeft}
    >
      <PromocodeText>{promoText}</PromocodeText>
      <PromocodeDiscount>{'-' + discount + '%'}</PromocodeDiscount>
      <Icon>
        <DarkCloseIcon></DarkCloseIcon>
      </Icon>
    </PromocodeWrapper>
  )
}

export default Promocode
