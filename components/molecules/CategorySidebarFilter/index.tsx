import React, { ReactNode, useState } from 'react'
import styled from '@emotion/styled'
import SidebarArrow from '@public/static/icons/sidebar-arrow-icon'
import { colors, fontFamilies } from '@configs/styles/config'

type CategorySidebarFilter = {
  children: ReactNode
  filterName: string
  defaultShow?: boolean
}

const SideBarArrowWrapper = styled.div`
  margin: 0 0.7rem;
`

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.25rem 0.25rem 0.25rem 0rem;
`

const CategoryHeader = styled.div`
  width: 100%;
  font-size: 15px;
  font-family: ${fontFamilies.medium};
  color: ${colors.uguPurple};
  margin: 0.75rem 0.5rem 0.5rem;
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  :hover {
    cursor: pointer;
  }
`

const CategoryContentWrapper = styled.div`
  display: flex;
`

const CategorySidebarFilter: React.FC<CategorySidebarFilter> = (props) => {
  const { children, filterName, defaultShow } = props
  const [show, setShow] = useState<boolean>(defaultShow || false)

  // function to toggle the boolean value
  const toggleShow = () => {
    setShow(!show)
  }
  const getSidebarCategoryIcon = show ? (
    <SidebarArrow width="0.35rem" color="#000" rotate="-90" />
  ) : (
    <SidebarArrow width="0.35rem" color="#000" rotate="90" />
  )

  return (
    <CategoryWrapper>
      <CategoryContainer onClick={toggleShow}>
        <CategoryHeader>{filterName || 'Filter Option'}</CategoryHeader>
        <SideBarArrowWrapper>{getSidebarCategoryIcon}</SideBarArrowWrapper>
      </CategoryContainer>
      <CategoryContentWrapper style={{ display: show ? 'block' : 'none' }}>
        {children}
      </CategoryContentWrapper>
    </CategoryWrapper>
  )
}

export default CategorySidebarFilter
