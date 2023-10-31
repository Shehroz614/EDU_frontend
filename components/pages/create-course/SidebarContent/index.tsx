import React from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { CourseSteps } from '@constants/createCourseSteps'
import { colors } from '@configs/styles/config'
import { useCreateCourse } from '@contexts/CreateCourse'
import {
  SidebarContentWrapper,
  StepsContainer,
  StepButton,
  StepButtonBG,
  ButtonIcon,
  ButtonText,
} from '@styled_components/SidebarContent/styled.components'
import CourseStatus from '../CourseStatus'

type SidebarContentProps = {
  isSidebarClosed: boolean
  isSidebarExpanded: boolean
}
const SidebarContent = ({
  //@ts-ignore
  isSidebarClosed,
  isSidebarExpanded,
}: SidebarContentProps): JSX.Element => {
  const { courseLoaded, activeStep, setActiveStep } = useCreateCourse()

  return (
    <SidebarContentWrapper isSmall={!isSidebarExpanded}>
      <AnimateSharedLayout>
        {!isSidebarExpanded && <CourseStatus isSmall={!isSidebarExpanded} />}
        <StepsContainer>
          {CourseSteps.map((step, index) => (
            <StepButton
              onClick={() => setActiveStep(index + 1)}
              key={index}
              isSmall={!isSidebarExpanded}
              label={step.label}
              isActive={activeStep === index + 1}
              disabled={!courseLoaded}
            >
              {activeStep === index + 1 && (
                <StepButtonBG
                  as={motion.span}
                  layoutId="stepButtonBG"
                  isSmall={!isSidebarExpanded}
                />
              )}
              <ButtonIcon isSmall={!isSidebarExpanded}>
                {step.icon && <step.icon color={colors.uguWhite} />}
              </ButtonIcon>
              {isSidebarExpanded && <ButtonText>{step.label}</ButtonText>}
            </StepButton>
          ))}
        </StepsContainer>
      </AnimateSharedLayout>
    </SidebarContentWrapper>
  )
}

export default SidebarContent
