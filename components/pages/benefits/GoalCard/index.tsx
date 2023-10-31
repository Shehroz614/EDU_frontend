import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'

type GoalCardComponentProps = {
  goalNumber: number
  selectedGoal: number
  direction: 'forward' | 'backward'
  index: number
  title: string
  description: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  goalMargin: number
  onClick: () => void
}

const GoalCard = styled.div`
  width: 517px;
  height: 537px;
  background: white;
  border-radius: 30px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 20px;
  position: relative;
  @media (max-width: 1024px) {
    width: 435px;
    height: 490px;
    font-size: 1.8vw;
  }
  @media (max-width: 950px) {
    font-size: 17px;
  }
  @media (max-width: 755px) {
    width: 270px;
    height: 351px;
    font-size: 12px;
  }
`

export const OurGoalHeader = styled.div`
  font-size: 30px;
  font-family: 'Sofia Pro';
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10%;
  @media (max-width: 1024px) {
    font-size: 2.7vw;
  }
  @media (max-width: 950px) {
    font-size: 25px;
  }
  @media (max-width: 755px) {
    font-size: 19px;
  }
`

export const GoalTimerWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  margin: auto;
  display: flex;
`

export const TimerPart = styled.div`
  width: 55px;
  height: 8px;
  background-color: #e4e4e4;
  border-radius: 9px;
  overflow: hidden;
  margin: 3px;
  margin-bottom: 10px;
`

export const TImerPartFilling = styled.div`
  height: 9px;
  background-color: #1a1e3d;
  width: 0;
`

const determineZIndex = (selectedGoal, goalNumber, direction) => {
  if (direction === 'forward') {
    if (goalNumber === selectedGoal) return 3
    if (goalNumber === (selectedGoal % 3) + 1) return 1 // right card when moving forward
    return 2 // left card
  } else {
    // direction === "backward"
    if (goalNumber === selectedGoal) return 3
    if (goalNumber === (selectedGoal === 1 ? 3 : selectedGoal - 1)) return 1 // left card when moving backward
    return 2 // right card
  }
}

const getScale = (selected: number, goalNum: number) =>
  selected === goalNum ? 1 : 0.8

const getBrightness = (selected: number, goalNum: number) =>
  selected === goalNum ? 1 : 0.6

const getMarginRight = (
  selected: number,
  goalNum: number,
  goalMargin: number
) => {
  if (selected === goalNum) return 0
  if (selected === ((goalNum + 1) % 3) + 1) return goalMargin
  return goalMargin * -1
}

const GoalCardComponent: React.FC<GoalCardComponentProps> = ({
  goalNumber,
  selectedGoal,
  direction,
  index,
  title,
  description,
  icon,
  goalMargin,
  onClick,
}) => {
  const { t } = useTranslation()

  const GoalIcon = icon
  return (
    <motion.div
      onClick={onClick}
      style={{
        position: 'absolute',
        alignSelf: 'center',
        willChange: 'transform, opacity, filter, zIndex',
        transform: 'translateZ(0)', // Enable hardware acceleration
      }}
      initial={{
        zIndex: 1,
        filter: 'brightness(.6)',
        marginRight: goalMargin,
        transform: 'scale(.8)',
      }}
      animate={{
        zIndex: determineZIndex(selectedGoal, goalNumber, direction),
        transform: `scale(${getScale(selectedGoal, goalNumber)})`,
        filter: `brightness(${getBrightness(selectedGoal, goalNumber)})`,
        marginRight: getMarginRight(selectedGoal, goalNumber, goalMargin),
      }}
      transition={{
        duration: 0.4,
        zIndex: { duration: 0.01 },
        transform: { duration: 0.5 },
      }}
    >
      <GoalCard>
        <GoalIcon />
        <OurGoalHeader>{t(title, { ns: 'landingPage' })}</OurGoalHeader>
        {t(description, { ns: 'landingPage' })}
        <GoalTimerWrapper>
          {[2, 1, 0].map((i) => (
            <TimerPart key={i}>
              <TImerPartFilling
                style={{ width: i >= index ? '100%' : '0' }}
              ></TImerPartFilling>
            </TimerPart>
          ))}
        </GoalTimerWrapper>
      </GoalCard>
    </motion.div>
  )
}

export default GoalCardComponent
