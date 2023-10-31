import React, { useState } from 'react'
import styled from '@emotion/styled'
import CheckMarkIcon from 'public/static/icons/checkmark-icon'
import { colors } from '@configs/styles/config'

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
export const RoundedItem = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 25px;
  background-color: #e5e5e5;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`
export const CheckAnswearIcon = styled.div`
  display: flex;
  width: 1.1rem;
  height: 1.1rem;
  font-size: 0.5rem;
  font-weight: bold;
  background-color: ${colors.uguYellow};
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`
const Answear = styled.div`
  display: flex;
  font-size: 1rem;
  margin-left: 1rem;
`
const CheckAnswear = () => {
  const [showCheckA, setShowCheckA] = useState(false)
  const [showCheckB, setShowCheckB] = useState(false)
  const [showCheckC, setShowCheckC] = useState(false)
  return (
    <RowWrapper>
      <RoundedItem
        onClick={() => {
          setShowCheckA(!showCheckA)
        }}
      >
        {showCheckA && (
          <CheckAnswearIcon>
            <CheckMarkIcon width="0.4rem" height="0.45rem" color="#ffffff" />
          </CheckAnswearIcon>
        )}
      </RoundedItem>
      <Answear>A</Answear>
      <RoundedItem
        onClick={() => {
          setShowCheckB(!showCheckB)
        }}
      >
        {showCheckB && (
          <CheckAnswearIcon>
            <CheckMarkIcon width="0.4rem" height="0.45rem" color="#ffffff" />
          </CheckAnswearIcon>
        )}
      </RoundedItem>
      <Answear>B</Answear>
      <RoundedItem
        onClick={() => {
          setShowCheckC(!showCheckC)
        }}
      >
        {showCheckC && (
          <CheckAnswearIcon>
            <CheckMarkIcon width="0.4rem" height="0.45rem" color="#ffffff" />
          </CheckAnswearIcon>
        )}
      </RoundedItem>
      <Answear>C</Answear>
    </RowWrapper>
  )
}

export default CheckAnswear
