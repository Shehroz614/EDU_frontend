import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'

const AddKeywordsBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  border-radius: 15px;
  padding: 2rem;
`
const TitleWrapper = styled.div`
  display: flex;
  color: ${colors.uguPurple};
  opacity: 1;
  font-family: ${fontFamilies.light};
  font-size: 0.875rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`

const AddKeywordWrapper = styled.div`
  display: flex;
`
const ExistingKeywordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  width: 100%;
`
const KeywordWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #efefef;
  height: 3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-radius: 28px;
  padding: 0.5rem 1.5rem;
`
const KeywordText = styled.text`
  display: flex;
  color: ${colors.uguPurple};
  opacity: 0.5;
  align-items: center;
`
const SideButton = styled.div`
  display: flex;
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 1rem;
  cursor: pointer;
`

export {
  AddKeywordsBlockWrapper,
  AddKeywordWrapper,
  ExistingKeywordsWrapper,
  KeywordWrapper,
  KeywordText,
  SideButton,
  TitleWrapper,
}
