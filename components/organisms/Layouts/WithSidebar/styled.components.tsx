import styled from '@emotion/styled'

const LayoutContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  position: relative;
`
const ContentWrapper = styled.div<{
  sidebarMode: 'closed' | 'small' | 'large'
}>`
  transition: all 0.2s ease;
  width: 100%;
  padding-left: ${(props) =>
    props.sidebarMode === 'closed'
      ? '0'
      : props.sidebarMode === 'large'
      ? '17rem'
      : '4rem'};
  position: relative;
`

const PageContainer = styled.div`
  width: 100%;
  padding: 0 0.5rem;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 100%;
    padding: 0 2.5%;
    margin: 0 auto;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media (min-width: 1300px) {
    width: 100%;
    padding: 0 5%;
    max-width: 1440px;
    display: flex;
    background-color: white;
    flex-direction: column;
  }
`
export { LayoutContainer, ContentWrapper, PageContainer }
