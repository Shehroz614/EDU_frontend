import { ReactNode, CSSProperties } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import styled from '@emotion/styled'

export type CollapseProps = {
  header?: ReactNode
  children: ReactNode
  animationSpeed?: number
  style?: CSSProperties
  isOpen?: boolean
  renderChildrenOnly?: boolean // If true, the component will render the <>children< /> only.
}

export const CollapseItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const defaultAnimationSpeed = 0.3

const CollapseContainer = styled(motion.div)`
  width: 100%;
  padding-left: 1rem;
`

const ContentWrapper = styled.div`
  /* Any additional styling for the content wrapper */
`

const Collapse: React.FC<CollapseProps> = ({
  header,
  children,
  animationSpeed = defaultAnimationSpeed,
  style,
  isOpen = false,
  renderChildrenOnly = false,
}) => {
  const variants: Variants = {
    open: {
      opacity: 1,
      height: 'auto',
      overflow: 'visible', // Set overflow to visible after opening animation completes
    },
    closed: {
      opacity: 0,
      height: 0,
      overflow: 'hidden', // Set overflow to hidden during closing animation
    },
  }

  const transition = {
    duration: animationSpeed,
    ease: [0.04, 0.62, 0.23, 0.98],
  }

  // Additional logic to apply overflow style just before closing animation starts
  const combinedStyle = {
    ...style,
    overflow: isOpen ? 'visible' : 'hidden',
  }

  return renderChildrenOnly ? (
    <>{children}</>
  ) : (
    <CollapseItemWrapper>
      {header}
      <AnimatePresence initial={true}>
        {isOpen && (
          <CollapseContainer
            key="content"
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={variants}
            transition={transition}
            style={combinedStyle} // Apply the combined styles here
          >
            <ContentWrapper>{children}</ContentWrapper>
          </CollapseContainer>
        )}
      </AnimatePresence>
    </CollapseItemWrapper>
  )
}

export default Collapse
