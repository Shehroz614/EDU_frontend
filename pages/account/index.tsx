import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@components/organisms/Layouts/WithoutSidebar'
import AdaptiveSettingsMenuItem from '@components/molecules/AdaptiveSettingsMenuItem/AdaptiveSettingsMenuItem'
import UserProfileCard from '@components/atoms/UserProfileCard/UserProfileCard'
import Collapse from '@components/atoms/Collapse/Collapse'
import { useAuth } from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'

import { Button } from '@nextui-org/react'

import {
  ContentWrapper,
  DesktopMenuItemsContainer,
  FirstGridRow,
  MobileMenuItemsContainer,
  Title,
  Wrapper,
} from '../../styled_components/account/accountStyledComponents'

import UserCircleIcon from '@public/static/icons/profile/userCircleIcon'
import ShieldIcon from '@public/static/icons/profile/shieldIcon'
import PaymentsIcon from '@public/static/icons/profile/paymentsIcon'
import TaxesIcon from '@public/static/icons/profile/taxesIcon'
import BellIcon from '@public/static/icons/profile/bellIcon'
import EyeIcon from '@public/static/icons/profile/eyeIcon'
import CardIdIcon from '@public/static/icons/profile/cardIdIcon'
import GearSettingsIcon from '@public/static/icons/profile/gearSettingsIcon'
import SupportIcon from '@public/static/icons/profile/supportIcon'
import FAQIcon from '@public/static/icons/profile/FAQIcon'
import ReportProblemIcon from '@public/static/icons/profile/reportProblemIcon'

const MenuItemsContainer = ({
  isMobile,
  children,
}: React.PropsWithChildren<{ isMobile: boolean }>) => {
  return isMobile ? (
    <MobileMenuItemsContainer>{children}</MobileMenuItemsContainer>
  ) : (
    <DesktopMenuItemsContainer>{children}</DesktopMenuItemsContainer>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'account',
        'common',
        'footer',
      ])),
    },
  }
}

const Account = () => {
  const router = useRouter()
  // const [userType, setUserType] = useState<'student' | 'author'>('student')

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 480 : false
  )

  const [isCollapseOpen, setIsCollapsed] = useState(false)

  const { authState, logout } = useAuth()
  const { isAuthenticated, isLoading } = authState

  const { t } = useTranslation(['account'])

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push({ pathname: '/', query: { showAuth: 'true' } })
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 740)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    isAuthenticated && (
      <Layout>
        <Wrapper>
          <ContentWrapper>
            <MenuItemsContainer isMobile={isMobile}>
              <FirstGridRow>
                <Title>{t('account')}</Title>
                <UserProfileCard />
                {isMobile && <hr />}
              </FirstGridRow>
              <AdaptiveSettingsMenuItem
                title={t('Personal info')}
                displayMode={isMobile ? 'mobile' : 'desktop'}
                icon={<UserCircleIcon />}
                description={t(
                  'Provide personal details and how we can reach you'
                )}
                hideDescription={isMobile}
                href="/account/personal-info"
              />

              <Collapse
                renderChildrenOnly={!isMobile}
                isOpen={isCollapseOpen}
                header={
                  <AdaptiveSettingsMenuItem
                    title={t('Account')}
                    displayMode={'mobile'}
                    actionMode="dropDown"
                    icon={<GearSettingsIcon />}
                    onClick={() => setIsCollapsed(!isCollapseOpen)}
                    isDropDownOpen={isCollapseOpen}
                  />
                }
              >
                <AdaptiveSettingsMenuItem
                  title={t('Author info')}
                  displayMode={isMobile ? 'mobile' : 'desktop'}
                  icon={<CardIdIcon />}
                  description={t(
                    ` This is what will be displayed on your author's page, which is visible to your students.`
                  )}
                  hideDescription={isMobile}
                  href="/account/author-profile-settings"
                />
                <AdaptiveSettingsMenuItem
                  title={t('Login & Security')}
                  displayMode={isMobile ? 'mobile' : 'desktop'}
                  icon={<ShieldIcon />}
                  description={t(
                    'Modify your secret code and fortify the safety of your profile'
                  )}
                  hideDescription={isMobile}
                  disabled
                />
                <AdaptiveSettingsMenuItem
                  title={t('Payments & Payouts')}
                  displayMode={isMobile ? 'mobile' : 'desktop'}
                  icon={<PaymentsIcon />}
                  description={t(
                    'Examine financial transactions, voucher usage, and gift card history'
                  )}
                  hideDescription={isMobile}
                  disabled
                />
                <AdaptiveSettingsMenuItem
                  title={t('Taxes')}
                  displayMode={isMobile ? 'mobile' : 'desktop'}
                  icon={<TaxesIcon />}
                  description={t(
                    'Administer your taxpayer credentials and related paperwork'
                  )}
                  hideDescription={isMobile}
                  disabled
                />
                <AdaptiveSettingsMenuItem
                  title={t('Notifications')}
                  displayMode={isMobile ? 'mobile' : 'desktop'}
                  icon={<BellIcon />}
                  description={t(
                    'Set your alert preferences and your favored means of contact'
                  )}
                  hideDescription={isMobile}
                  disabled
                />
                <AdaptiveSettingsMenuItem
                  title={t('Privacy & Sharing')}
                  displayMode={isMobile ? 'mobile' : 'desktop'}
                  icon={<EyeIcon />}
                  description={t(
                    'Oversee your private information, affiliated services, and preferences regarding data sharing'
                  )}
                  hideDescription={isMobile}
                  disabled
                />
              </Collapse>
            </MenuItemsContainer>
            {isMobile && (
              <>
                <hr />
                <Title>Support</Title>
                <MenuItemsContainer isMobile={true}>
                  <AdaptiveSettingsMenuItem
                    title={t('Contact support')}
                    displayMode="mobile"
                    icon={<SupportIcon />}
                    hideDescription={isMobile}
                    disabled
                  />
                  <AdaptiveSettingsMenuItem
                    title={t('FAQ')}
                    displayMode="mobile"
                    icon={<FAQIcon />}
                    hideDescription={isMobile}
                    disabled
                  />
                  <AdaptiveSettingsMenuItem
                    title={t('Report a problem')}
                    displayMode="mobile"
                    icon={<ReportProblemIcon />}
                    hideDescription={isMobile}
                    disabled
                  />
                </MenuItemsContainer>
                <Button bordered style={{ width: '100%' }} onPress={logout}>
                  {t('Log out')}
                </Button>
              </>
            )}
          </ContentWrapper>
        </Wrapper>
      </Layout>
    )
  )
}

export default Account
