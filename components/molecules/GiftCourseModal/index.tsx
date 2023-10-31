import React, { useReducer, useRef, useState } from 'react'
import Lottie from 'react-lottie'
import { Checkbox, Input, Textarea, Text } from '@nextui-org/react'
import RoundedButton from '@components/atoms/Button'
import { colors } from '@configs/styles/config'
import Modal from '@components/molecules/Modal'
import SimpleReactValidator from 'simple-react-validator'
import GiftAnimation from '@public/static/images/47407-gift-box.json'
import {
  DescriptionHeader,
  ModalContent,
  ButtonWrapper,
  FormWrapper,
  InputWrapper,
} from './styled.components'
import { useAuth } from '@hooks/useAuth'
import { useTranslation } from 'react-i18next'

const GiftCourseModal: React.FC<{
  onClose: () => void
  onSubmit: (e: any) => void
}> = ({ onClose, onSubmit }) => {
  const { t } = useTranslation(['common', 'review', 'stickyCoursePageBlock'])
  const {
    authState: { isAuthenticated, isLoading },
  } = useAuth()
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  )
  const [formData, setFormData] = useState({
    recipientEmail: '',
    recipientName: '',
    senderEmail: '',
    senderName: '',
    message: '',
    date: undefined,
    isAnonymous: false,
    terms: false,
  })

  const onChange = (key: string, value: any) => {
    setFormData((state) => ({
      ...state,
      [key]: value,
    }))
  }
  const handleSubmit = () => {
    if (simpleValidator.current.allValid()) {
      const giftDetails = {
        message: formData.message,
        isAnonymous: formData.isAnonymous,
        recipientDetails: {
          name: formData.recipientName,
          email: formData.recipientEmail,
        },
        scheduled: !!formData.date,
        scheduledAt: formData.date,
      }
      onSubmit(giftDetails)
    } else {
      simpleValidator.current.showMessages()
      forceUpdate()
    }
  }

  return (
    <Modal onClose={onClose} width="40rem">
      <ModalContent>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: GiftAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          width={'255px'}
          style={{ minHeight: '255px' }}
        />
        <DescriptionHeader>Gift a Course</DescriptionHeader>
        <FormWrapper>
          <InputWrapper>
            <Text
              color={
                simpleValidator.current.message(
                  'recipientEmail',
                  formData.recipientEmail,
                  'required|email'
                )
                  ? 'error'
                  : 'default'
              }
            >
              Recipient&apos;s Email
            </Text>
            <Input
              bordered
              type="text"
              width="100%"
              shadow={false}
              rounded={true}
              animated={false}
              borderWeight="light"
              placeholder="Enter email"
              value={formData.recipientEmail}
              color={
                simpleValidator.current.message(
                  'recipientEmail',
                  formData.recipientEmail,
                  'required|email'
                )
                  ? 'error'
                  : 'default'
              }
              onChange={(e) => onChange('recipientEmail', e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor('recipientEmail')
              }
            />
            {simpleValidator.current.message(
              'recipientEmail',
              formData.recipientEmail,
              'required|email'
            ) && (
              <Text color="error" size="10px">
                {t('messages.Please provide a valid Email address', {
                  ns: 'courses',
                })}
              </Text>
            )}
          </InputWrapper>
          <InputWrapper>
            <Text
              color={
                simpleValidator.current.message(
                  'recipientName',
                  formData.recipientName,
                  'required|string'
                )
                  ? 'error'
                  : 'default'
              }
            >
              Recipient&apos;s Name
            </Text>
            <Input
              bordered
              type="text"
              width="100%"
              shadow={false}
              rounded={true}
              animated={false}
              borderWeight="light"
              placeholder="Enter name"
              value={formData.recipientName}
              color={
                simpleValidator.current.message(
                  'recipientName',
                  formData.recipientName,
                  'required|string'
                )
                  ? 'error'
                  : 'default'
              }
              onChange={(e) => onChange('recipientName', e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor('recipientName')
              }
            />
            {simpleValidator.current.message(
              'recipientName',
              formData.recipientName,
              'required|string'
            ) && (
              <Text color="error" size="10px">
                {t('messages.Please provide a valid Recipient name', {
                  ns: 'courses',
                })}
              </Text>
            )}
          </InputWrapper>
          {!isAuthenticated && !isLoading && (
            <>
              <InputWrapper>
                <Text
                  color={
                    simpleValidator.current.message(
                      'senderEmail',
                      formData.senderEmail,
                      'required|email'
                    )
                      ? 'error'
                      : 'default'
                  }
                >
                  Sender Email
                </Text>
                <Input
                  bordered
                  type="text"
                  width="100%"
                  shadow={false}
                  rounded={true}
                  animated={false}
                  borderWeight="light"
                  value={formData.senderEmail}
                  placeholder="Enter sender email"
                  color={
                    simpleValidator.current.message(
                      'senderEmail',
                      formData.senderEmail,
                      'required|email'
                    )
                      ? 'error'
                      : 'default'
                  }
                  onChange={(e) => onChange('senderEmail', e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor('senderEmail')
                  }
                />
                {simpleValidator.current.message(
                  'senderEmail',
                  formData.senderEmail,
                  'required|email'
                ) && (
                  <Text color="error" size="10px">
                    {t('messages.Please provide a valid Email address', {
                      ns: 'courses',
                    })}
                  </Text>
                )}
              </InputWrapper>
              <InputWrapper>
                <Text
                  color={
                    simpleValidator.current.message(
                      'senderName',
                      formData.senderName,
                      'required|string'
                    )
                      ? 'error'
                      : 'default'
                  }
                >
                  Sender Name (optional)
                </Text>
                <Input
                  bordered
                  type="text"
                  width="100%"
                  shadow={false}
                  rounded={true}
                  animated={false}
                  borderWeight="light"
                  placeholder="Enter sender name"
                  color={
                    simpleValidator.current.message(
                      'senderName',
                      formData.senderName,
                      'required|string'
                    )
                      ? 'error'
                      : 'default'
                  }
                  onChange={(e) => onChange('senderName', e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor('senderName')
                  }
                />
                {simpleValidator.current.message(
                  'senderName',
                  formData.senderName,
                  'required|string'
                ) && (
                  <Text color="error" size="10px">
                    {t('messages.Please provide a valid Sender name', {
                      ns: 'courses',
                    })}
                  </Text>
                )}
              </InputWrapper>
            </>
          )}
          <InputWrapper>
            <Text>Gift Message (optional)</Text>
            <Textarea
              bordered
              width="100%"
              minRows={4}
              shadow={false}
              animated={false}
              borderWeight="light"
              placeholder="Enter gift message"
              value={formData.message}
              color={
                simpleValidator.current.message(
                  'message',
                  formData.message,
                  'string'
                )
                  ? 'error'
                  : 'default'
              }
              onChange={(e) => onChange('message', e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor('message')}
            />
            {simpleValidator.current.message(
              'message',
              formData.message,
              'string'
            ) && (
              <Text color="error" size="10px">
                {t('messages.Please provide a valid Recipient name', {
                  ns: 'courses',
                })}
              </Text>
            )}
          </InputWrapper>
          <InputWrapper>
            <Checkbox size="xs" onChange={(e) => onChange('isAnonymous', e)}>
              Gift this course Anonymously
            </Checkbox>
          </InputWrapper>
          <InputWrapper>
            <Checkbox
              size="xs"
              labelColor={
                simpleValidator.current.message(
                  'terms',
                  formData.terms,
                  'accepted'
                )
                  ? 'error'
                  : 'default'
              }
              style={{ display: 'inline-block' }}
              onChange={(e) => onChange('terms', e)}
              onBlur={() => simpleValidator.current.showMessageFor('terms')}
            >
              <Text style={{ fontSize: '14px', lineHeight: '18px' }}>
                I agree and accept&nbsp;<u>Terms and Conditions</u>&nbsp;of Gift
                Course
              </Text>
            </Checkbox>
          </InputWrapper>
          <ButtonWrapper>
            <RoundedButton
              marginTop=".5rem"
              width="100%"
              height="3rem"
              fontSize="16px"
              text={t('buttons.To Checkout')}
              fontFamily="RobotoRegular"
              backgroundColor={colors.uguYellow}
              onClick={handleSubmit}
              disabled={!simpleValidator.current.allValid()}
            />
          </ButtonWrapper>
        </FormWrapper>
      </ModalContent>
    </Modal>
  )
}
export default GiftCourseModal
