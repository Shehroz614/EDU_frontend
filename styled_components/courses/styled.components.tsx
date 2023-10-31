import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10rem;
  padding: 1rem 0;
  width: 100%;
  margin-left: 0.5rem;
  flex-direction: column;
  max-width: 1440px;
  z-index: 1;
  background-color: #f8f8f8;
  margin-bottom: 1.5rem;
  &::before {
    content: '';
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 12rem;
    background-color: #f8f8f8;
    position: absolute;
    left: 0;
    z-index: -1;
    @media (min-width: 768px) {
      height: 8rem;
    }
  }
  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 8rem;
    padding: 0;
  }
`
const PageHeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.7rem;
  font-weight: bold;
`
const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;
`

const CategoryContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const FilterCheckboxesWrapper = styled.div`
  font-family: ${fontFamilies.bold};
  display: flex;
  min-width: 16rem;
  width: 16rem;
  border-radius: 1rem;
  padding: 1rem;
  flex-direction: column;
  flex-wrap: wrap;
  border: 1px solid black;
`
const FilterHeader = styled.div`
  width: 100%;
  font-size: 20px;
  color: ${colors.uguPurple};
`

const CategorMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 2rem;
  width: 100%;
`

const FilterHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ClearFilters = styled.div`
  text-decoration: underline;
  font-size: 0.85rem;
  font-family: ${fontFamilies.regular};
  width: 6rem;
  cursor: pointer;
`

export {
  PageHeader,
  PageHeaderTitle,
  FilterButtons,
  CategoryContentWrapper,
  FilterCheckboxesWrapper,
  FilterHeader,
  CategorMainWrapper,
  FilterHeaderWrapper,
  ClearFilters,
}
