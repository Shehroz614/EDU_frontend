import React from 'react'
import {
  SidebarWrapper,
  HeaderWrapper,
  HeaderContentWrapper,
  ExpandButtonWrapper,
  ShrinkButtonWrapper,
  ContentWrapper,
  Button,
} from './styled.components'
import SidebarArrow from '@public/static/icons/sidebar-arrow-icon'

type SidebarProps = {
  header: JSX.Element
  children: JSX.Element
  isClosed: boolean
  isExpanded: boolean
  onClose: () => void
  onExpand: () => void
}
const SideBar = ({
  children,
  header,
  isClosed,
  //onClose,
  isExpanded,
  onExpand,
}: SidebarProps): JSX.Element => {
  return (
    <SidebarWrapper isClosed={isClosed} isExpanded={isExpanded}>
      <HeaderWrapper>
        {isExpanded ? (
          <>
            <HeaderContentWrapper>{header}</HeaderContentWrapper>
            <ShrinkButtonWrapper>
              <Button onClick={onExpand} isExpanded={true}>
                {/* <ChevronLeft size={15} color={colors.uguWhite} /> */}

                {/* <ButtonArrow /> */}
                <SidebarArrow width="50%" rotate="180" />
              </Button>
            </ShrinkButtonWrapper>
          </>
        ) : (
          <ExpandButtonWrapper>
            <Button onClick={onExpand}>
              {/* <ChevronRight size={15} color={colors.uguWhite} /> */}
              <SidebarArrow width="50%" />
            </Button>
          </ExpandButtonWrapper>
        )}
      </HeaderWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </SidebarWrapper>
  )
}

export default SideBar
