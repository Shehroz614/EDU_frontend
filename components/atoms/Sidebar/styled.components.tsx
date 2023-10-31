import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'

const SidebarWrapper = styled.div<{
  isClosed: boolean
  isExpanded: boolean
}>`
  width: ${(props) =>
    props.isClosed ? '0' : props.isExpanded ? '17rem' : '4rem'};
  z-index: 9; //
  background: ${colors.uguPurple};
  transition: all 0.2s ease;
  position: fixed;
  height: 100vh;
  justify-content: ${(props) => (props.isClosed ? 'center' : '')};
  align-items: ${(props) => (props.isClosed ? 'center' : '')};
  border: 1px solid;
  border-right-color: dark;
`

const HeaderWrapper = styled.div`
  position: relative;
  height: 4rem;
  border-bottom: solid 1px ${colors.uguLightBlack};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const HeaderContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0.6rem 2rem;
`
const HeaderLogo = styled.div`
  height: 100%;
  padding: 10px;
  margin-right: 10px;
`
const HeaderTitle = styled.h3`
  font-size: 1.2rem;
`
const ExpandButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ShrinkButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
`
const ContentWrapper = styled.div``
const Button = styled.button<{ isExpanded?: boolean }>`
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: relative;
  background: ${colors.uguPurple};
  color: ${colors.uguWhite};
  border: solid 2px ${colors.uguWhite};
  border-width: ${(props) => (props.isExpanded ? '2px' : '1px')};
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    border: solid 1px ${colors.uguWhite};
    border-width: ${(props) => (props.isExpanded ? '1px' : '0px')};
  }
`

export {
  SidebarWrapper,
  HeaderWrapper,
  HeaderContentWrapper,
  HeaderLogo,
  HeaderTitle,
  ShrinkButtonWrapper,
  ExpandButtonWrapper,
  ContentWrapper,
  Button,
}
