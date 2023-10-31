import React, { useEffect, useState } from 'react'
import CartIcon from '@public/static/icons/headerIcons/cart-icon'
import WishlistIcon from '@public/static/icons/headerIcons/wishlist-icon'
import MyCoursesIcon from '@public/static/icons/headerIcons/my-courses-icon'
import SearchBar from '@components/atoms/SearchBar'
import CategoriesDropdown from '@components/molecules/CategoriesDropdown'
import MyCoursesDropdown from '@components/molecules/MyCoursesDropdown'
import CartDropdown from '@components/molecules/CartDropdown'
import WishlistDropdown from '@components/molecules/WishlistDropdown'
import ProfileDropdown from '@components/molecules/ProfileDropdown'
import LoginModal from '@components/organisms/LoginModal'
import Button from '@components/atoms/Button'
import Link from 'next/link'
import { EdugramIconNew } from '@public/static/icons/edugramIcon'
import { categoriesLabel } from '@configs/constants/labels/menu-labels'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@hooks/useAuth'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import {
  HeaderContainer,
  InternalWrapper,
  Logo,
  CategoriesButton,
  SearchBarWrapper,
  AuthorWrapper,
  TeacherButton,
  ButtonsWrapper,
  ButtonWrapper,
  LoginButton,
  ProfileButton,
  Badge,
  SearchFiltersWrapper,
} from './styled.components'
import FiltersIcon from '@public/static/icons/filter-icon-new'
import { Modal, Text } from '@nextui-org/react'
import HeaderFilters from './HeaderFilters'

import { getEmptyFilters } from '@helpers/searchHelper'
import { useRouter } from 'next/router'
import { isUndefined } from 'lodash'
import UserAvatar from '@components/atoms/UserAvatar/UserAvatar'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { Filters } from '@type/index'

const Header = () => {
  const { t } = useTranslation()
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  // const [userLogin] = useState<boolean>(false)
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false)
  const [showMyCoursesDropdown, setShowMyCoursesDropdown] = useState(false)
  const [showCartDropdown, setShowCartDropdown] = useState(false)
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false)
  // [showNotificationsDropdown, setShowNotificationsDropdown] =
  //  useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [sort, setSort] = useState("{ 'meta.rating': 1 }")

  const [openFilters, setOpenFilters] = useState(false)

  const [filters, setFilters] = useState<Filters>(getEmptyFilters())

  const { authState } = useAuth()

  const { width } = useWindowDimensions()

  useEffect(() => {
    console.log('User from Context in Header:', authState.user)
    if (authState.isAuthenticated && showLoginModal) {
      setShowLoginModal(false)
    }
  }, [authState.isAuthenticated, authState.user, showLoginModal])

  const closeLoginModalHandler = () => {
    setShowLoginModal(false)
  }

  const { cartItems, wishlistItems } = useCartAndWishList()

  const router = useRouter()

  useEffect(() => {
    let newFilters = JSON.parse(JSON.stringify(filters))
    let newSort = "{ 'meta.rating': 1 }"
    if (!isUndefined(router.query.filters)) {
      newFilters = JSON.parse(router.query.filters?.toString())
    }
    if (!isUndefined(router.query.sort)) {
      newSort = router.query.sort?.toString()
    }
    setFilters(newFilters)
    setSort(newSort)
    console.log('Query update', newFilters)
  }, [router.query?.filters])

  return (
    <>
      <HeaderContainer>
        {/* <BurgerMenu display={menuDisplay} setDisplay={setMenuDisplay} /> */}
        <InternalWrapper>
          <div
            onClick={() => {
              window.location.replace('/')
            }}
            style={{ width: 290 }}
          >
            <Logo>
              {/* <LogoOnLight /> */}
              <EdugramIconNew width="290px" />
            </Logo>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              width: '100%',
            }}
          >
            {router.asPath.split('/')[1] != 'create-course' ? (
              <SearchFiltersWrapper>
                <CategoriesButton
                  onMouseEnter={() => setShowCategoriesDropdown(true)}
                  onMouseLeave={() => setShowCategoriesDropdown(false)}
                >
                  {categoriesLabel}
                  {showCategoriesDropdown && (
                    <CategoriesDropdown
                      key="categoriesDropdown"
                      setShowCategoriesDropdown={setShowCategoriesDropdown}
                    />
                  )}
                </CategoriesButton>
                <SearchBarWrapper>
                  <SearchBar
                    placeholder={t('header.searchAnyCourse', { ns: 'home' })}
                    width={'100%'}
                  />
                </SearchBarWrapper>
                <div
                  style={{ marginRight: 30, height: 19, cursor: 'pointer' }}
                  onClick={() => {
                    setOpenFilters(true)
                  }}
                >
                  <FiltersIcon></FiltersIcon>
                </div>
              </SearchFiltersWrapper>
            ) : (
              <div
                style={{
                  width: '70%',
                }}
              ></div>
            )}
            <AuthorWrapper>
              <Link href="/author" style={{ textDecoration: 'none' }}>
                <TeacherButton>
                  {authState.user?.isAuthor
                    ? `Author's Dashboard`
                    : 'Become Author'}
                </TeacherButton>
              </Link>
            </AuthorWrapper>
          </div>
          {!authState.isLoading && (
            <ButtonsWrapper
              style={
                router.asPath.split('/')[1] == 'create-course'
                  ? { paddingLeft: 15 }
                  : {}
              }
            >
              {authState.isAuthenticated && (
                <ButtonWrapper
                  onMouseEnter={() => setShowMyCoursesDropdown(true)}
                  onMouseLeave={() => setShowMyCoursesDropdown(false)}
                >
                  <Link href="/my-courses">
                    <Button>
                      <MyCoursesIcon height="1.2rem" />
                    </Button>
                  </Link>
                  <MyCoursesDropdown
                    showMyCoursesDropdown={showMyCoursesDropdown}
                  />
                </ButtonWrapper>
              )}
              <ButtonWrapper
                onMouseEnter={() => setShowWishlistDropdown(true)}
                onMouseLeave={() => setShowWishlistDropdown(false)}
              >
                <Link href="/wishlist">
                  <Button>
                    {wishlistItems?.length > 0 ? <Badge></Badge> : null}
                    <WishlistIcon height="1.2rem" color={'#1A1E3D'} />
                  </Button>
                </Link>
                {showWishlistDropdown && <WishlistDropdown />}
              </ButtonWrapper>
              <ButtonWrapper
                onMouseEnter={() => setShowCartDropdown(true)}
                onMouseLeave={() => setShowCartDropdown(false)}
              >
                {cartItems?.length > 0 ? <Badge></Badge> : null}
                <Link href="/cart">
                  <Button>
                    <CartIcon height="1.2rem" color={'#1A1E3D'} />
                  </Button>
                </Link>
                {showCartDropdown && <CartDropdown />}
              </ButtonWrapper>
              {authState.isAuthenticated && (
                <>
                  {/* <ButtonWrapper
                    onMouseEnter={() => setShowNotificationsDropdown(true)}
                    onMouseLeave={() => setShowNotificationsDropdown(false)}
                  >
                    <Badge></Badge>
                    <Link href="/">
                      <Button>
                        <NotificationIcon height="1.2rem" />
                      </Button>
                    </Link>
                    {showNotificationsDropdown && <NotificationsDropdown />}
                  </ButtonWrapper> */}
                  <div
                    onMouseEnter={() => setShowProfileDropdown(true)}
                    onMouseLeave={() => setShowProfileDropdown(false)}
                    style={{
                      marginLeft: 10,
                      position: 'relative',
                      height: 73,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <ProfileButton>
                      <UserAvatar size="100%" />
                    </ProfileButton>
                    {showProfileDropdown && (
                      <ProfileDropdown setShow={setShowProfileDropdown} />
                    )}
                  </div>
                </>
              )}
              {!authState.isAuthenticated && (
                <LoginButton onClick={() => setShowLoginModal(true)}>
                  {t('strings.Login / Registration')}
                </LoginButton>
              )}
            </ButtonsWrapper>
          )}
          {/* <HamburgerMenu
            onClick={() => {
              setMenuDisplay(!menuDisplay)
              console.log('Menu')
            }}
          >
            <HamburgerMenuIcon />
          </HamburgerMenu> */}
        </InternalWrapper>
      </HeaderContainer>
      {showLoginModal && <LoginModal onClose={closeLoginModalHandler} />}
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={openFilters}
        onClose={() => {
          setOpenFilters(false)
        }}
        width={'780px'}
        style={{
          marginBottom: width && width < 768 ? '-2rem' : '',
        }}
      >
        <Modal.Header style={{ flexDirection: 'column' }}>
          <Text b size={20}>
            Filters
          </Text>
          <div
            style={{
              borderTop: '1px solid #ddd',
              width: '100%',
              marginTop: 15,
            }}
          ></div>
        </Modal.Header>
        <Modal.Body>
          <HeaderFilters
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            setSort={setSort}
          />
        </Modal.Body>
        <div
          style={{
            borderTop: '1px solid #ddd',
            width: '100%',
            marginTop: 15,
          }}
        ></div>
        <Modal.Footer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 16,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => {
                setFilters(getEmptyFilters())
                setSort("{ 'meta.rating': 1 }")
              }}
            >
              Clear All
            </div>
            <div
              style={{
                background: 'rgba(26, 30, 61, 1)',
                color: 'white',
                padding: '0.7rem 1.2rem',
                borderRadius: 8,
                fontSize: 16,
                cursor: 'pointer',
              }}
              onClick={() => {
                setOpenFilters(false)
                console.log('Search query', router.query?.query)
                router.push({
                  pathname: '/',
                  query: {
                    search: router.query?.search || '',
                    filters: JSON.stringify(filters),
                    sort: sort,
                  },
                })
              }}
            >
              Show courses
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Header
