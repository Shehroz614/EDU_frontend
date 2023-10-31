import React from 'react'
import styled from '@emotion/styled'
import RoundButton from '../../atoms/RoundButton'
import ButtonArrow from '../../../public/static/icons/button-arrow-icon'

const BlockSectionTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
  justify-content: space-between;
  align-items: center;
`

const TitleWrapper = styled.section`
  font-weight: bold;
  font-size: 1.5rem;
  align-self: flex-start;
`

const RoundButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 6%;
  justify-content: space-between;
`

const BlockSectionTitle: React.FC<{
  children: React.ReactNode
  navigationButtons: boolean
}> = ({ children, navigationButtons = true }) => {
  return (
    <BlockSectionTitleWrapper>
      <TitleWrapper>{children}</TitleWrapper>
      {navigationButtons && (
        <RoundButtonsWrapper>
          <RoundButton onClick={() => {}}>
            <ButtonArrow width="20%" rotate="180" />
          </RoundButton>
          <RoundButton onClick={() => {}}>
            <ButtonArrow width="20%" />
          </RoundButton>
        </RoundButtonsWrapper>
      )}
    </BlockSectionTitleWrapper>
  )
}

export default BlockSectionTitle
