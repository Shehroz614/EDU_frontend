import styled from '@emotion/styled'

const LayoutContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
  overflow-x: hidden;
`

const PageContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  width: 100%;
  padding: 0 0.7rem;
  margin: 0 auto;
  flex-direction: column;
  @media (min-width: 768px) {
    width: ${(props) => (props.fullWidth ? '100%' : '95vw')};
    margin: 0 auto;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media (min-width: 1300px) {
    height: 100%;
    width: ${(props) => (props.fullWidth ? '100vw' : '95vw')};
    max-width: ${(props) => (props.fullWidth ? '100vw' : '1440px')};
    display: flex;
    background-color: white;
    /* flex-direction: column; */
  }
`
export { LayoutContainer, PageContainer }
