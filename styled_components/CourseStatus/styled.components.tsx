// @ts-nocheck
import styled from '@emotion/styled'
import { colors } from '@configs/styles/config'
import { Course } from '@ugu/types'

const StatusWrapper = styled.div<{ isSmall: boolean }>`
  width: ${(props) => (props.isSmall ? '2.25rem' : '100%')};
  height: ${(props) => (props.isSmall ? '2.25rem' : '100%')};
  border-radius: ${(props) => (props.isSmall ? '0.7rem' : '1.1rem')};
  margin-bottom: ${(props) => (props.isSmall ? '1rem' : '0')};
  position: relative;
`
const StatusContainer = styled.div<{ isSmall: boolean }>`
  height: 100%;
  width: 100%;
  border-radius: ${(props) => (props.isSmall ? '0.7rem' : '1.1rem')};
  padding: ${(props) => (props.isSmall ? '0' : '1rem 1.5rem')};
  padding-right: ${(props) => (props.isSmall ? '0' : '1rem')};
  border: solid 1px ${colors.uguWhite};
  color: ${colors.uguWhite};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isSmall ? 'center' : 'flex-start')};
  position: relative;
  cursor: pointer;
`
const StatusDetails = styled.div<{ isSmall: boolean }>`
  display: flex;
  align-items: center;
  flex-grow: ${(props) => (props.isSmall ? '0' : '1')};
`
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'inReview':
      return colors.uguBlue
    case 'draft':
    case 'offline':
      return colors.uguGrey
    case 'approved':
    case 'online':
      return colors.uguGreen
    case 'rejected':
      return colors.uguRed
    default:
      return colors.uguWhite
  }
}
const StatusIndicator = styled.div<{
  isSmall: boolean
  status: Course['status']
}>`
  background: ${(props) => getStatusColor(props.status)};
  height: ${(props) => (props.isSmall ? '0.4rem' : '0.5rem')};
  width: ${(props) => (props.isSmall ? '0.4rem' : '0.5rem')};
  border-radius: 50%;
  margin-right: ${(props) => (props.isSmall ? '0' : '0.6rem')};
  border: solid 0.5px ${colors.uguPurple};
`
const StatusDropdown = styled.div`
  background: ${colors.uguPurple};
  border: solid 1px ${colors.uguWhite};
  color: ${colors.uguWhite};
  position: absolute;
  left: 0;
  width: 100%;
  border-radius: 1.1rem;
  top: 0;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
  z-index: 999;
  overflow: hidden;
`
const StatusRow = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.8rem 1rem;
  border-bottom: solid 1px ${colors.uguDarkGrey};
  color: ${colors.uguWhite};
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? colors.uguBlue : colors.uguPurple};
  &:last-child {
    border-bottom: none;
  }
`
const AddButton = styled.button`
  margin-left: auto;
  cursor: pointer;
  background: transparent;
  color: ${colors.uguWhite};
  padding: 0;
`

export {
  StatusWrapper,
  StatusContainer,
  StatusDetails,
  StatusIndicator,
  StatusDropdown,
  StatusRow,
  AddButton,
}
