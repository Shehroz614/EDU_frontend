import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'
import { BottomNotification } from '@type/main'

type PopUpBottomProps = {
  bottomNotification: BottomNotification
  showPopUp?: boolean
  setShowPopUp: Function
}

//CSS Instructions:
//PopUpBottomWrapper - is the main div
//MessageWrapper - wraps text and has different width depending on the display
//has the maximum width of Main Wrapper

const PopUpBottomWrapper = styled.div<{
  actionType: 'success' | 'error' | 'notification'
}>`
  position: fixed;
  display: flex;
  align-items: center;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${(props) =>
    props.actionType === 'success'
      ? colors.uguGreen
      : props.actionType === 'error'
      ? colors.uguRed
      : colors.uguBlue};
  backdrop-filter: blur(4px);
  z-index: 100;
  height: 3rem;
`

const MessageWrapper = styled.div`
  display: flex;
  color: white;
  font-family: ${fontFamilies.light};
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.5rem 0;
  font-size: 0.875rem;
`

const PopUpBottom: React.FunctionComponent<PopUpBottomProps> = (props) => {
  const { message, actionType, duration = 7 } = props.bottomNotification
  const { setShowPopUp } = props

  useEffect(() => {
    const timer = setTimeout(() => setShowPopUp(false), duration * 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <PopUpBottomWrapper actionType={actionType}>
      <MessageWrapper>{message}</MessageWrapper>
    </PopUpBottomWrapper>
  )
}

export default PopUpBottom
