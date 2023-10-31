import React from 'react'
import styled from '@emotion/styled'
import { FormFieldHeight } from '../../../configs/styles/config'
import { Formik, Form, ErrorMessage } from 'formik'
import { SignUpValues } from '@ugu/types'
import TextField from '../../atoms/TextField'
import RadioButton from '../../atoms/RadioButton'
import Button from '../../atoms/Button'
import {
  LoginProps,
  FormRoot,
  Heading,
  Spacer,
  FormSection,
  InputField,
  ErrorText,
  LightText,
  BottomTextContainer,
  UnderlinedButton,
} from '../SignInForm'
import ExclamationIcon from '../../../public/static/icons/exclamation-icon'
import * as Yup from 'yup'
import { useAuth } from '@hooks/useAuth'
import { useTranslation } from 'react-i18next'

const WarningContainer = styled.div`
  display: flex;
  align-items: center;
  width: 22rem;
`
const SideSpacer = styled.div`
  margin-right: 0.5rem;
`

const initialValues: SignUpValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  getNewsletter: false,
}

const SignUpForm = ({ setFormType, onClose }: LoginProps) => {
  const { register } = useAuth()

  const onSubmit = (values: SignUpValues) => {
    console.log(values)

    register(
      values.email,
      values.password,
      values.firstName,
      values.lastName,
      values.getNewsletter
    ).then(() => {
      onClose()
    })
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Passwords has to be at least 6 characters'),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref('password'), null!],
      'Passwords must match'
    ),
  })

  const Error = (props: { name: string }) => (
    <ErrorMessage name={props.name}>
      {(msg) => <ErrorText>{msg}</ErrorText>}
    </ErrorMessage>
  )

  const TextFieldWidth = '22rem'

  const { t } = useTranslation(['signUp'])

  return (
    <FormRoot>
      <Heading>{t('Sign Up')}</Heading>
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
                id="firstName"
                name="firstName"
                placeholder={t('First Name')}
                width={TextFieldWidth}
              />
              <Error name="firstName" />
            </InputField>
          </FormSection>
          <FormSection>
            <InputField>
              <TextField
                type="text"
                id="lastName"
                name="lastName"
                placeholder={t('Last Name')}
                width={TextFieldWidth}
              />
              <Error name="lastName" />
            </InputField>
          </FormSection>
          <FormSection>
            <InputField>
              <TextField
                type="text"
                id="email"
                name="email"
                placeholder={t('Email')}
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
                placeholder={t('Password')}
                width={TextFieldWidth}
              />
              <Error name="password" />
            </InputField>
          </FormSection>
          <FormSection>
            <InputField>
              <TextField
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder={t('Confirm Password')}
                width={TextFieldWidth}
              />
              <Error name="passwordConfirm" />
            </InputField>
          </FormSection>
          <FormSection>
            <RadioButton
              id="getNewsletter"
              name="getNewsletter"
              label={t('getNewsletter', { ns: 'signUp' })}
              width={'23rem'}
            />
          </FormSection>
          <FormSection button>
            <Button
              type="submit"
              height={FormFieldHeight.large}
              width="12.1875rem"
              backgroundColor="cta"
            >
              {t('Sign Up')}
            </Button>
          </FormSection>
          <FormSection>
            <WarningContainer>
              <ExclamationIcon />
              <SideSpacer />
              <LightText>
                {'By clicking Register you accept Terms & Conditions.'}
              </LightText>
            </WarningContainer>
          </FormSection>
        </Form>
      </Formik>
      <BottomTextContainer>
        <LightText>{t('Already registered?')}</LightText>
        <UnderlinedButton onClick={() => setFormType('login')}>
          {t('Sign In')}
        </UnderlinedButton>
      </BottomTextContainer>
    </FormRoot>
  )
}
export default SignUpForm
