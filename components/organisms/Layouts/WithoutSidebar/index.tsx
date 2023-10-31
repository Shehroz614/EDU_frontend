import React, { useEffect } from 'react'
import Header from '@components/organisms/Header/Header'
import Footer from '@components/organisms/Footer'
import { LayoutContainer, PageContainer } from './styled.components'
import { MobileNavigation } from '../MobileNavigation'

const Layout = ({
  children,
  fullWidth = false,
}: {
  children: JSX.Element | JSX.Element[]
  fullWidth?: boolean
}): JSX.Element => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    body.style.overflowX = 'hidden'
  }, [])
  return (
    <LayoutContainer>
      <Header />
      <PageContainer fullWidth={fullWidth}>{children}</PageContainer>
      <Footer />
      <MobileNavigation />
    </LayoutContainer>
  )
}

export default Layout
