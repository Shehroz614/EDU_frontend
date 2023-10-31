import React, { useEffect, useState } from 'react'
import Header from '@components/organisms/Header/Header'
import Footer from '@components/organisms/Footer'
import {
  LayoutContainer,
  ContentWrapper,
  PageContainer,
} from './styled.components'
import SideBar from '@components/atoms/Sidebar'
import useWindowDimensions from '@hooks/useWindowDimensions'

type LayoutProps = {
  children: JSX.Element | JSX.Element[]
  sidebarHeader: ({
    isSidebarClosed,
    isSidebarExpanded,
  }: {
    isSidebarClosed: boolean
    isSidebarExpanded: boolean
  }) => JSX.Element | JSX.Element
  sidebarContent: ({
    isSidebarClosed,
    isSidebarExpanded,
  }: {
    isSidebarClosed: boolean
    isSidebarExpanded: boolean
  }) => JSX.Element | JSX.Element
}
const Layout = ({
  children,
  sidebarHeader,
  sidebarContent,
}: LayoutProps): JSX.Element => {
  const window = useWindowDimensions()
  const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true)

  useEffect(() => {
    if (window) {
      const width: number = window?.width || 1024
      setIsSidebarExpanded(width > 1024)
    }
  }, [window])

  return (
    <LayoutContainer>
      <SideBar
        header={
          typeof sidebarHeader === 'function'
            ? sidebarHeader({ isSidebarClosed, isSidebarExpanded })
            : sidebarHeader
        }
        isExpanded={isSidebarExpanded}
        onExpand={() => setIsSidebarExpanded((state) => !state)}
        isClosed={isSidebarClosed}
        onClose={() => setIsSidebarClosed((state) => !state)}
      >
        {typeof sidebarContent === 'function'
          ? sidebarContent({ isSidebarClosed, isSidebarExpanded })
          : sidebarContent}
      </SideBar>
      <ContentWrapper
        sidebarMode={
          isSidebarClosed ? 'closed' : isSidebarExpanded ? 'large' : 'small'
        }
      >
        <Header />
        <PageContainer>{children}</PageContainer>
        <Footer />
      </ContentWrapper>
    </LayoutContainer>
  )
}

export default Layout
