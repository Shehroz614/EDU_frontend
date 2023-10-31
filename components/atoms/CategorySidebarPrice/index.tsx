import React from 'react'
import styled from '@emotion/styled'
import { fontFamilies } from '@configs/styles/config'
import RangeSlider from '@components/atoms/PriceSlider'
//import { ShortCourse } from '@type/course';

const CategoryContainer = styled.label`
  font-family: ${fontFamilies.light};
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`

const CategorySidebarPrice = (props: {
  changePrice: Function
  limits: { min: number; max: number }
  price: { min: number; max: number }
}) => {
  const { changePrice, limits, price } = props

  return (
    <CategoryContainer>
      <RangeSlider changePrice={changePrice} limits={limits} price={price} />
    </CategoryContainer>
  )
}

export default CategorySidebarPrice
