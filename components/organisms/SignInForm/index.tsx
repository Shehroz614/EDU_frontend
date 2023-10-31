import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colors, FormFieldHeight } from '../../../configs/styles/config'
import { Formik, Form, ErrorMessage } from 'formik'
import { SignInValues } from '@ugu/types'
import TextField from '../../atoms/TextField'
import Button from '../../atoms/Button'
import { useAuth } from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'
import * as Yup from 'yup'
import GoogleIcon from '@public/static/icons/socialButtonIcons/googleIcon'

export type LoginProps = {
  postLoginAction?: (() => void) | null
  setFormType: (formType: 'login' | 'register' | 'forgetPassword') => void
  onClose: () => void
}

export const FormRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  margin-bottom: 1.5rem;
  font-size: 14px;
`
export const ErrorText = styled.p`
  color: ${(props) => props.theme.colors.errorMessage};
  margin-top: 0.2rem;
  margin-left: 1.6rem;
  font-size: 12px;
`
export const FormSection = styled.div<{ button?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.button &&
    `font-family: "RobotoMedium";
  `}
  min-height: 3.5rem;
`
export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  min-height: 4rem;
`

export const Heading = styled.h2`
  font-size: 1.3rem;
`
export const LightText = styled.span`
  font-family: 'RobotoLight';
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.lightText};
`
export const Spacer = styled.div<{ small?: boolean }>`
  margin-bottom: ${(props) => (props.small ? '1rem' : '2rem')};
`
export const UnderlinedButton = styled.span`
  font-size: 0.75rem;
  text-decoration: underline;
  margin-left: 0.3rem;
  cursor: pointer;
`
export const BottomTextContainer = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  display: flex;
  margin-right: 0.5rem;
`

const LoginError = styled.div`
  color: #e46262;
`

const initialValues: SignInValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const Error = (props: { name: string }) => (
  <ErrorMessage name={props.name}>
    {(msg) => <ErrorText>{msg}</ErrorText>}
  </ErrorMessage>
)

const SignInForm = ({ setFormType, onClose, postLoginAction }: LoginProps) => {
  const { t } = useTranslation(['common'])

  const { login, loginWithGoogle, setPostLoginAction } = useAuth()

  const onSubmit = async (values: SignInValues) => {
    console.log('submit pressed')
    await login(values.email, values.password)
      .then(() => {
        onClose()
        postLoginAction && setPostLoginAction(postLoginAction)
      })
      .catch(() => {
        setLoginError('Invalid email or password')
      })
  }

  const TextFieldWidth = '20rem'
  const [loginError, setLoginError] = useState('')

  return (
    <FormRoot>
      <Heading>{t('authentication.Log In')}</Heading>
      <Spacer small />
      <LoginError>{loginError}</LoginError>
      <Spacer small />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <FormSection>
            <InputField>
              <TextField
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                width={TextFieldWidth}
              />
              <Error name="email" />
            </InputField>
          </FormSection>
          <FormSection>
            <InputField>
              <TextField
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                width={TextFieldWidth}
              />
              <Error name="password" />
            </InputField>
          </FormSection>
          <FormSection button>
            <Button
              type="submit"
              height={FormFieldHeight.large}
              width="12.1875rem"
              backgroundColor={colors.uguYellow}
              // color="white"
            >
              {t('buttons.Sign In')}
            </Button>
          </FormSection>
        </Form>
      </Formik>
      <FormSection>
        <Button
          onClick={loginWithGoogle}
          height={FormFieldHeight.large}
          width="12.1875rem"
          // backgroundColor={colors.uguYellow}
          border="1px solid"
          borderColor={colors.uguPurple}
          // color="white"
        >
          <IconWrapper>
            <GoogleIcon width="1.2rem" />
          </IconWrapper>
          {t('buttons.Sign In with Google')}
        </Button>
      </FormSection>
      <BottomTextContainer>
        <LightText> {t('strings.or')}</LightText>
        <UnderlinedButton onClick={() => setFormType('forgetPassword')}>
          {t('buttons.Forgot Password?')}
        </UnderlinedButton>
      </BottomTextContainer>
      <Spacer small />
      <BottomTextContainer>
        <LightText>{t('authentication.Not registered?')}</LightText>
        <UnderlinedButton onClick={() => setFormType('register')}>
          {t('buttons.Sign Up')}
        </UnderlinedButton>
      </BottomTextContainer>
    </FormRoot>
  )
}
export default SignInForm
