// Import libraries
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button, Input } from '@nextui-org/react'

// Import components and hooks
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import AdaptiveSettingsMenuItem from '@components/molecules/AdaptiveSettingsMenuItem/AdaptiveSettingsMenuItem'
import Collapse from '@components/atoms/Collapse/Collapse'
import AuthorProfileSettingsIllustration from '@public/static/vectorIllustrations/authorProfileSettingsIllustration'
import UploadAvatar from '@components/molecules/UploadAvatar/UploadAvatar'
import TinyEditor from '@components/molecules/TinyEditor'
import AuthorSocialLink from '@components/atoms/AuthorSocialLink/AuthorSocialLink'
import CountrySelector from '@components/atoms/CountrySelector/CountrySelector'
import UploadAuthorIntroVideo from '@components/molecules/UploadAuthorIntroVideo/UploadAuthorIntroVideo'

// Import helpers, services, and types
import { useAuth } from '@hooks/useAuth'
import { updateProfileInfo } from '@helpers/userHelpers'
import { useTranslation } from 'next-i18next'
import { parseSocialLink } from '@helpers/parseSocialLinkHelper'
import { getAuthorDetails } from '@services/api/author'
import { User, UserProfileUpdate } from '@type/index'

// Import styled components
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
import FullNameSetting from '@components/molecules/FullNameSetting/FullNameSetting'

type SocialLinks = User['socials']

// Styled components
const IllustrationContainer = styled.div`
  position: relative;
  height: 100%;
`

const Illustration = styled(AuthorProfileSettingsIllustration)`
  position: sticky;
  top: 20px;
  margin-left: 3rem;
  @media (max-width: 770px) {
    display: none;
  }
`

const SocialLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
`

// This function fetches server side translations for the component
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'account',
        'common',
        'footer',
        'authorProfileSettings',
      ])),
    },
  }
}

const AuthorProfileSettings = () => {
  // Hooks and Contexts
  const router = useRouter()
  const { t } = useTranslation(['authorProfileSettings'])
  const { authState, updateCurrentUserFromResponse } = useAuth()

  // Destructure necessary data from the auth state
  const { isAuthenticated, isLoading } = authState

  // State definitions
  // Basic user info states
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // Social links states
  const [socialLinkInput, setSocialLinkInput] = useState('')
  const [authorSocialLinks, setAuthorSocialLinks] = useState<SocialLinks>([])

  // Website and location states
  const [websiteLinkInput, setWebsiteInput] = useState('')
  const [websiteLink, setWebsiteLink] = useState('')
  const [country, setCountry] = useState('')
  const [countryInput, setCountryInput] = useState('')

  // Self presentation text state
  const [selfPresentationText, setSelfPresentationText] = useState('')

  // UI Toggle states for different settings sections
  const [isNameSettingsOpen, setIsNameSettingsOpen] = useState(false)
  const [isAnySettingOpen, setIsAnySettingOpen] = useState(false)
  const [isVideoSettingsOpen, setIsVideoSettingsOpen] = useState(false)
  const [isLocationSettingsOpen, setIsLocationSettingsOpen] = useState(false)
  const [isSocialMediaSettingsOpen, setIsSocialMediaSettingsOpen] =
    useState(false)
  const [isWebsiteLinkSettingsOpen, setIsWebsiteLinkSettingsOpen] =
    useState(false)
  const [isSelfPresentationSettingsOpen, setIsSelfPresentationSettingsOpen] =
    useState(false)

  // Fetch author details once on component mount
  useEffect(() => {
    getAuthorDetails().then((res) => console.log(res))
  }, [])

  // Update local state when authState updates
  useEffect(() => {
    setFirstName(authState.user?.first_name || '')
    setLastName(authState.user?.last_name || '')

    setAuthorSocialLinks(authState.user?.socials || [])
    setWebsiteLink(authState.user?.website || '')
    setWebsiteInput(authState.user?.website || '')
    setCountry(authState.user?.country || '')
    setSelfPresentationText(authState.user?.introduction || '')
  }, [authState])

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push({ pathname: '/', query: { showAuth: 'true' } })
    }
  }, [isLoading, isAuthenticated, router])

  // Check if any of the settings sections are open
  useEffect(() => {
    if (
      isNameSettingsOpen ||
      isVideoSettingsOpen ||
      isLocationSettingsOpen ||
      isSocialMediaSettingsOpen ||
      isWebsiteLinkSettingsOpen ||
      isSelfPresentationSettingsOpen
    ) {
      setIsAnySettingOpen(true)
    } else {
      setIsAnySettingOpen(false)
    }
  }, [
    isNameSettingsOpen,
    isVideoSettingsOpen,
    isLocationSettingsOpen,
    isSocialMediaSettingsOpen,
    isWebsiteLinkSettingsOpen,
    isSelfPresentationSettingsOpen,
  ])

  // Validators

  // Social link input validation

  type InputValidator = {
    text: string
    color:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'warning'
      | 'error'
      | undefined
    isValid: boolean
  }
  const socialLinkValidator: InputValidator = useMemo(() => {
    const info = parseSocialLink(socialLinkInput)

    if (!socialLinkInput.length) {
      return {
        text: '',
        color: 'primary',
        isValid: false,
      }
    }

    if (!info) {
      return {
        text: t('Social media link is not detected'),
        color: 'error',
        isValid: false,
      }
    }

    const existingLink = authorSocialLinks?.find(
      (link) => link.name === info.type
    )
    if (existingLink) {
      if (existingLink.url === info.url) {
        return {
          text: t('linkAlreadyAdded', { type: info.type_name }),
          color: 'warning',
          isValid: false,
        }
      }

      return {
        text: t('linkWillOverwrite', { type: info.type_name }),
        color: 'warning',
        isValid: true,
      }
    }

    return {
      text: '',
      color: 'primary',
      isValid: true,
    }
  }, [socialLinkInput])

  // Website link input validation
  const websiteLinkValidator: InputValidator = useMemo(() => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '(?:[a-z\\d-]{2,}\\.)*' + // any subdomain(s) with at least two characters
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6}|' + // domain name or
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // port
        '(\\/[-a-z\\d%@_.~+&=:]*)*' + // path, added '@' here and added '=' and '&'
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment
      'i'
    )

    // Empty link
    if (!websiteLinkInput) {
      return {
        text: '',
        color: 'primary',
        isValid: false,
      }
    }

    // Invalid or empty link
    if (!urlPattern.test(websiteLinkInput)) {
      return {
        text: t('Website link is not detected or invalid'),
        color: 'error',
        isValid: false,
      }
    }

    // Valid link
    return {
      text: '',
      color: 'primary',
      isValid: true,
    }
  }, [websiteLinkInput])

  // Handlers for updating user data

  // Social links update handler
  const handleSocialLinksSavingToServer = (authorSocialLinksToUpdate) => {
    const authorData: UserProfileUpdate = {
      socials: [...authorSocialLinksToUpdate],
    }
    updateProfileInfo(authorData).then((rawUser) => {
      updateCurrentUserFromResponse(rawUser)
    })
  }

  // Add or update social link handler
  const handleSocialLinkSaving = () => {
    const info = parseSocialLink(socialLinkInput)
    if (authorSocialLinks === undefined) return
    if (info) {
      const existingLinkIndex = authorSocialLinks.findIndex(
        (link) => link.name === info.type
      )

      const updatedLinks = [...authorSocialLinks]
      if (existingLinkIndex !== -1) {
        updatedLinks[existingLinkIndex].url = info.url
      } else {
        updatedLinks.push({
          name: info.type,
          url: info.url,
        })
      }

      setAuthorSocialLinks(updatedLinks)
      setSocialLinkInput('')
      handleSocialLinksSavingToServer(updatedLinks)
    }
  }

  // Remove social link handler
  const handleSocialLinkDeleting = (link: string) => {
    if (!authorSocialLinks) return

    const type = parseSocialLink(link)?.type
    if (type) {
      const updatedLinks = authorSocialLinks.filter(
        (socialLink) => socialLink.name !== type
      )
      setAuthorSocialLinks(updatedLinks)
      handleSocialLinksSavingToServer(updatedLinks)
    }
  }

  // Website link handlers
  const handleWebsiteSaving = () => {
    const authorData: UserProfileUpdate = {
      website: websiteLinkInput,
    }
    updateProfileInfo(authorData).then((rawUser) => {
      updateCurrentUserFromResponse(rawUser)
      setIsWebsiteLinkSettingsOpen(false)
    })
  }

  const handleWebsiteDeleteHandle = () => {
    const authorData: UserProfileUpdate = {
      website: '',
    }
    updateProfileInfo(authorData).then((rawUser) => {
      updateCurrentUserFromResponse(rawUser)
      setIsWebsiteLinkSettingsOpen(false)
    })
  }

  // Location handlers
  const handleLocationSaving = () => {
    const authorData: UserProfileUpdate = {
      country: countryInput,
    }
    updateProfileInfo(authorData).then((rawUser) => {
      updateCurrentUserFromResponse(rawUser)
      setIsLocationSettingsOpen(false)
    })
  }

  const handleLocationDeleting = () => {
    const authorData: UserProfileUpdate = {
      country: '',
    }
    updateProfileInfo(authorData).then((rawUser) => {
      updateCurrentUserFromResponse(rawUser)
      setIsLocationSettingsOpen(false)
    })
  }

  // Self-presentation text handler
  const handleSelfPresentationTextSaving = () => {
    const authorData: UserProfileUpdate = {
      introduction: selfPresentationText,
    }
    updateProfileInfo(authorData).then((rawUser) => {
      updateCurrentUserFromResponse(rawUser)
      setIsSelfPresentationSettingsOpen(false)
    })
  }

  return (
    isAuthenticated && (
      <Layout>
        <Wrapper>
          <ContentWrapper>
            <Title>{t('Author Profile Page Settings')}</Title>
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
                    onClose={() => {
                      setIsNameSettingsOpen(false)
                    }}
                  />
                </Collapse>
                <Hr />
                {/* // Textual Self-Presentation */}
                <Collapse
                  isOpen={isSelfPresentationSettingsOpen}
                  header={
                    <AdaptiveSettingsMenuItem
                      title={t('About You (Text)')}
                      displayMode={'mobile'}
                      actionMode="edit"
                      description={t('Introduce yourself')}
                      onEditButtonClick={() =>
                        setIsSelfPresentationSettingsOpen(
                          !isSelfPresentationSettingsOpen
                        )
                      }
                      isDropDownOpen={isSelfPresentationSettingsOpen}
                      disabled={
                        isAnySettingOpen && !isSelfPresentationSettingsOpen
                      }
                    />
                  }
                >
                  <SettingsContainer>
                    <EditorWrapper>
                      <TinyEditor
                        type="textOnly"
                        placeholder={t('Enter your self presentation  here...')}
                        value={selfPresentationText}
                        onChange={(content) => {
                          setSelfPresentationText(content)
                        }}
                        width="100%"
                        height="400px"
                      />
                    </EditorWrapper>

                    <ButtonContainer>
                      <Button
                        bordered
                        onPress={handleSelfPresentationTextSaving}
                        disabled={false}
                      >
                        {t('Submit')}
                      </Button>
                    </ButtonContainer>
                  </SettingsContainer>
                </Collapse>
                <Hr />
                {/* // Self-Presentation Video */}
                <Collapse
                  isOpen={isVideoSettingsOpen}
                  header={
                    <AdaptiveSettingsMenuItem
                      title={t('Introduce Yourself (Video)')}
                      displayMode={'mobile'}
                      actionMode="edit"
                      description={t('Upload a video')}
                      onEditButtonClick={() =>
                        setIsVideoSettingsOpen(!isVideoSettingsOpen)
                      }
                      isDropDownOpen={isVideoSettingsOpen}
                      disabled={isAnySettingOpen && !isVideoSettingsOpen}
                    />
                  }
                >
                  <SettingsContainer>
                    <UploadAuthorIntroVideo
                      onClose={() => setIsVideoSettingsOpen(false)}
                    />
                  </SettingsContainer>
                </Collapse>
                <Hr />
                {/* // Social Media Links */}
                <Collapse
                  isOpen={isSocialMediaSettingsOpen}
                  header={
                    <AdaptiveSettingsMenuItem
                      title={t('Social Media Links')}
                      displayMode={'mobile'}
                      actionMode="edit"
                      description={t('Add or edit social media links')}
                      onEditButtonClick={() =>
                        setIsSocialMediaSettingsOpen(!isSocialMediaSettingsOpen)
                      }
                      isDropDownOpen={isSocialMediaSettingsOpen}
                      disabled={isAnySettingOpen && !isSocialMediaSettingsOpen}
                    />
                  }
                >
                  <SettingsContainer>
                    <InputLineContainer>
                      <Input
                        bordered
                        width="100%"
                        placeholder={t('Enter social media link')}
                        value={socialLinkInput}
                        onChange={(e) => setSocialLinkInput(e.target.value)}
                        color={socialLinkValidator.color}
                        helperColor={socialLinkValidator.color}
                        helperText={socialLinkValidator.text}
                      />
                    </InputLineContainer>
                    <ButtonContainer>
                      <Button
                        bordered
                        onPress={handleSocialLinkSaving}
                        disabled={!socialLinkValidator.isValid}
                      >
                        {t('Submit')}
                      </Button>
                    </ButtonContainer>
                    <SocialLinksContainer>
                      {authorSocialLinks?.map((socialLink) => (
                        <AuthorSocialLink
                          link={socialLink.url}
                          onDelete={() => {
                            handleSocialLinkDeleting(socialLink.url)
                          }}
                          key={socialLink.name}
                        />
                      ))}
                    </SocialLinksContainer>
                  </SettingsContainer>
                </Collapse>
                <Hr />

                {/* // Location */}
                <Collapse
                  isOpen={isLocationSettingsOpen}
                  header={
                    <AdaptiveSettingsMenuItem
                      title={t('Location')}
                      displayMode={'mobile'}
                      actionMode="edit"
                      description={country ? country : t('Where are you from?')}
                      onEditButtonClick={() =>
                        setIsLocationSettingsOpen(!isLocationSettingsOpen)
                      }
                      isDropDownOpen={isLocationSettingsOpen}
                      disabled={isAnySettingOpen && !isLocationSettingsOpen}
                    />
                  }
                >
                  <SettingsContainer>
                    <CountrySelector
                      initial={country ? country : undefined}
                      onSelect={(selectedCountry) =>
                        setCountryInput(selectedCountry)
                      }
                    />
                    <ButtonContainer>
                      <Button
                        bordered
                        onPress={handleLocationSaving}
                        disabled={!countryInput.length}
                      >
                        {t('Submit')}
                      </Button>
                    </ButtonContainer>
                    {!!country.length && (
                      <ButtonContainer>
                        <Button
                          // bordered
                          onPress={handleLocationDeleting}
                        >
                          {t('Delete')}
                        </Button>
                      </ButtonContainer>
                    )}
                  </SettingsContainer>
                </Collapse>
                <Hr />
                {/* // Website Link */}
                <Collapse
                  isOpen={isWebsiteLinkSettingsOpen}
                  header={
                    <AdaptiveSettingsMenuItem
                      title={t('Your Personal Website')}
                      displayMode={'mobile'}
                      actionMode="edit"
                      description={
                        websiteLink ? websiteLink : t('Add website link')
                      }
                      onEditButtonClick={() =>
                        setIsWebsiteLinkSettingsOpen(!isWebsiteLinkSettingsOpen)
                      }
                      isDropDownOpen={isWebsiteLinkSettingsOpen}
                      disabled={isAnySettingOpen && !isWebsiteLinkSettingsOpen}
                    />
                  }
                >
                  <SettingsContainer>
                    <InputLineContainer>
                      <Input
                        bordered
                        width="100%"
                        placeholder={t('Enter your website link')}
                        value={websiteLinkInput}
                        onChange={(e) => setWebsiteInput(e.target.value)}
                        color={websiteLinkValidator.color}
                        helperColor={websiteLinkValidator.color}
                        helperText={websiteLinkValidator.text}
                      />
                    </InputLineContainer>
                    <ButtonContainer>
                      <Button
                        bordered
                        onPress={handleWebsiteSaving}
                        disabled={!websiteLinkValidator.isValid}
                      >
                        {t('Submit')}
                      </Button>
                    </ButtonContainer>
                    {!!websiteLink.length && (
                      <ButtonContainer>
                        <Button
                          // bordered
                          onPress={handleWebsiteDeleteHandle}
                        >
                          {t('Delete')}
                        </Button>
                      </ButtonContainer>
                    )}
                  </SettingsContainer>
                </Collapse>
                <Hr />
              </MobileMenuItemsContainer>
              <IllustrationContainer>
                <Illustration />
              </IllustrationContainer>
            </HorizontalFlex>
          </ContentWrapper>
        </Wrapper>
      </Layout>
    )
  )
}

export default AuthorProfileSettings
