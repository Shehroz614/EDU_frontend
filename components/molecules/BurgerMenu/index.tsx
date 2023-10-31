import React, { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { colors } from '@configs/styles/config'
import styled from '@emotion/styled'
import CartIcon from '@public/static/icons/headerIcons/cart-icon'
import WishlistIcon from '@public/static/icons/headerIcons/wishlist-icon'
import MyCoursesIcon from '@public/static/icons/headerIcons/my-courses-icon'
import UserProfileCard from '@components/atoms/UserProfileCard/UserProfileCard'
import Link from 'next/link'
import { useAuth } from '@hooks/useAuth'
import LoginModal from '@components/organisms/LoginModal'

type BurgerMenuProps = {
  display: boolean
  setDisplay: Function
}

const MenuBg = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 12;
  position: absolute;
  left: 0;
`
const LoginButton = styled.button`
  height: 100%;
  font-size: 0.875rem;
  margin-left: 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`

const MenuHeaderText = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: #222;
`

const MenuClosButton = styled.div`
  font-size: 15px;
  background: #ddd;
  width: 30px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
`

const MenuContainer = styled.div`
  max-width: 600px;
  margin: auto;
  flex: 1;
`
const CrossWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  padding-right: 15px;
`

// const MenuCategory = styled.div`
//   border: 1px solid rgb(26, 30, 61);
//   border-radius: 20px;
//   padding: 3px 20px;
//   margin: 5px 10px;
//   text-align: center;
//   max-width: 200px;
//   white-space: nowrap;
// `

// const CategoriesPart = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   margin-top: 20px;
// `

const FunctionalityPart = styled.div`
  padding: 30px 15px;
`

const FunctionButton = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`

const FunctionButtonText = styled.div`
  font-size: 19px;
  margin-left: 10px;
`

const ProfileBlock = styled.div`
  padding-bottom: 20px;
  padding-left: 15px;
`

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`

const ProfileName = styled.div`
  font-size: 17px;
  margin-left: 10px;
`

const BurgerMenuWrapper = styled.div`
  display: none;
  @media (max-width: 991px) {
    display: block;
  }
`

const BurgerMenu: React.FC<BurgerMenuProps> = (props) => {
  const [width, setWidth] = useState(0)
  const [hide, setHide] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  const { display, setDisplay } = props
  const { authState } = useAuth()

  const menuWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = menuWrapper.current
    if (element) {
      setWidth(element.offsetWidth)
    }
  }, [])

  useEffect(() => {
    opacity.set(toggleOpacity.get())
    if (!display) {
      setTimeout(() => setHide(true), 300)
    } else {
      setHide(false)
    }
  }, [display])

  useEffect(() => {
    const handleBodyScroll = (event: Event) => {
      if (display) {
        event.preventDefault()
      }
    }
    document.body.addEventListener('touchmove', handleBodyScroll, {
      passive: false,
    })

    return () => {
      document.body.removeEventListener('touchmove', handleBodyScroll)
    }
  }, [display])
  useEffect(() => {
    if (authState.isAuthenticated && showLoginModal) {
      setShowLoginModal(false)
    }
  }, [authState.isAuthenticated])

  const closeLoginModalHandler = () => {
    setShowLoginModal(false)
  }

  const opacity = useMotionValue(1)
  const toggleOpacity = useTransform(opacity, (value) => (value < 1 ? 1 : 0))

  return (
    <BurgerMenuWrapper>
      {!hide ? (
        <>
          <MenuBg
            onClick={() => {
              setDisplay(false)
            }}
          ></MenuBg>
          <motion.div
            initial={{ x: display ? width : 0 }}
            animate={{ x: display ? 0 : width }}
            transition={{ duration: 0.3 }}
            style={{
              width: '93vw',
              position: 'absolute',
              background: colors.uguWhite,
              height: '98vh',
              zIndex: 23,
              right: '0px',
              borderTopLeftRadius: '30px',
              borderBottomLeftRadius: '30px',
            }}
            ref={menuWrapper}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <CrossWrapper>
                <MenuClosButton onClick={() => setDisplay(false)}>
                  ╳
                </MenuClosButton>
              </CrossWrapper>
              <MenuContainer>
                <MenuHeader>
                  <MenuHeaderText>Menu</MenuHeaderText>
                </MenuHeader>

                {/* <CategoriesPart>
                  <MenuCategory>Development</MenuCategory>
                  <MenuCategory>Design</MenuCategory>
                  <MenuCategory>Business</MenuCategory>
                  <MenuCategory>Finance</MenuCategory>
                  <MenuCategory>3D Design</MenuCategory>
                  <MenuCategory>Math</MenuCategory>
                  <MenuCategory>Technology</MenuCategory>
                  <MenuCategory>Music</MenuCategory>
                  <MenuCategory>Marketing</MenuCategory>
                </CategoriesPart> */}

                {authState.isAuthenticated && (
                  <Link href="/account" style={{ textDecoration: 'none' }}>
                    <UserProfileCard />
                  </Link>
                )}

                {!authState.isAuthenticated && (
                  <LoginButton onClick={() => setShowLoginModal(true)}>
                    Login / Registration
                  </LoginButton>
                )}
                {showLoginModal && (
                  <LoginModal onClose={closeLoginModalHandler} />
                )}

                <FunctionalityPart>
                  <Link href={'/my-courses'}>
                    <FunctionButton>
                      <MyCoursesIcon height="20px" width="25px" />

                      <FunctionButtonText>My courses</FunctionButtonText>
                    </FunctionButton>
                  </Link>
                  <Link href={'/wishlist'}>
                    <FunctionButton>
                      <WishlistIcon
                        height="20px"
                        width="25px"
                        color={'#1A1E3D'}
                      />
                      <FunctionButtonText>Wishlist</FunctionButtonText>
                    </FunctionButton>
                  </Link>
                  <Link href={'/cart'}>
                    <FunctionButton>
                      <CartIcon height="20px" width="25px" color={'#1A1E3D'} />
                      <FunctionButtonText>Cart</FunctionButtonText>
                    </FunctionButton>
                  </Link>

                  {/* <FunctionButton>
                    <NotificationIcon height="20px" width="25px" />
                    <FunctionButtonText>Notifications</FunctionButtonText>
                  </FunctionButton> */}
                </FunctionalityPart>
              </MenuContainer>
              <ProfileBlock>
                <ProfileInfo>
                  <div
                    style={{
                      width: '35px',
                      height: '35px',
                      background: '#ccc',
                      borderRadius: '50%',
                    }}
                  ></div>
                  <ProfileName>Andrew</ProfileName>
                </ProfileInfo>
              </ProfileBlock>
            </div>
          </motion.div>
        </>
      ) : null}
    </BurgerMenuWrapper>
  )
}

export default BurgerMenu
