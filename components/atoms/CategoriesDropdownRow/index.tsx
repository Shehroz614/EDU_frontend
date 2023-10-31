import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'
import { Category } from '@type/main'

type CategoriesDropdownRowProps = {
  categoryName: Category['name']
  onMouseEnter: Function
  onClick: Function
}

const CategoriesDropdownRowWrapper = styled.div<{
  active: boolean
}>`
  display: flex;
  padding: 0.5rem;
  color: ${(props) => (props.active ? colors.uguBlue : colors.uguPurple)};
  font-size: 0.875rem;
  cursor: pointer;
  white-space: nowrap;
`

const CategoriesDropdownRow: React.FunctionComponent<
  CategoriesDropdownRowProps
> = (props) => {
  const { categoryName, onMouseEnter, onClick } = props
  const [active, setActive] = useState(false)

  return (
    <CategoriesDropdownRowWrapper
      active={active}
      onMouseEnter={() => {
        onMouseEnter()
        setActive(true)
      }}
      onMouseLeave={() => setActive(false)}
      onClick={() => onClick()}
    >
      {categoryName.en}
    </CategoriesDropdownRowWrapper>
  )
}

export default CategoriesDropdownRow
