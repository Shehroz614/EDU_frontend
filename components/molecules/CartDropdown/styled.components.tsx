import styled from '@emotion/styled'

const CartDropdownContainer = styled.div<{
  empty: boolean
  top: string
  right: string
}>`
  width: 19rem;
  display: flex;
  flex-direction: ${(props) => (props.empty ? 'row' : 'column')};
  top: 4.5rem;
  transform: translateX(-45%);
  position: absolute;
  background-color: #ffffff;
  border-radius: 18px 0px 18px 18px;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.08);
  padding: 1rem 1rem;
  z-index: 10;
`
const CoursesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 11rem;
  overflow: scroll;
  //cross browser commands to hide scrollbar, but allow scrolling
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent Chrome */
  }
`
const TotalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
`

const TotalText = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  font-family: 'RobotoBold', serif;
`

export { CartDropdownContainer, CoursesWrapper, TotalWrapper, TotalText }
