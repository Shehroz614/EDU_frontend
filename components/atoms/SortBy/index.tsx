import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import SidebarArrow from '@public/static/icons/sidebar-arrow-icon'
import { colors, fontFamilies } from '@configs/styles/config'
//import { useSearchContext } from '@contexts/Search'
import { difference } from '@helpers/difference'
import { isEmpty } from 'lodash'

type CategorySortBy = {
  defaultShow?: boolean
  sort: Object
  setSort: Function
}

const SideBarArrowWrapper = styled.div`
  margin: 0 0.7rem;
`

const SortByWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem -2rem 0;
  width: 14rem;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 0.75rem;
  padding: 0 0.5rem 0 0.5rem;
  position: absolute;
  z-index: 1;
`

const CategoryHeader = styled.div`
  width: 100%;
  font-size: 15px;
  font-family: ${fontFamilies.medium};
  color: ${colors.uguPurple};
  margin: 0.75rem 0.5rem 0.5rem;
  display: flex;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  :hover {
    cursor: pointer;
  }
`

const SortByContentWrapper = styled.div`
  font-family: ${fontFamilies.light};
  font-size: 15px;
  color: ${colors.uguPurple};
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem 1.25rem 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #d9d9d9;
`

const CategorySortByButton = styled.div<{ isSelected: boolean }>`
  margin: 0.25rem 0;
  font-family: ${(props) =>
    props.isSelected ? fontFamilies.medium : fontFamilies.light};
  :hover {
    cursor: pointer;
  }
`
const CategorySelection = styled.div`
  font-family: ${fontFamilies.light};
  margin-left: 7px;
`

const CategorySortBy: React.FC<CategorySortBy> = (props) => {
  const { defaultShow, sort, setSort } = props
  const [show, setShow] = useState<boolean>(defaultShow || false)
  const [selectedSortBy, setSelectedSortBy] = useState<string>('Most Popular')

  const toggleShow = () => {
    setShow(!show)
  }

  const handleSortByButtonClick = (sortBy: string) => {
    setSelectedSortBy(sortBy)
    setShow(false)
  }

  const getSidebarCategoryIcon = show ? (
    <SidebarArrow width="0.35rem" color="#000" rotate="-90" />
  ) : (
    <SidebarArrow width="0.35rem" color="#000" rotate="90" />
  )

  //const { state, dispatch } = useSearchContext();

  useEffect(() => {
    console.log('sort diff', difference(sort, { 'meta.price': 1 }), sort, {
      'meta.price': 1,
    })
    if (isEmpty(difference(sort, { rating: 1 }))) {
      setSelectedSortBy('Most Popular')
    } else if (isEmpty(difference(sort, { 'meta.price': 1 }))) {
      setSelectedSortBy('Price')
    } else if (isEmpty(difference(sort, { 'meta.totalTime': 1 }))) {
      setSelectedSortBy('Duration')
    } else if (isEmpty(difference(sort, { 'meta.meta.totalLectures': 1 }))) {
      setSelectedSortBy('Lectures QTY')
    }
  }, [sort])

  return (
    <SortByWrapper>
      <HeaderContainer onClick={toggleShow}>
        <CategoryHeader>
          <>Sort: </>
          <CategorySelection>
            {selectedSortBy || 'Select an option'}
          </CategorySelection>
        </CategoryHeader>

        <SideBarArrowWrapper>{getSidebarCategoryIcon}</SideBarArrowWrapper>
      </HeaderContainer>
      {show && (
        <SortByContentWrapper>
          <CategorySortByButton
            onClick={() => {
              handleSortByButtonClick('Most Popular')
              setSort({ rating: 1 })
            }}
            isSelected={selectedSortBy === 'Most Popular'}
          >
            Most Popular
          </CategorySortByButton>
          <CategorySortByButton
            onClick={() => {
              handleSortByButtonClick('Price')
              setSort({ 'meta.price': 1 })
            }}
            isSelected={selectedSortBy === 'Price'}
          >
            Price
          </CategorySortByButton>
          <CategorySortByButton
            onClick={() => {
              handleSortByButtonClick('Duration')
              setSort({ 'meta.totalTime': 1 })
            }}
            isSelected={selectedSortBy === 'Duration'}
          >
            Duration
          </CategorySortByButton>
          <CategorySortByButton
            onClick={() => {
              handleSortByButtonClick('Lectures QTY')
              setSort({ 'meta.meta.totalLectures': 1 })
            }}
            isSelected={selectedSortBy === 'Lectures QTY'}
          >
            Lectures QTY
          </CategorySortByButton>
        </SortByContentWrapper>
      )}
    </SortByWrapper>
  )
}

export default CategorySortBy
