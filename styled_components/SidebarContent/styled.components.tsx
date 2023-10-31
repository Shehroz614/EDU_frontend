import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const SidebarContentWrapper = styled.div<{ isSmall: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSmall ? 'center' : '')};
  padding: ${(props) => (props.isSmall ? '1rem' : '1rem 2rem')};
`
const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StepButton = styled.button<{
  isSmall: boolean
  label: string
  isActive: boolean
  disabled?: boolean
}>`
  width: ${(props) => (props.isSmall ? '2.25rem' : '')};
  height: ${(props) => (props.isSmall ? '2.25rem' : '')};
  cursor: pointer;
  padding: ${(props) => (props.isSmall ? '' : '0.8rem 1.2rem')};
  text-align: left;
  border-radius: ${(props) => (props.isSmall ? '0.5rem' : '1rem')};
  background: none;
  color: ${colors.uguWhite};
  font-size: 0.9rem;
  font-weight: 400;
  position: relative;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.isSmall ? 'center' : 'flex-start')};
  align-items: center;
  margin: 0.5rem 0 0.8rem;
  opacity: ${(props) =>
    props.disabled ? '0.3' : props.isActive ? '1' : '0.7'};
  &:hover {
    opacity: ${(props) => (props.disabled ? '0.3' : '1')};
    &:after,
    &:before {
      display: ${(props) => (props.isSmall ? 'block' : 'none')};
    }
  }
  &:after {
    content: '${(props) => props.label}';
    background: ${colors.uguWhite};
    color: ${colors.uguPurple};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    position: absolute;
    font-size: 0.8rem;
    top: 0;
    right: 0;
    transform: translate(calc(100% + 0.6rem), 0);
    display: none;
    transition: all 0.2s ease;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
  &:before {
    display: none;
    content: '';
    background: ${colors.uguWhite};
    height: 0.8rem;
    width: 0.8rem;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(calc(100% + 0.3rem), -50%) rotate(45deg);
    border-radius: 0.2rem;
    z-index: 2;
  }
`
const StepButtonBG = styled.span<{
  as: any
  layoutId: string
  isSmall: boolean
}>`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: ${(props) => (props.isSmall ? '0.7rem' : '1.1rem')};
  background: ${colors.uguBrightPurple};
  z-index: -1;
`
const ButtonIcon = styled.div<{ isSmall: boolean }>`
  height: 1.1rem;
  width: 1.1rem;
`
const ButtonText = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: ${colors.uguWhite};
  margin-left: 0.8rem;
`

export {
  SidebarContentWrapper,
  StepsContainer,
  StepButton,
  StepButtonBG,
  ButtonIcon,
  ButtonText,
}
