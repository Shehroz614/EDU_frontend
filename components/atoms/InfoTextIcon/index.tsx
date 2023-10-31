import React from 'react'
import styled from '@emotion/styled'
import InfoIcon from 'public/static/icons/info-icon'

type InfoTextIcon = {
  marginTop?: string
  style?: React.CSSProperties
}

const IconWrapper = styled.div<{ marginTop?: string }>`
  display: flex;
  height: 1rem;
  width: 1rem;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  border-radius: 16px;
  cursor: pointer;
`

const InfoTextIcon: React.FC<InfoTextIcon> = (props) => {
  const { marginTop = '', style } = props

  return (
    <>
      <IconWrapper marginTop={marginTop} style={style}>
        <InfoIcon />
      </IconWrapper>
    </>
  )
}

export default InfoTextIcon
