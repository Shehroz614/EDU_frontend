import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { colors } from '@configs/styles/config'

type Props = {
  active?: boolean
  index: number
  onClick: Function
  prevButton: number
  children: ReactNode
  avgWidth?: number[]
  current?: number
}

const GroupButtonContainer = styled.div<{ active: boolean }>`
  opacity: ${(props) => (props.active ? '1' : '0.24')};
  background-color: none;
  cursor: pointer;
  margin-top: -26px;
  white-space: nowrap;
`
const GroupButtonContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-right: 20px;
`
const GroupButtonContainerBG = styled.div<{ width: number }>`
  display: flex;
  height: 30px;
  width: ${(props) => (props.width ? props.width : 120) + 'px'};
  padding: 0 16px;
  border-radius: 21px;
  padding: 0 8px;
`

const GroupButton: React.FunctionComponent<Props> = (props) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [sum, setSum] = useState<number>(0)
  const {
    active = false,
    index,
    onClick,
    children,
    avgWidth,
    current = 0,
  } = props
  useEffect(() => {
    setTimeout(() => {
      let mult = -1
      const avgWidthCpy = [...(avgWidth || [0])]
      const lenSum = avgWidthCpy?.slice(
        current < index ? current : index,
        current < index ? index : current
      )
      if (current > index) {
        //lenSum = avgWidthCpy?.splice(index, current);
        mult = 1
      }

      //console.log(lenSum);

      const lenSumNum = lenSum?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
      lenSumNum - avgWidthCpy[current]
      setSum((lenSumNum || 0) * mult)
      if (current == index) {
        setSum(0)
      }
      //console.log(sum)
    }, 1)
  }, [current])

  return (
    <GroupButtonContainerWrapper>
      {props.active ? (
        <motion.div
          initial={{ x: sum }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: buttonRef.current
              ? buttonRef.current?.offsetWidth + 32
              : 120,
            padding: '0 16px',
            borderWidth: '1px',
            borderColor: colors.uguPurple,
            borderStyle: 'solid',
            height: '30px',
            borderRadius: '21px',
          }}
        />
      ) : (
        <GroupButtonContainerBG
          width={buttonRef.current ? buttonRef.current?.offsetWidth + 32 : 120}
        ></GroupButtonContainerBG>
      )}
      <GroupButtonContainer
        active={active}
        onClick={() => onClick()}
        ref={buttonRef}
      >
        {children}
      </GroupButtonContainer>
    </GroupButtonContainerWrapper>
  )
}

export default GroupButton
