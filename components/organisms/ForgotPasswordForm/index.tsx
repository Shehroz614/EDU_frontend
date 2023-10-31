import React, { useState } from 'react'
import styled from '@emotion/styled'
import { FormFieldHeight } from '../../../configs/styles/config'
import { Formik, Form, ErrorMessage } from 'formik'
import { SignInValues } from '@ugu/types'
import TextField from '../../atoms/TextField'
import Button from '../../atoms/Button'
import { useAuth } from '@hooks/useAuth'
import * as Yup from 'yup'
import ResendPasswordForm from '../ResendPasswordForm'
import { useTranslation } from 'react-i18next'

export type Props = {
  setFormType: (formType: 'login' | 'register' | 'forgetPassword') => void
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
  margin-top: 0.5rem;
`

const initialValues: SignInValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
})

const Error = (props: { name: string }) => (
  <ErrorMessage name={props.name}>
    {(msg) => <ErrorText>{msg}</ErrorText>}
  </ErrorMessage>
)

// export async function getServerSideProps({ locale }: { locale: string }) {
//   return {
//       props: {
//           ...(await serverSideTranslations(locale, ['common'])),
//       },
//   }
// }

const ForgotPasswordForm = ({ setFormType }: Props) => {
  const [viewType, setViewType] = useState<'sendReset' | 'resendReset'>(
    'sendReset'
  )
  const [emailError, setEmailError] = useState('')
  const [email, setEmail] = useState('')

  const { forgetPassword } = useAuth()

  const clearErrors = () => {
    console.log(emailError)
    setEmailError('')
  }

  const onSubmit = (values: SignInValues) => {
    clearErrors()
    setEmail(values.email)
    forgetPassword(values.email)
    if (viewType === 'sendReset') setViewType('resendReset')
  }

  const resendEmail = () => {
    forgetPassword(email)
  }

  const TextFieldWidth = '20rem'

  const { t } = useTranslation(['common', 'forgotPasswordForm'])

  return (
    <>
      {viewType === 'sendReset' ? (
        <FormRoot>
          <Heading>{t('Forgot Password')}</Heading>
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
              <FormSection button>
                <Button
                  type="submit"
                  height={FormFieldHeight.large}
                  width="12.1875rem"
                  backgroundColor="cta"
                >
                  {t('buttons.Send')}
                </Button>
              </FormSection>
            </Form>
          </Formik>
          <BottomTextContainer>
            <UnderlinedButton onClick={() => setFormType('login')}>
              {t('buttons.Back To Log In')}
            </UnderlinedButton>
          </BottomTextContainer>
        </FormRoot>
      ) : (
        <ResendPasswordForm
          onResendReset={resendEmail}
          setFormType={setFormType}
        />
      )}
    </>
  )
}
export default ForgotPasswordForm
