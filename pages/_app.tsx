import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { NextUIProvider } from '@nextui-org/react'
import { defaultTheme } from '@configs/styles/config'
import { nextUITheme } from '@configs/styles/config'
import { CountProvider } from 'contexts/userContextNew'
import { CategoriesProvider } from 'contexts/categoriesContext'
import { CartAndWishlistProvider } from '@contexts/CartAndWishList'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config'
import { AuthProvider } from '@hooks/useAuth'
import '@helpers/i18n'
import { useRouter } from 'next/router'
import { MyCoursesProvider } from '@contexts/MyCoursesContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const savedLang = localStorage.getItem('edugram-language') || 'en'
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: savedLang })
  }, [router.isReady])

  return (
    <>
      <EmotionThemeProvider theme={defaultTheme}>
        <NextUIProvider theme={nextUITheme}>
          <AuthProvider>
            <CountProvider>
              <CategoriesProvider>
                <CartAndWishlistProvider>
                  <MyCoursesProvider>
                    <Component {...pageProps} />
                  </MyCoursesProvider>
                </CartAndWishlistProvider>
              </CategoriesProvider>
            </CountProvider>
          </AuthProvider>
        </NextUIProvider>
      </EmotionThemeProvider>
    </>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
