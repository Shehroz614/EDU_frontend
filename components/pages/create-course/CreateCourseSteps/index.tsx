import React from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import StepFive from './StepFive'
import { useCreateCourse } from '@contexts/CreateCourse'

const CreateCourseSteps = (): JSX.Element => {
  const { activeStep } = useCreateCourse()
  const steps: { [key: number]: any } = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    4: <StepFour />,
    5: <StepFive />,
  }
  return steps[activeStep]
}

export default CreateCourseSteps
