import React from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from 'configs/styles/config'
import { CourseSteps } from '@constants/createCourseSteps'

type StepperProps = {
  activeStep: number
  setStep: (step: number) => void
}

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const CirclesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 2.5rem;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
`
const CircleDiv = styled.div<{ last?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: ${(props) => (props.last ? '1rem' : '7rem')};
`
const RoundItemWithColor = styled.div<{ active?: boolean; completed: boolean }>`
  display: flex;
  min-width: 1.8rem;
  height: 1.8rem;
  border: 4px solid ${(props) => (props.active ? colors.uguBlue : '#D8D8D8')};
  border-radius: 16px;
  background-color: ${(props) =>
    props.completed ? colors.uguBlue : '#f8f8f8'};
  align-items: center;
  justify-content: center;
`
const LineItem = styled.div<{ active?: boolean }>`
  display: flex;
  width: 100%;
  height: 1px;
  border: 2px solid ${(props) => (props.active ? colors.uguBlue : '#D8D8D8')};
  border-radius: 10px;
`
const ItemTitle = styled.div<{ last?: boolean; active?: boolean }>`
  display: flex;
  font-size: 0.8rem;
  /* color: ${(props) => (props.active ? colors.uguPurple : '#D8D8D8')}; */
  color: ${(props) => (props.active ? colors.uguPurple : '#a0a0a0')};
  /* margin-right: ${(props) => (props.last ? '' : '5.5rem')}; */
  width: 7rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-family: ${fontFamilies.bold};
  justify-content: center;
`

const StepItems: React.FunctionComponent<StepperProps> = (props) => {
  const stepsAmount = 5
  const { activeStep = 0, setStep } = props

  const proceedToStep = (step: number) => {
    if (0 <= step && step < 5) {
      setStep(step + 1)
    } else {
      return
    }
  }

  const getCircles = () => {
    return [...Array(stepsAmount)].map((_, index) => {
      return (
        <CircleDiv
          key={'circleItem' + index}
          onClick={() => proceedToStep(index)}
          last={index === stepsAmount - 1}
        >
          <RoundItemWithColor
            active={index < activeStep}
            completed={false} // completed={StepsCompleted[index]}
          >
            {/* {StepsCompleted[index] && <CheckMarkIcon width="0.6rem" />} */}
          </RoundItemWithColor>
          {index != stepsAmount - 1 && (
            <LineItem active={index < activeStep - 1} />
          )}
        </CircleDiv>
      )
    })
  }

  const getText = () => {
    return [...Array(stepsAmount)].map((_, index) => {
      return (
        <ItemTitle
          key={'stepTitle' + index}
          last={index === stepsAmount - 1}
          onClick={() => proceedToStep(index)}
          active={index < activeStep}
        >
          {CourseSteps[index].label}
        </ItemTitle>
      )
    })
  }

  return (
    <ItemsWrapper>
      <CirclesWrapper>{getCircles()}</CirclesWrapper>
      <TextWrapper>{getText()}</TextWrapper>
    </ItemsWrapper>
  )
}

export default StepItems
