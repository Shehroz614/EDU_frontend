declare module '@emotion/styled' {
  import { CreateStyled } from '@emotion/styled'
  import { ThemeType } from '@ugu/types'
  export * from '@emotion/styled/types/index'
  const customStyled: CreateStyled<ThemeType>
  export default customStyled
}
