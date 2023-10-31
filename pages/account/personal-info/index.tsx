// Importing libraries
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button, Input } from '@nextui-org/react'

// Importing components and hooks
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import AdaptiveSettingsMenuItem from '@components/molecules/AdaptiveSettingsMenuItem/AdaptiveSettingsMenuItem'
import Collapse from '@components/atoms/Collapse/Collapse'
import ProfileInfoIllustration from '@public/static/vectorIllustrations/profileInfoIllustration'

// Importing helpers and constants
import { useAuth } from '@hooks/useAuth'
import { updateProfileInfo } from '@helpers/userHelpers'
import { minimumUserAge } from '@constants/ageLimits'
import { useTranslation } from 'next-i18next'

// Importing styled components from another file
import {
  ContentWrapper,
  MobileMenuItemsContainer,
  Title,
  Wrapper,
  HorizontalFlex,
  Hr,
  SettingsContainer,
  InputLineContainer,
  ButtonContainer,
} from '../../../styled_components/account/accountStyledComponents'
import UploadAvatar from '@components/molecules/UploadAvatar/UploadAvatar'
import FullNameSetting from '@components/molecules/FullNameSetting/FullNameSetting'

const Illustration = styled(ProfileInfoIllustration)`
  position: sticky;
  top: 20px;
  margin-left: 3rem;
  @media (max-width: 770px) {
    display: none;
  }
`
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
const formatDateToISO = (date: Date | undefined | null) => {
  return date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`
    : ''
}

const parseISOToDate = (isoString: string) => {
  const [year, month, day] = isoString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const getMinMaxDates = () => {
  const minAgeDate = new Date()
  minAgeDate.setHours(0, 0, 0, 0)
  minAgeDate.setDate(minAgeDate.getDate() - 1)
  minAgeDate.setFullYear(minAgeDate.getFullYear() - minimumUserAge)

  const maxAgeDate = new Date()
  maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 150)

  const minAgeDateString = formatDateToISO(minAgeDate)
  const maxAgeDateString = formatDateToISO(maxAgeDate)

  return { minAgeDate: minAgeDateString, maxAgeDate: maxAgeDateString }
}

const PersonalInfoSettings = () => {
  const { minAgeDate, maxAgeDate } = getMinMaxDates()

  const router = useRouter()
  const { authState, updateCurrentUserFromResponse } = useAuth()
  const { isAuthenticated, isLoading } = authState
  const { t } = useTranslation(['account'])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [dateOfBirthInput, setDateOfBirthInput] = useState('')
  const [isNameSettingsOpen, setIsNameSettingsOpen] = useState(false)
  const [isDateOfBirthSettingsOpen, setIsDateOfBerthSettingsOpen] =
    useState(false)
  const [isAnySettingOpen, setIsAnySettingOpen] = useState(false)

  useEffect(() => {
    setFirstName(authState.user?.first_name || '')
    setLastName(authState.user?.last_name || '')
    setDateOfBirth(authState.user?.date_of_birth || null)

    setDateOfBirthInput(formatDateToISO(authState.user?.date_of_birth) || '')
  }, [authState])

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push({ pathname: '/', query: { showAuth: 'true' } })
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    if (isNameSettingsOpen || isDateOfBirthSettingsOpen) {
      setIsAnySettingOpen(true)
    } else {
      setIsAnySettingOpen(false)
    }
  }, [isNameSettingsOpen, isDateOfBirthSettingsOpen])

  const handleDateOfBirthSaving = () => {
    if (dateOfBirthInput !== formatDateToISO(dateOfBirth)) {
      updateProfileInfo({
        date_of_birth: parseISOToDate(dateOfBirthInput),
      }).then((rawUser) => {
        updateCurrentUserFromResponse(rawUser)
        setIsDateOfBerthSettingsOpen(false)
      })
    } else {
      console.log('No changes to save.')
    }
  }

  const isDateOfBirthValid = () => {
    return !(
      dateOfBirthInput === formatDateToISO(dateOfBirth) ||
      !new Date(dateOfBirthInput).getTime() ||
      new Date(minAgeDate) < new Date(dateOfBirthInput) ||
      new Date(maxAgeDate) > new Date(dateOfBirthInput)
    )
  }

  return (
    isAuthenticated && (
      <Layout>
        <Wrapper>
          <ContentWrapper>
            <Title>Personal info</Title>
            <HorizontalFlex>
              <MobileMenuItemsContainer>
                <UploadAvatar disabled={isAnySettingOpen} />

                <Hr />

                <Collapse
                  isOpen={isNameSettingsOpen}
                  header={
                    <AdaptiveSettingsMenuItem
                      title={t('Name')}
                      displayMode={'mobile'}
                      actionMode="edit"
                      description={`${firstName} ${lastName}`}
                      onEditButtonClick={() =>
                        setIsNameSettingsOpen(!isNameSettingsOpen)
                      }
                      isDropDownOpen={isNameSettingsOpen}
                      disabled={isAnySettingOpen && !isNameSettingsOpen}
                    />
                  }
                >
                  <FullNameSetting
                    onClose={() => setIsNameSettingsOpen(false)}
                  />
                </Collapse>

                <Hr />

                <Collapse
                  isOpen={isDateOfBirthSettingsOpen}
                  header={
                    <AdaptiveSettingsMenuItem
                      title={t('Date of birth')}
                      displayMode="mobile"
                      actionMode="edit"
                      description={
                        dateOfBirth instanceof Date
                          ? dateOfBirth.toLocaleDateString(router.locale)
                          : t('Add date of birth')
                      }
                      onEditButtonClick={() =>
                        setIsDateOfBerthSettingsOpen(!isDateOfBirthSettingsOpen)
                      }
                      isDropDownOpen={isDateOfBirthSettingsOpen}
                      disabled={isAnySettingOpen && !isDateOfBirthSettingsOpen}
                    />
                  }
                >
                  <SettingsContainer>
                    <InputLineContainer>
                      <Input
                        type="date"
                        bordered
                        width="100%"
                        label={t('Date of birth')}
                        value={dateOfBirthInput}
                        onChange={(e) => setDateOfBirthInput(e.target.value)}
                        min={maxAgeDate}
                        max={minAgeDate}
                      />
                    </InputLineContainer>
                    <ButtonContainer>
                      <Button
                        bordered
                        onPress={handleDateOfBirthSaving}
                        disabled={!isDateOfBirthValid()}
                        style={{ alignSelf: 'flex-end' }}
                      >
                        {t('Submit')}
                      </Button>
                    </ButtonContainer>
                  </SettingsContainer>
                </Collapse>
                <Hr />
              </MobileMenuItemsContainer>
              <Illustration />
            </HorizontalFlex>
          </ContentWrapper>
        </Wrapper>
      </Layout>
    )
  )
}

export default PersonalInfoSettings
