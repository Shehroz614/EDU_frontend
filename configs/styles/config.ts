import { createTheme } from '@nextui-org/react'

export const colors = {
  uguWhite: '#FFFFFF',
  uguPurple: '#1A1E3D',
  uguBrightPurple: '#7181FF',
  uguBrightBlue: '#495DF4',
  uguLightPurple: '#3C405A',
  uguLighterGrey: '#EFF0F2',
  uguLightLightGrey: '#f6f6f6',
  uguLightGrey: '#D8D8D8',
  uguGrey: '#a0a0a0',
  uguDarkGrey: '#979797',
  // uguRed: '#C7424F', //old
  uguRed: '#DE5664', //new
  uguGreen: '#4DAD9B',
  // uguYellow: '#E9B735', //old
  uguYellow: '#F1C85D', //new
  // uguBlue: '#6BB5C9', //old
  uguBlue: '#75BFD3', //new
  uguLightBlue: '#d9e8ec',
  uguLightLightBlue: '#E1F0F4',
  uguLightYellow: '#f3e9d0',
  uguLightBlack: '#313145',
  uguLightRed: '#F4D9DC',
}
export const fontFamilies = {
  bold: 'RobotoBold',
  regular: 'RobotoRegular',
  medium: 'RobotoMedium',
  light: 'RobotoLight',
}

export const defaultTheme = {
  colors: {
    background: colors.uguWhite,
    siteFooter: colors.uguPurple,
    modalBackground: 'rgba(26, 30, 61, 0.71)',
    formFieldBorder: 'rgba(216, 216, 216, 0.25)',
    errorMessage: colors.uguRed,
    ctaButton: colors.uguYellow,
    lightText: 'rgba(0, 0, 0, 0.38)',
    checkboxBg: '#EAEAEA',
    darkGreyText: colors.uguDarkGrey,
    headerIcons: colors.uguPurple,
  },
}

export const nextUITheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primary: '#7b8aff',
      warning: colors.uguYellow,
      secondary: colors.uguBlue,
      link: colors.uguPurple,
      // ...
    },
    space: {
      8: '1.25rem',
    },
  },
})

export const BorderRadius = {
  medium: '1rem',
  large: '1.875rem',
  round: '50%',
}

export const FormFieldHeight = {
  large: '2.5rem',
}

//z-index
const zIndexList = [
  //higher
  'dialog-background',
  //lower
] as const

export type ZIndexName = (typeof zIndexList)[number] | 'negative'

export const zIndex = (name: ZIndexName) => {
  if (name === 'negative') return -1

  const targetIndex = zIndexList.length
  return zIndexList.length - targetIndex
}
