import React from 'react'
import styled from '@emotion/styled'
import { BorderRadius } from '../../../configs/styles/config'

const IconRoot = styled.div`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: ${BorderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.checkboxBg};
  flex-shrink: 0;
  user-select: none;
  color: ${(props) => props.theme.colors.darkGreyText};
`

function ExclamationIcon() {
  return <IconRoot>!</IconRoot>
}

export default ExclamationIcon
