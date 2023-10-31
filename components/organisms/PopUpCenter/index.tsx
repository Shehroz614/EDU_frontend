import styled from '@emotion/styled'
import React from 'react'
import Button from 'components/atoms/Button'
import { colors } from 'configs/styles/config'
import Portal from 'components/molecules/Portal'
import { CenterNotification } from 'types/main'

type PopUpCenterProps = {
  centerNotification: CenterNotification
  showPopUp: boolean
}

const Background = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.modalBackground};
  backdrop-filter: blur(4px);
  z-index: 100;
`

const PopUpCenterWrapper = styled.div`
  display: flex;
  border-radius: 20px;
  padding: 1rem 2rem;
  background-color: white;
`

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  font-size: 1.2rem;
  font-family: 'RobotoBold';
`

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'RobotoLight';
  margin-bottom: 2rem;
  font-size: 0.9rem;
  max-width: 25vw;
  text-align: center;
`

const ButtonsHorizontalWrapper = styled.div`
  display: flex;
`

const PopUpCenter: React.FunctionComponent<PopUpCenterProps> = (props) => {
  const { title, message, firstBtn, secondBtn } = props.centerNotification
  const { showPopUp = false } = props

  return (
    <>
      {showPopUp && (
        <Portal selector="#modal">
          <Background>
            <PopUpCenterWrapper>
              <VerticalContainer>
                <TitleWrapper>{title}</TitleWrapper>
                <MessageWrapper>{message}</MessageWrapper>
                <ButtonsHorizontalWrapper>
                  {firstBtn && (
                    <Button
                      backgroundColor={
                        firstBtn.actionType === 'confirm'
                          ? colors.uguYellow
                          : firstBtn.actionType === 'cancel'
                          ? colors.uguPurple
                          : colors.uguLightGrey
                      }
                      color={
                        firstBtn.actionType === 'confirm'
                          ? colors.uguPurple
                          : firstBtn.actionType === 'cancel'
                          ? colors.uguWhite
                          : colors.uguPurple
                      }
                      text={firstBtn.title}
                      marginRight="1rem"
                      padding="1rem"
                      onClick={firstBtn.action}
                      fontFamily={'RobotoBold'}
                      height={'2.8rem'}
                      width={'9.5rem'}
                    />
                  )}
                  {secondBtn && (
                    <Button
                      backgroundColor={
                        secondBtn.actionType === 'confirm'
                          ? colors.uguYellow
                          : secondBtn.actionType === 'cancel'
                          ? colors.uguPurple
                          : colors.uguLightGrey
                      }
                      text={secondBtn.title}
                      onClick={secondBtn.action}
                      color={
                        secondBtn.actionType === 'confirm'
                          ? colors.uguPurple
                          : secondBtn.actionType === 'cancel'
                          ? colors.uguWhite
                          : colors.uguPurple
                      }
                      height={'2.8rem'}
                      width={'9.5rem'}
                      fontFamily={'RobotoBold'}
                    />
                  )}
                </ButtonsHorizontalWrapper>
              </VerticalContainer>
            </PopUpCenterWrapper>
          </Background>
        </Portal>
      )}
    </>
  )
}

export default PopUpCenter
