import { colors } from '@configs/styles/config'
import { mainAuthorBenefits } from '@constants/authorBenefits'
import useWindowDimensions from '@hooks/useWindowDimensions'
import {
  BenefitWrapper,
  IndexIconWrapper,
  BenefitIndex,
  SmallIconWrapper,
  ImageWrapper,
  BenefitTextWrapper,
  BenefitTextHeader,
  BenefitsForCreatorsSubHeader,
  JoinUsButtonBenefits,
  ProgressBG,
  ProgressFill,
  HasAlreadyJoint,
  BenefitsIconBlock,
  BenefitsIconWrapper,
  BenefitIndexText,
} from '@styled_components/home/styled.components'
import { getFragmentedText } from '@utils/getFragmentedText'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const JOINED_AUTHORS_NUMBER = 349
const TOTAL_AUTHORS = 500

const MainAuthorBenefits: React.FC = () => {
  const { t } = useTranslation()
  const dimentions = useWindowDimensions()

  return (
    <>
      {mainAuthorBenefits.map((mainAuthorBenefit, index) => {
        const BenefitIcon = mainAuthorBenefit.icon
        return mainAuthorBenefit.titleKey ===
          'mainAuthorBenefits.edugram500' ? (
          //first element:
          <BenefitWrapper>
            <IndexIconWrapper>
              <BenefitIndex>0{index + 1}</BenefitIndex>
              <SmallIconWrapper>
                <ImageWrapper>
                  <BenefitIcon
                    color={colors.uguBrightPurple}
                    width={'100%'}
                    height={'100%'}
                  />
                </ImageWrapper>
              </SmallIconWrapper>
            </IndexIconWrapper>
            <BenefitTextWrapper>
              <BenefitTextHeader>
                {t(mainAuthorBenefit.titleKey, { ns: 'landingPage' })}
              </BenefitTextHeader>
              <BenefitsForCreatorsSubHeader>
                {getFragmentedText(
                  t(mainAuthorBenefit.descriptionKey, { ns: 'landingPage' })
                )}
              </BenefitsForCreatorsSubHeader>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link href="/author">
                  <JoinUsButtonBenefits>
                    {t('joinNow', { ns: 'landingPage' })}
                  </JoinUsButtonBenefits>
                </Link>
                {(dimentions.width || 0) < 756 && (
                  <>
                    <div style={{ marginLeft: 25 }}>
                      <ProgressBG
                        style={{ marginTop: 0, height: 5, marginBottom: 5 }}
                      >
                        <ProgressFill style={{ height: 5 }}></ProgressFill>
                      </ProgressBG>
                      <HasAlreadyJoint style={{ fontSize: 11 }}>
                        <span style={{ color: colors.uguBrightPurple }}>
                          {JOINED_AUTHORS_NUMBER}
                        </span>
                        /{TOTAL_AUTHORS}{' '}
                        {t('hasJoinedAlready', { ns: 'landingPage' })}
                      </HasAlreadyJoint>
                    </div>
                  </>
                )}
              </div>
            </BenefitTextWrapper>
            <BenefitsIconBlock>
              <BenefitsIconWrapper>
                <ImageWrapper>
                  <BenefitIcon
                    color={colors.uguBrightPurple}
                    width={'100%'}
                    height={'100%'}
                  />
                </ImageWrapper>
              </BenefitsIconWrapper>
              <ProgressBG>
                <ProgressFill></ProgressFill>
              </ProgressBG>
              <HasAlreadyJoint>
                <span style={{ color: colors.uguBrightPurple }}>
                  {JOINED_AUTHORS_NUMBER}
                </span>
                /{TOTAL_AUTHORS} {t('hasJoinedAlready', { ns: 'landingPage' })}
              </HasAlreadyJoint>
            </BenefitsIconBlock>
          </BenefitWrapper>
        ) : (
          //other elements:
          <BenefitWrapper style={{ height: 362, alignItems: 'center' }}>
            <BenefitIndexText style={{ display: 'flex' }}>
              <IndexIconWrapper>
                <BenefitIndex>0{index + 1}</BenefitIndex>
                <SmallIconWrapper>
                  <ImageWrapper>
                    <BenefitIcon
                      color={colors.uguBrightPurple}
                      width={'100%'}
                      height={'100%'}
                    />
                  </ImageWrapper>
                </SmallIconWrapper>
              </IndexIconWrapper>
              <BenefitTextWrapper>
                <BenefitTextHeader>
                  {t(mainAuthorBenefit.titleKey, { ns: 'landingPage' })}
                </BenefitTextHeader>
                <BenefitsForCreatorsSubHeader>
                  {getFragmentedText(
                    t(mainAuthorBenefit.descriptionKey, { ns: 'landingPage' })
                  )}
                </BenefitsForCreatorsSubHeader>
              </BenefitTextWrapper>
            </BenefitIndexText>
            <BenefitsIconBlock>
              <BenefitsIconWrapper>
                <ImageWrapper>
                  <BenefitIcon
                    color={colors.uguBrightPurple}
                    width={'100%'}
                    height={'100%'}
                  />
                </ImageWrapper>
              </BenefitsIconWrapper>
            </BenefitsIconBlock>
          </BenefitWrapper>
        )
      })}
    </>
  )
}

export default MainAuthorBenefits
