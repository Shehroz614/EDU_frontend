import { colors } from '@configs/styles/config'
import { authorBenefits } from '@constants/authorBenefits'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const flipAnimation = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
`

const Card = styled.div`
  perspective: 1000px;
  width: 320px;
  height: 320px;
  font-size: 2rem;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 1561px) {
    font-size: 2.3vw;
    width: 20vw;
    height: 20vw;
  }
  @media (max-width: 800px) {
    width: 180px;
    height: 180px;
    font-size: 18px;
  }
  @media (max-width: 460px) {
    width: 160px;
    height: 171px;
    font-size: 15px;
  }
`

const CardInner = styled.div<{ flipped: boolean }>`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: ${(props) =>
    props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  transition: transform 0.8s;
  animation: ${flipAnimation} 0.8s;
`

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 2.5rem;
  font-family: 'Sofia Pro';
  font-weight: bold;
  border: 1px solid #c9c9df;
  border-radius: 20px;
  aspect-ratio: 1;
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    border-color: transparent;
    box-shadow: rgba(113, 129, 255, 0.2) 0px 48px 100px 0px;
  }
  @media (max-width: 1561px) {
    padding: 2.3vw;
  }
  @media (max-width: 800px) {
    padding: 18px;
  }
`

const CardFront = styled(CardFace)``
const CardBack = styled(CardFace)`
  display: flex;
  flex-direction: column;
  transform: rotateY(180deg);
  font-size: 1.5rem;
  @media (max-width: 1561px) {
    font-size: 1.6vw;
  }
  @media (max-width: 800px) {
    font-size: 0.875rem;
  }
  @media (max-width: 460px) {
    font-size: 0.75rem;
  }
`
const ComingSoonWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
`

const ComingSoonLabel = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50px;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  color: white;
  background-color: ${colors.uguBrightPurple};
  @media (max-width: 1561px) {
    font-size: 1.1vw;
  }
  @media (max-width: 800px) {
    font-size: 0.75rem;
  }
  @media (max-width: 460px) {
    font-size: 0.65rem;
  }
`

const AuthorBenefits: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<string>()
  const dimentions = useWindowDimensions()
  const { t } = useTranslation()
  return (
    <>
      {authorBenefits.map((autorBenefit) => {
        const BenefitIcon = autorBenefit.icon
        return (
          <Card
            key={autorBenefit.titleKey}
            onClick={() => {
              if (autorBenefit.titleKey === flippedCard) {
                setFlippedCard('')
              } else {
                setFlippedCard(autorBenefit.titleKey)
              }
            }}
          >
            <CardInner flipped={flippedCard === autorBenefit.titleKey}>
              <CardBack>
                {t(autorBenefit.descriptionKey, {
                  ns: 'landingPage',
                })}
                {autorBenefit.soon && (
                  <ComingSoonWrapper>
                    <ComingSoonLabel>
                      {t('comingSoon', { ns: 'landingPage' })}
                    </ComingSoonLabel>
                  </ComingSoonWrapper>
                )}
              </CardBack>
              <CardFront>
                <BenefitIcon
                  style={{
                    width:
                      (dimentions.width || 0) < 800
                        ? '6.5vw'
                        : (dimentions.width || 0) < 1500
                        ? '4.5vw'
                        : '4rem',
                    height:
                      (dimentions.width || 0) < 800
                        ? '6.5vw'
                        : (dimentions.width || 0) < 1500
                        ? '4.5vw'
                        : '4rem',
                  }}
                  color={colors.uguBrightPurple}
                />
                <br />
                <div
                  style={{
                    marginTop: (dimentions.width || 0) < 800 ? '8px' : '0',
                  }}
                >
                  {t(autorBenefit.titleKey, {
                    ns: 'landingPage',
                  })}
                </div>
              </CardFront>
            </CardInner>
          </Card>
        )
      })}
    </>
  )
}

export default AuthorBenefits
