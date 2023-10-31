import React from 'react'
import styled from '@emotion/styled'
import RoundButton from '../../atoms/RoundButton'
import SeparatorLine from '../../atoms/SeparatorLine'
// import LogoOnDark from '../../../public/static/icons/logo-on-dark'
import GooglePlusIcon from '../../../public/static/icons/socialButtonIcons/google-plus-icon'
import FacebookLogoIcon from '../../../public/static/icons/socialButtonIcons/facebook-logo-button'
import InstagramIcon from '../../../public/static/icons/socialButtonIcons/instagram-icon'
import YoutubeIcon from '../../../public/static/icons/socialButtonIcons/youtube-icon'
import TweeterLogoIcon from '../../../public/static/icons/socialButtonIcons/twitter-logo-button'
// import EdugramIcon from 'public/static/icons/edugramIcon'
import EdugramIconWithCompanyName from 'public/static/icons/edugramIconWithCompanyName'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const FooterSection = styled.div`
  display: flex;
  margin-top: 7rem;
  width: 100%;
  background-color: #1a1e3d;
  align-self: center;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 1rem;
  margin-bottom: 60px;
  @media (min-width: 651px) {
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    padding: 0 2.5vw;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media (min-width: 1300px) {
    padding: 0 5vw;
  }
`

const FooterSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  padding: 0rem 0 2rem 0;
  align-self: center;
  font-size: 14px;
  font-weight: 300;
  justify-content: space-between;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 15px;
`
const FooterLogo = styled.div`
  width: 4rem;
  height: 3rem;
  /* background-color: yellow; */
  margin-top: 3rem;
  margin-right: 20px;
  margin-left: 10px;
`
const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  max-width: 800px;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: space-around;
  margin-top: 3rem;
  @media (max-width: 650px) {
    min-width: 100vw;
    overflow: scroll;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 20px;
    justify-content: flex-start;
  }
`
const LinkBlock = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 130px;
  /* justify-content: space-evenly; */
`
const SectionTitle = styled.div`
  color: rgba(255, 255, 255, 1);
`
const SectionLink = styled.div`
  color: rgba(255, 255, 255, 0.36);
  margin-top: 0.7rem;
`
const SocialMediaWrapper = styled.div`
  width: 200px;
  margin-top: 3rem;
  margin-left: 20px;
`
const RoundButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`

// const RoundButton = styled.div`
//   width: 1.8rem;
//   height: 1.8rem;
//   border-radius: 23px;
// `;

const UGURightsWrapper = styled.div`
  color: rgba(255, 255, 255, 1);
  margin-top: 2rem;
  margin-left: 20px;
`

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['footer'], null, ['en', 'ua'])),
    },
  }
}

const Footer = () => {
  const { t } = useTranslation(['footer'])

  return (
    <FooterSection>
      <FooterSectionWrapper>
        {
          <FooterWrapper>
            <FooterLogo>
              <EdugramIconWithCompanyName />
            </FooterLogo>
            <LinksWrapper>
              <LinkBlock>
                <SectionTitle>{t('footer Title.Learn More')}</SectionTitle>
                <SectionLink>{t('footer Links.About')}</SectionLink>
                <SectionLink>{t('footer Links.Become Author')}</SectionLink>
                <SectionLink>{t('footer Links.Our Goal')}</SectionLink>
                <SectionLink>{t('footer Links.How It Works')}</SectionLink>
              </LinkBlock>
              <LinkBlock>
                <SectionTitle>{t('footer Title.Opportunities')}</SectionTitle>
                <SectionLink>{t('footer Links.Premium')}</SectionLink>
                <SectionLink>{t('footer Links.Careers')}</SectionLink>
                <SectionLink>{t('footer Links.Partners')}</SectionLink>
                <SectionLink>{t('footer Links.Business')}</SectionLink>
              </LinkBlock>
              <LinkBlock>
                <SectionTitle>{t('footer Title.Rewards')}</SectionTitle>
                <SectionLink>{t('footer Links.Invite Friends')}</SectionLink>
                <SectionLink>{t('footer Links.Promotions')}</SectionLink>
                <SectionLink>{t('footer Links.Certificates')}</SectionLink>
                <SectionLink></SectionLink>
              </LinkBlock>
              <LinkBlock>
                <SectionTitle>{t('footer Title.Support')}</SectionTitle>
                <SectionLink>{t('footer Links.FAQ')}</SectionLink>
                <SectionLink>{t('footer Links.Contact')}</SectionLink>
                <SectionLink>{t('footer Links.Parents')}</SectionLink>
                <SectionLink>{t('footer Links.Schools')}</SectionLink>
              </LinkBlock>
            </LinksWrapper>
            <SocialMediaWrapper>
              <SectionTitle>{t('footer Title.Social Media')}</SectionTitle>
              <RoundButtonsWrapper>
                <RoundButton
                  onClick={() => {}}
                  width="1.9rem"
                  height="1.9rem"
                  color="#1A1E3D"
                >
                  <GooglePlusIcon />
                </RoundButton>
                <RoundButton
                  onClick={() => {}}
                  width="1.9rem"
                  height="1.9rem"
                  color="#1A1E3D"
                  marginLeft="5px"
                >
                  <FacebookLogoIcon />
                </RoundButton>
                <RoundButton
                  onClick={() => {}}
                  width="1.9rem"
                  height="1.9rem"
                  color="#1A1E3D"
                  marginLeft="5px"
                >
                  <InstagramIcon />
                </RoundButton>
                <RoundButton
                  onClick={() => {}}
                  width="1.9rem"
                  height="1.9rem"
                  color="#1A1E3D"
                  marginLeft="5px"
                >
                  <YoutubeIcon />
                </RoundButton>
                <RoundButton
                  onClick={() => {}}
                  width="1.9rem"
                  height="1.9rem"
                  color="#1A1E3D"
                  marginLeft="5px"
                >
                  <TweeterLogoIcon />
                </RoundButton>
              </RoundButtonsWrapper>
            </SocialMediaWrapper>
          </FooterWrapper>
        }
        <SeparatorLine></SeparatorLine>
        <UGURightsWrapper>{t('rights')}</UGURightsWrapper>
      </FooterSectionWrapper>
    </FooterSection>
  )
}

export default Footer
