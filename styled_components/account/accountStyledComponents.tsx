import { fontFamilies } from '@configs/styles/config'
import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContentWrapper = styled.div`
  padding-top: 2rem;
  padding-inline: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${20 * 3 + 3}rem;
  gap: 2rem;
`

export const MobileMenuItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1rem;
  flex-shrink: 0;
  width: 100%;
  max-width: 38rem;
  flex-shrink: 2;
`

export const DesktopMenuItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
  gap: 1rem;
  justify-items: start;
  justify-content: center;
`

export const Title = styled.p`
  font-size: 1.5rem;
  font-family: ${fontFamilies.medium};

  line-height: normal;
`
export const FirstGridRow = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`

export const HorizontalFlex = styled.div`
  display: flex;
  flex-direction: row;
  max-width: ${17.5 + 3 + 38}rem;
`

export const Hr = styled.hr`
  width: 100%;
`

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  padding-block: 1rem;
  padding-right: 0.5rem;
`

export const InputLineContainer = styled.div`
  max-width: 16.5rem;
  width: 100%;
  @media (max-width: 950px) {
    max-width: 100%;
  }
`
export const ButtonContainer = styled.div`
  align-self: flex-end;
  margin-left: auto;
`
