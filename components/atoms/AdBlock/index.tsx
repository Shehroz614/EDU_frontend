import React from 'react'
import styled from '@emotion/styled'
import { Image } from '@nextui-org/react'

const AdContainer = styled.div`
  display: flex;
  height: 20vh;
  width: 100vw;
  background-color: rgba(107, 181, 201, 0.15);

  align-self: center;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (min-width: 768px) {
    height: 40vh;
  }
  @media (min-width: 992px) {
    height: 40vh;
  }
  @media (min-width: 1300px) {
    height: 50vh;
  }
  @media (min-width: 1500px) {
    height: 65vh;
  }
`

const AdBlock: React.FC = () => {
  return (
    <AdContainer>
      <Image
        alt="edugram-promotions"
        src="/static/images/tg_image_3619509436.jpeg"
        sizes="100vw"
      ></Image>
    </AdContainer>
  )
}

export default AdBlock
