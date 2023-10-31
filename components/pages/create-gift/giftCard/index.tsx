import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import animationData from '@public/static/images/Loottie.json'
import backgroundImage from '@public/static/images/LottieBG.png'
const imageUrl = backgroundImage.src // Get the URL of the image
import { Image } from '@nextui-org/react'
// Define a prop interface for GiftCard props
interface GiftCardProps {
  amount?: number // Optional amount prop
}

// Define the GiftCard component
const Card = styled.div`
  color: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  text-align: center;
  height: 247px;
  max-width: 397px;
  min-width: 350px;
  width: 100%;
  margin-top: 30px;
  overflow: hidden;
  position: relative; /* Needed for positioning the Lottie animation */
  cursor: pointer; /* Change cursor on hover */
  background-image: url(${imageUrl}); /* Set the image URL as background */
  overflow: hidden;

  @media (max-width: 435px) {
    width: 330px !important;
    min-width: 200px;

    padding: 0px;
  }
`

const Amount = styled.div`
  color: #fff;
  text-align: center;
  font-family: Outfit;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.12px;
  padding-top: 13px;
`

const Name = styled.div`
  color: #fff;
  text-align: center;
  font-family: 'NordiquePro-Bold';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 1.12px;
`
const CardDetailsContainer = styled.div`
  position: absolute;
  top: 5;
  z-index: 5;
  padding: 10px 25px 0px 25px;
  max-width: 397px;
  width: 100%;
  height: '100%';
  overflow: 'hidden';
`

const LogoContainer = styled.div`
  position: absolute;
  top: 25%;
  z-index: 5;
  /* padding: 10px 25px 0px 25px; */
  max-width: 397px;
  width: 100%;
  height: 247px;
  overflow: 'hidden';
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const LogoImg = styled.div`
  width: 93;
  height: 96;
`
const LogoText = styled.div`
  color: #fff;
  text-align: center;
  font-family: 'NordiquePro-Bold';
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.8px;
  padding-bottom: 40px;
  @media (max-width: 435px) {
    font-size: 30px;
    padding-bottom: 30px;
  }
`
const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
`

const GiftCard: React.FC<GiftCardProps> = ({ amount }) => {
  return (
    <Card>
      <CardDetailsContainer>
        <CardDetails>
          <Name>gift card</Name>
          <Amount>$ {amount ? amount : '500'}</Amount>
        </CardDetails>
      </CardDetailsContainer>
      <LogoContainer>
        <Logo>
          <LogoImg>
            <Image
              alt="edugram-promotions"
              src="/static/images/endu-logo.png"
            ></Image>
          </LogoImg>
          <LogoText>edugram</LogoText>
        </Logo>
      </LogoContainer>

      <Lottie
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 400,
          height: 287,
          padding: 0,
          zIndex: 2,
          background: 'black',
          objectFit: 'cover',
        }}
        options={{
          animationData, // The animation JSON data
          loop: true, // Set to true if you want the animation to loop
          autoplay: true,

          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
          // Set to true to automatically play the animation
        }}
      />
    </Card>
  )
}

export default GiftCard
