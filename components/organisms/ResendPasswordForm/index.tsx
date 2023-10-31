import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { colors, FormFieldHeight } from '../../../configs/styles/config'
//import { SignInValues } from '@ugu/types'
import Button from '../../atoms/Button'
//import { useAuth } from '@hooks/useAuth'
import EmailSentIcon from '@public/static/icons/email-sent-icon'
import { useTranslation } from 'react-i18next'

export type Props = {
  setFormType: (formType: 'login' | 'register' | 'forgetPassword') => void
  onResendReset: () => void
}

const FormRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  margin-bottom: 1.5rem;
  font-size: 14px;
`

const IconWrapper = styled.div`
  display: flex;
  width: 10rem;
  height: 10rem;
  margin-top: -3rem;
  margin-bottom: -1rem;
`

// const ErrorText = styled.p`
//   color: ${(props) => props.theme.colors.errorMessage};
//   margin-top: 0.2rem;
//   margin-left: 1.6rem;
//   font-size: 12px;
// `
// const FormSection = styled.div<{ button?: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ${(props) =>
//     props.button &&
//     `font-family: "RobotoMedium";
//   `}
//   min-height: 3.5rem;
// `
// const InputField = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 0 1rem;
//   min-height: 4rem;
// `

const Heading = styled.h2`
  font-size: 1.3rem;
`
const Text = styled.span`
  font-family: 'RobotoLight';
  font-size: 0.875rem;
  color: ${colors.uguPurple};
  width: 20rem;
  margin: 0 1rem 1rem 1rem;
  text-align: center;
`
const Spacer = styled.div<{ small?: boolean }>`
  margin-bottom: ${(props) => (props.small ? '1rem' : '2rem')};
`
const UnderlinedButton = styled.span`
  font-size: 0.75rem;
  text-decoration: underline;
  margin-left: 0.3rem;
  cursor: pointer;
`
const BottomTextContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`

// const initialValues: SignInValues = {
//   email: '',
//   password: '',
// }

const ResendPasswordForm = ({ onResendReset, setFormType }: Props) => {
  //const [emailError, setEmailError] = useState('')
  const [secondsLeftBeforeNextReset, setSecondsLeftBeforeNextReset] =
    useState(0)

  //const { forgetPassword } = useAuth()

  // const clearErrors = () => {
  //   setEmailError('')
  // }

  useEffect(() => {
    if (!secondsLeftBeforeNextReset) return
    const intervalId = setInterval(() => {
      setSecondsLeftBeforeNextReset(secondsLeftBeforeNextReset - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [secondsLeftBeforeNextReset])

  const { t } = useTranslation(['resendPasswordForm'])

  return (
    <FormRoot>
      <IconWrapper>
        <EmailSentIcon />
      </IconWrapper>
      <Heading>{t('Check Your Email')}</Heading>
      <Spacer small />

      <Text>
        We have just sent you an email with password reset instructions, if the
        email you provided is associated with Edugram account in our records.
      </Text>

      <Button
        disabled={secondsLeftBeforeNextReset !== 0}
        type="submit"
        height={FormFieldHeight.large}
        width="12.1875rem"
        backgroundColor="cta"
        onClick={() => {
          onResendReset()
          setSecondsLeftBeforeNextReset(30)
        }}
      >
        {secondsLeftBeforeNextReset
          ? 'Resend Email in ' + secondsLeftBeforeNextReset + ' sec'
          : 'Resend Email'}
      </Button>

      <BottomTextContainer>
        <UnderlinedButton onClick={() => setFormType('login')}>
          {t('Back To Log In')}
        </UnderlinedButton>
      </BottomTextContainer>
    </FormRoot>
  )
}
export default ResendPasswordForm
