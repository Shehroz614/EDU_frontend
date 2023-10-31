import React from 'react'
import styled from '@emotion/styled'

const SectionsRouteContainer = styled.div`
  display: flex;
  overflow: auto;
`

const RouteButton = styled.button`
  color: #999;
  padding: 0;
  font-size: 1rem;
  background: none;
  transition: 0.2s;
  white-space: nowrap;
  :hover {
    color: black;
    cursor: pointer;
  }
`

const Separator = styled.div`
  margin: 0.5rem;
  font-size: 1rem;
  color: #999;
`

const SectionsRoute: React.FC = () => {
  return (
    <SectionsRouteContainer>
      <RouteButton>Business</RouteButton>
      <Separator>/</Separator>
      <RouteButton>Communication Skills</RouteButton>
      <Separator>/</Separator>
      <RouteButton>Presentation Skills</RouteButton>
    </SectionsRouteContainer>
  )
}

export default SectionsRoute
