import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const LanguageSelectorWrapper = styled.div`
  width: 26.35rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
`
const LanguageSelectorInputContainer = styled.div`
  width: 26.35rem;
  height: 3rem;
  display: flex;
`
const LanguageSelectorInputWrapper = styled.div`
  width: 26.35rem;
  height: 3rem;
`
const ExistingItemsWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
`
const ExistingItem = styled.div`
  background: ${colors.uguLightLightGrey};
  display: flex;
  align-items: center;
  height: 3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-radius: 28px;
  padding: 0.5rem 1.5rem;
`
const ExistingItemText = styled.div`
  color: ${colors.uguPurple};
  opacity: 0.5;
`
const SideButton = styled.div`
  display: flex;
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 1rem;
  cursor: pointer;
`

export {
  LanguageSelectorWrapper,
  LanguageSelectorInputContainer,
  LanguageSelectorInputWrapper,
  ExistingItemsWrapper,
  ExistingItem,
  ExistingItemText,
  SideButton,
}
