import styled from '@emotion/styled'

const CategoriesDropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 4.5rem;
  background-color: #ffffff;
  z-index: 10;
  border-radius: 0px 18px 18px 18px;
  overflow: hidden;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.08);
  /* max-width: 13rem; */
`
const DropdownWrapper = styled.div<{
  backgroundColor?: string
}>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#fffff'};
  position: relative;
`
const DropdownSeparator = styled.div`
  height: 1px;
  background-image: url('../static/Line.svg');
  opacity: 0.5;
`

export { CategoriesDropdownWrapper, DropdownWrapper, DropdownSeparator }
