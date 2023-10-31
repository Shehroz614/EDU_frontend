import { colors, fontFamilies } from '@configs/styles/config'
import styled from '@emotion/styled'

const RatingWrapper = styled.div<{
  marginRight?: string
  marginLeft?: string
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0;
  /* margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')}; */
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
`

const IconsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

const IconWrapper = styled.div<{
  marginRight?: string
  iconWidth: string
}>`
  display: flex;
  position: relative;
  min-width: ${(props) => (props.iconWidth ? props.iconWidth : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
`

const EmptyIconWrapper = styled.div`
  display: flex;
  /* position: absolute; */
`
const FilledIconWrapper = styled.div`
  display: flex;
`

const PercentFilledIconWrapper = styled.div<{ width: number }>`
  display: flex;
  position: absolute;
  width: ${(props) => props.width + '%'};
  z-index: 1;
  overflow-x: hidden;
`

const ReviewsNumber = styled.input<{
  fontSize?: string
}>`
  display: flex;
  color: ${colors.uguPurple};
  font-family: ${fontFamilies.light};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1rem')};
  text-align: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1.1rem;
  outline: none;
  align-items: center;
  border: 1px solid ${colors.uguPurple};
  border-radius: 0.35rem;
  margin-right: 0.5rem;

  -webkit-appearance: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const TextWrapper = styled.div`
  display: flex;
  color: ${colors.uguPurple};
  font-family: ${fontFamilies.light};
  margin-left: 0.25rem;
  font-size: 0.75rem;
`

export {
  RatingWrapper,
  IconWrapper,
  IconsWrapper,
  EmptyIconWrapper,
  FilledIconWrapper,
  PercentFilledIconWrapper,
  ReviewsNumber,
  TextWrapper,
}
