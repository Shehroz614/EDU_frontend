import React, { useState } from 'react'
import Modal from '../../molecules/Modal'
import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'
import ForgotPasswordForm from '../ForgotPasswordForm'

type LoginProps = {
  postLoginAction?: (() => void) | null
  onClose: () => void
}

const LoginModal: React.FunctionComponent<LoginProps> = ({
  onClose,
  postLoginAction,
}) => {
  const [formType, setFormType] = useState<
    'login' | 'register' | 'forgetPassword'
  >('login')

  return (
    <Modal onClose={onClose} blurredBackground>
      {formType === 'login' && (
        <SignInForm
          setFormType={setFormType}
          onClose={onClose}
          postLoginAction={postLoginAction}
        />
      )}
      {formType === 'register' && (
        <SignUpForm setFormType={setFormType} onClose={onClose} />
      )}
      {formType === 'forgetPassword' && (
        <ForgotPasswordForm setFormType={setFormType} />
      )}
    </Modal>
  )
}
export default LoginModal
