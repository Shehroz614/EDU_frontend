import React, { useEffect, useRef } from 'react'
import Portal from '../Portal'
import styled from '@emotion/styled'
import { zIndex, BorderRadius } from '../../../configs/styles/config'
import RoundButton from '../../atoms/RoundButton'
import CloseIcon from '../../../public/static/icons/close-icon'

type ModalProps = {
  onClose: () => void
  blurredBackground?: boolean
  headerText?: string
  children: React.ReactNode
  width?: string
}

const Background = styled.div<{ blurredBackground: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.modalBackground};
  ${(props) => props.blurredBackground && 'backdrop-filter: blur(4px)'};
  /* z-index: ${zIndex('dialog-background')}; */
  z-index: 99;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${BorderRadius.medium};
  max-height: 97vh;
  width: 100%;
  max-width: 30rem;
  margin: 1rem;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 100%;
    margin: 0.5rem;
  }
`
const NewModalHeader = styled.div`
  display: flex;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
`

const CloseButtonWrapper = styled.div`
  width: 1rem;
  height: 2rem;
  margin-left: auto;
  margin-right: 1.5rem;
  margin-top: 1rem;
`

const Modal: React.FunctionComponent<ModalProps> = ({
  onClose,
  children,
  blurredBackground = false,
  headerText = '',
  width = '30rem',
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event?.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [contentRef, onClose])

  return (
    <>
      {
        <Portal selector="#modal">
          <Background blurredBackground={blurredBackground}>
            <Content ref={contentRef} style={{ maxWidth: width }}>
              <NewModalHeader>
                <Header>{headerText}</Header>
                <CloseButtonWrapper>
                  <RoundButton
                    width="1.375rem"
                    height="1.375rem"
                    onClick={() => onClose()}
                  >
                    <CloseIcon width="0.625rem" height="0.625rem" />
                  </RoundButton>
                </CloseButtonWrapper>
              </NewModalHeader>
              {children}
            </Content>
          </Background>
        </Portal>
      }
    </>
  )
}
export default Modal
