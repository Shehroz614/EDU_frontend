import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

type Props = {
  icon: ReactNode
  text: string
}

const DropdownEmptyRowWrapper = styled.div`
  display: flex;
`

export const ImageContainer = styled.div`
  display: flex;
  border-radius: 30px;
  min-width: 3rem;
  max-width: 3rem;
  height: 3rem;
  background-color: #f2f2f2;
  align-items: center;
  justify-content: center;
`

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  opacity: 0.5;
  text-align: left;
`

const CategoriesDropdownRow: React.FunctionComponent<Props> = (props) => {
  const { icon, text } = props
  return (
    <DropdownEmptyRowWrapper>
      <ImageContainer>{icon}</ImageContainer>
      <TextContainer>{text}</TextContainer>
    </DropdownEmptyRowWrapper>
  )
}

export default CategoriesDropdownRow
