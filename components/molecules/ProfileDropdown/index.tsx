import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import {
  languageLabel,
  logoutLabel,
  myAccountLabel,
  myCoursesLable,
} from 'configs/constants/labels/menu-labels'
import EnglishIcon from 'public/static/icons/languageIcons/english-icon'
import UkraineIcon from 'public/static/icons/languageIcons/ukraine-icon'
import { useAuth } from '@hooks/useAuth'
import { colors } from '@configs/styles/config'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import UserProfileCard from '@components/atoms/UserProfileCard/UserProfileCard'

type ProfileDropdownProps = {
  top?: string
  right?: string
  setShow: (show: boolean) => void
}

const СartDropdownContainer = styled.div<{
  empty: boolean
  top: string
  right: string
}>`
  min-width: 12.5rem;
  display: flex;
  flex-direction: ${(props) => (props.empty ? 'row' : 'column')};
  top: 4.5rem;
  right: -6rem;
  transform: translateX(-45%);
  position: absolute;
  background-color: #ffffff;
  border-radius: 18px 0px 18px 18px;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.08);
  padding: 1rem 0.7rem 0rem 0.7rem;
  z-index: 10;
  overflow: hidden;
`

const RowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  //cross browser commands to hide scrollbar, but allow scrolling
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent Chrome */
  }
`
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
  border-radius: 2rem;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.5rem;
`

const SettingsButton = styled.div`
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: ${colors.uguPurple};
  &:hover {
    color: ${colors.uguBlue};
    cursor: pointer;
  }
`

const LanguageTextWrapper = styled.div`
  font-size: 0.875rem;

  &:hover {
    color: ${colors.uguBlue};
    cursor: pointer;
  }
`
const ExitButton = styled.div`
  font-size: 0.875rem;
  opacity: 0.25;
  margin-top: 1rem;
  &:hover {
    opacity: 1;
    color: ${colors.uguRed};
    cursor: pointer;
  }
`

const LanguageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`
const LanguageIconWrapper = styled.div`
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.25rem;
  border-radius: 50%;
  overflow: hidden;
`

// const DarkModeWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   margin-top: 15px;
//   align-items: center;
//   border-bottom: 1px #ddd solid;
//   padding-bottom: 10px;
// `

// const DarkModeText = styled.div`
//   font-size: 15px;
// `

// const SwitchInput = styled.input`
//   opacity: 0;
//   width: 0;
//   height: 0;

//   &:checked + span {
//     background-color: black;
//   }

//   &:focus + span {
//     box-shadow: 0 0 1px black;
//   }

//   &:checked + span:before {
//     background-color: white;
//     transform: translateX(15px);
//   }
// `

// const SwitchSlider = styled.span`
//   position: absolute;
//   cursor: pointer;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: white;
//   border: 1px solid ${colors.uguPurple};
//   transition: 0.4s;
//   border-radius: 34px;

//   &:before {
//     position: absolute;
//     content: '';
//     height: 14px;
//     width: 14px;
//     left: 2px;
//     bottom: 2px;
//     background-color: black;
//     transition: 0.4s;
//     border-radius: 50%;
//   }
// `

// const SwitchContainer = styled.label`
//   position: relative;
//   display: inline-block;
//   width: 35px;
//   height: 20px;
// `

const LanguageSelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.7rem;
  margin-top: 10px;
`

const LanguageLeftSide = styled.div`
  display: flex;
`

const LanguageRightSide = styled.div`
  font-size: 0.95rem;
`

const LanguageSelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.7rem;
`

const LanguageSelectionHeaderText = styled.div`
  font-size: 16px;
`

const ProfileDropdown: React.FC<ProfileDropdownProps> = (props) => {
  const { top = '', right = '', setShow } = props
  const [isEmpty] = useState(false)
  // const [isDarkModeOn, setIsDarkModeOn] = useState(false)
  const [languageSelection, setLanguageSelection] = useState(false)
  const [languageSelectionHide, setLanguageSelectionHide] = useState(false)
  const { logout } = useAuth()
  // const userDispatch = useUserDispatch()
  const { i18n } = useTranslation()

  const router = useRouter()

  const handleLogout = () => {
    logout()
    // firebase.auth().signOut()
    // userDispatch({ type: 'logout' })
  }

  useEffect(() => {
    if (languageSelection == false)
      setTimeout(() => setLanguageSelectionHide(false), 300)
    else setLanguageSelectionHide(true)
  }, [languageSelection])

  const changeLanguage = (lang: string) => {
    //i18n.changeLanguage(lang);
    //router.locale = lang || "en";

    const { pathname, asPath, query } = router
    // change just the locale and maintain all other route information including href's query
    router.push({ pathname, query }, asPath, { locale: lang || 'en' })

    setLanguageSelection(false)
    localStorage.setItem('edugram-language', lang)
  }

  return (
    <СartDropdownContainer empty={isEmpty} top={top} right={right}>
      <>
        <RowsWrapper>
          <Link href="/account" style={{ textDecoration: 'none' }}>
            <ProfileWrapper>
              <UserProfileCard />
            </ProfileWrapper>
          </Link>
          {/* 
Hidden before implementation
          <DarkModeWrapper>
            <DarkModeText>Dark Mode</DarkModeText>
            <SwitchContainer>
              <SwitchInput
                type="checkbox"
                checked={isDarkModeOn}
                onChange={() => setIsDarkModeOn(!isDarkModeOn)}
              />
              <SwitchSlider />
            </SwitchContainer>
          </DarkModeWrapper> */}

          <SettingsWrapper>
            <Link href="/my-courses" style={{ textDecoration: 'none' }}>
              <SettingsButton
                onClick={() => {
                  setShow(false)
                }}
                style={{ color: colors.uguBlue }}
              >
                {myCoursesLable}
              </SettingsButton>
            </Link>

            <Link href="/account" style={{ textDecoration: 'none' }}>
              <SettingsButton>{myAccountLabel}</SettingsButton>
            </Link>

            <LanguageWrapper onClick={() => setLanguageSelection(true)}>
              <LanguageTextWrapper>{languageLabel}</LanguageTextWrapper>
              <LanguageIconWrapper>
                <div style={{ width: '150%' }}>
                  {i18n.language == 'en' ? (
                    <EnglishIcon />
                  ) : i18n.language == 'ua' ? (
                    <UkraineIcon />
                  ) : null}
                </div>
              </LanguageIconWrapper>
            </LanguageWrapper>
            <ExitButton
              onClick={() => {
                handleLogout()
                setShow(false)
                router.reload()
              }}
            >
              {logoutLabel}
            </ExitButton>
          </SettingsWrapper>
        </RowsWrapper>
      </>
      {languageSelectionHide ? (
        <motion.div
          style={{
            width: '100%',
            background: 'white',
            position: 'absolute',
            left: '-0.03rem',
            height: '290px',
            borderRadius: '18px',
          }}
          initial={{ x: languageSelection ? 250 : 0 }}
          animate={{ x: languageSelection ? 0 : 250 }}
          transition={{ duration: 0.3 }}
        >
          <LanguageSelectHeader>
            <LanguageSelectionHeaderText
              onClick={() => setLanguageSelection(false)}
              style={{ cursor: 'pointer' }}
            >
              ←
            </LanguageSelectionHeaderText>

            <LanguageSelectionHeaderText>
              Select Language
            </LanguageSelectionHeaderText>

            <LanguageSelectionHeaderText> </LanguageSelectionHeaderText>
          </LanguageSelectHeader>
          <div>
            <LanguageSelectWrapper>
              <LanguageLeftSide>
                <LanguageIconWrapper>
                  <div style={{ width: '150%' }}>
                    <EnglishIcon />
                  </div>
                </LanguageIconWrapper>
                <LanguageTextWrapper
                  onClick={() => {
                    changeLanguage('en')
                  }}
                >
                  English
                </LanguageTextWrapper>
              </LanguageLeftSide>
              <LanguageRightSide>EN</LanguageRightSide>
            </LanguageSelectWrapper>

            <LanguageSelectWrapper>
              <LanguageLeftSide>
                <LanguageIconWrapper>
                  <div style={{ width: '150%' }}>
                    <UkraineIcon />
                  </div>
                </LanguageIconWrapper>
                <LanguageTextWrapper
                  onClick={() => {
                    changeLanguage('ua')
                  }}
                >
                  Ukrainian
                </LanguageTextWrapper>
              </LanguageLeftSide>
              <LanguageRightSide>UA</LanguageRightSide>
            </LanguageSelectWrapper>
          </div>
        </motion.div>
      ) : null}
    </СartDropdownContainer>
  )
}

export default ProfileDropdown
