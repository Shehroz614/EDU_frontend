import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`
const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: flex-end;
`
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.uguLightLightGrey};
  border-radius: 27px;
  padding: 2rem 3rem;
`

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2rem 1.5rem 2rem 2rem;
  border: 1px solid #e4e4e4;
  border-radius: 15px;
`

const GeneralWrapper = styled.div`
  width: 50%;
`

const LevelSelectorsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const CouponWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  column-gap: 2rem;
  margin-bottom: 2rem;
`

const SetPriceInputHeader = styled.div`
  font-size: 0.95rem;
  margin-top: -1rem;
`

const InputBlock = styled.div`
  margin-bottom: 2rem;
`
const TextFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`
const InfoWrapper = styled.div<{
  marginTop?: string
  marginLeft?: string
}>`
  display: flex;
  margin-left: 0.8rem;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
`

export {
  StepContainer,
  ButtonsWrapper,
  MainWrapper,
  InputWrapper,
  GeneralWrapper,
  LevelSelectorsWrapper,
  CouponWrapper,
  SetPriceInputHeader,
  InputBlock,
  TextFieldWrapper,
  InfoWrapper,
}
