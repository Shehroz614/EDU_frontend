import styled from '@emotion/styled'

type CartDropdownContainerType = {
  empty: boolean
  top: string
  right: string
}
const CartDropwdownContainer = styled.div<CartDropdownContainerType>`
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
const RowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 12rem;
  overflow: scroll;
  //cross browser commands to hide scrollbar, but allow scrolling
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent Chrome */
  }
`
export { CartDropwdownContainer, RowsWrapper }
