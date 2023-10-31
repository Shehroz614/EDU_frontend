import React from 'react'
import styled from '@emotion/styled'

type BodyProps = {
  children: React.ReactNode
}

const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`

const Body: React.FC<BodyProps> = ({ children }) => {
  return <BodyContainer>{children}</BodyContainer>
}

export default Body
