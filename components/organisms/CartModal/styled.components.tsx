import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  max-width: 37rem;
  width: 100%;
  overflow: scroll;
  border-radius: 18px;
  padding-bottom: 1rem;
  margin-top: 1.5rem;

  ::-webkit-scrollbar {
    display: none;
  }
`
const CartInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 4rem;
  @media (max-width: 520px) {
    padding: 0rem 0.8rem;
  }
`
const AdditionalText = styled.div`
  display: flex;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const VerticalTotalCoursesWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const VerticalCoursesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0.5rem 0 0;
`
const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-right: 1rem;
  margin-left: auto;
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const RemoveButton = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 9px;
  border-radius: 50%;
  padding: 8px;
  background-color: ${colors.uguLightLightGrey};
`

export {
  ContentContainer,
  CartInfoWrapper,
  AdditionalText,
  VerticalTotalCoursesWrapper,
  VerticalCoursesWrapper,
  ButtonWrapper,
  PriceWrapper,
  CartContainer,
  RemoveButton,
}
