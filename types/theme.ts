import { defaultTheme } from '../configs/styles/config'

export type DefaultTheme = typeof defaultTheme
export type ThemeColors = keyof DefaultTheme['colors']

export type ThemeType = {
  colors: {
    [key in ThemeColors]: string
  }
}
