import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
`
const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.uguLightLightGrey};
  border-radius: 2rem;
  padding: 3rem 4rem;
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const RequirementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
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
const PresentationalVideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & + & {
    margin-top: 1rem;
  }
`
const TextField = styled.div`
  display: flex;
  color: ${colors.uguPurple};
  opacity: 0.5;
  font-family: 'Roboto-Light';
  font-size: 0.875rem;
`
const VideoSectionWrapper = styled.div`
  display: flex;
  margin-left: 4.4rem;
`
const InputBlock = styled.div`
  margin-bottom: 2rem;
`

export {
  StepContainer,
  StepWrapper,
  ButtonsWrapper,
  RequirementsWrapper,
  TextFieldWrapper,
  InfoWrapper,
  PresentationalVideoWrapper,
  TextField,
  VideoSectionWrapper,
  InputBlock,
}
