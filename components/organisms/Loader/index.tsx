import React from 'react'
import { LoaderWrapper, ReactLoader } from './styled.components'

type TLoader = {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const Loader = ({ size = 'medium', color = '' }: TLoader) => {
  return (
    <LoaderWrapper size={size} color={color}>
      <ReactLoader size={size} />
    </LoaderWrapper>
  )
}

export default Loader
