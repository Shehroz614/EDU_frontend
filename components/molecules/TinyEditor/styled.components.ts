import styled from '@emotion/styled'

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: none;
  top: 0;
  left: 0;
`
const CharCountWrapper = styled.div`
  font-family: 'RobotoRegular';
  display: flex;
  color: #1a1e3d;
  font-size: 0.75rem;
  float: right;
`
const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export { EditorWrapper, CharCountWrapper, LoaderWrapper }
