import { useState } from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'
import Collapse from '../Collapse/Collapse'

type CollapsibleProps = {
  title: string
  isOpen?: boolean
  style?: React.CSSProperties
  titleStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  height?: string
  animationSpeed?: number
}

const Container = styled.div`
  width: 100%;
  border: 1px solid ${colors.uguLightGrey};
  border-radius: 1.875rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 0 1rem;
  overflow: hidden;
`

const Title = styled.text<{ height?: string }>`
  cursor: pointer;
  color: #000000;
  font-size: 1rem;
  font-family: ${fontFamilies.regular};

  line-height: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => props.height || '3rem'};
`

const Arrow = styled.svg<{ isOpen: boolean; animationSpeed?: number }>`
  transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(180deg)')};
  transition: transform ${(props) => props.animationSpeed || 0.3}s ease-in-out;
  width: 1.125rem;
  height: 1.125rem;
`

const Content = styled.div<{ animationSpeed?: number }>`
  overflow: hidden;
  transition: ${(props) => props.animationSpeed || 0.3}s;
  padding-bottom: 1rem;
`

const CollapseInfo: React.FC<React.PropsWithChildren<CollapsibleProps>> = ({
  title,
  children,
  isOpen: isOpenProp = false,
  style,
  titleStyle,
  contentStyle,
  height,
  animationSpeed,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container style={style}>
      <Collapse
        isOpen={isOpen}
        style={{ paddingLeft: '0' }}
        header={
          <Title style={titleStyle} onClick={handleToggle} height={height}>
            {title}

            <Arrow
              isOpen={isOpen}
              animationSpeed={animationSpeed}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </Arrow>
          </Title>
        }
      >
        <Content style={contentStyle} animationSpeed={animationSpeed}>
          {children}
        </Content>
      </Collapse>
    </Container>
  )
}

export default CollapseInfo
