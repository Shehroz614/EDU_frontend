import React, { useReducer, useRef, useState } from 'react'
import styled from 'styled-components'
import GiftCard from '../giftCard'
import { colors, fontFamilies } from 'configs/styles/config'
import SimpleReactValidator from 'simple-react-validator'

const FormContainer = styled.form`
  font-family: ${fontFamilies.regular};
  display: flex;
  flex-direction: row;
  max-width: 1678px;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  gap: 20px;
  p {
    font-family: ${fontFamilies.regular};
  }
  h {
    font-family: ${fontFamilies.regular};
  }
  input {
    font-family: ${fontFamilies.regular};
  }
  @media (max-width: 1002px) {
    gap: 10px;
    padding: 10px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    max-width: 100%;
  }
  @media (max-width: 435px) {
    padding: 2px;
  }
`

const LeftContainer = styled.div`
  flex: 1;
  text-align: center;
  padding-left: 40px;
  padding-right: 40px;
`
const RightContainer = styled.div`
  flex: 1;
  padding-left: 50px;
  padding-right: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 16px;
`
const Button = styled.button<{ active?: boolean }>`
  padding: 20px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  max-width: 197px;
  width: 100%;
  max-height: 83px;
  height: 100%;
  border: ${(props) =>
    props.active ? `2px solid ${colors.uguBrightPurple}` : '1px solid #D9D9D9'};
  color: black;
  background-color: white;
`
const CustomAmountInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`
const ButtonCheckout = styled.button<{ active?: boolean }>`
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  border: ${(props: any) =>
    props.active ? '1px solid #007bff' : '1px solid gray'};
  color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 40px;
  background-color: ${colors.uguBrightPurple};
`
const FloatingInputContainer = styled.div`
  position: relative;
  width: 100%;
`
const FloatingInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #b1b1b1;
  box-sizing: border-box;
  margin-bottom: 10px;
`

const FloatingLabel = styled.label`
  position: absolute;
  left: 20px;
  top: 12px;
  font-size: 12px;
  color: #b1b1b1;
  transition: all 0.2s ease-in-out;
  transform-origin: left top;
  cursor: inherit;
`

const HorizontalBar = styled.div`
  width: 80%;
  height: 1px;
  background-color: #cdcdcd;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`

const DateInputDiv = styled.div`
  p {
    font-weight: bold;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid #b1b1b1;
    box-sizing: border-box;
  }
`

const TermsAcceptedLabel = styled.div`
  display: flex;
  align-items: center;

  p {
    padding-left: 10px;
    color: gray;
  }

  span {
    text-decoration: underline;
  }
`

const PersonalNoteLabel = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-weight: bold;
    font-size: 14px;
  }
`

const ErrorDiv = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: -10px;
`

const CreateGiftForm = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    senderEmail: '',
    customAmount: '',
    giftMessage: '',
    deliveryMethod: 'email',
    deliveryDate: '',
    termsAccepted: false,
  })

  const [amount, setAmount] = useState(50)
  const customMessages = {
    recipientEmail: {
      required: "Recipient's Email is required.",
      email: 'Please provide a valid email address for the recipient.',
    },
    recipientName: {
      required: "Recipient's Name is required.",
      string: "Recipient's Name must be a valid string.",
    },
    senderEmail: {
      required: "Recipient's Email is required.",
      email: 'Please provide a valid email address for the recipient.',
    },
    senderName: {
      required: "Recipient's Name is required.",
      string: "Recipient's Name must be a valid string.",
    },
  }

  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
      messages: customMessages,
    })
  )

  const handleChange = (e: { target: any }) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData({
      ...formData,
      [name]: newValue,
    })

    if (name === 'customAmount') {
      setAmount(value)
    }
  }

  const handleAmountClick = (newAmount: any) => {
    setAmount(newAmount)
    setFormData({
      ...formData,
      customAmount: newAmount.toString(),
    })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(validator)
    if (validator.current.allValid()) {
      console.log('Form Data:', formData)
    } else {
      validator.current.showMessages()
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <LeftContainer>
        <GiftCard amount={amount} />
      </LeftContainer>
      <RightContainer>
        <div style={{ marginBottom: '10px' }}>
          <h2>Buy Edugram Gift Card</h2>
          <p>
            Can be used to buy any online Courses, Course Bundles,
            Subscriptions, Paid Contents, Edu Solutions or Donations on
            Edugram.io
          </p>
        </div>
        <div>
          <h4>How would you like to send</h4>
          <p style={{ marginTop: '-5px' }}>
            Recipient will receive the gift via {formData.deliveryMethod}
          </p>
        </div>
        <ButtonGroup style={{ marginTop: '-7px' }}>
          <Button
            type="button"
            active={formData.deliveryMethod === 'email'}
            onClick={() =>
              handleChange({
                target: { name: 'deliveryMethod', value: 'email' },
              })
            }
          >
            Email
          </Button>
          <Button
            type="button"
            active={formData.deliveryMethod === 'link'}
            onClick={() =>
              handleChange({
                target: { name: 'deliveryMethod', value: 'link' },
              })
            }
          >
            Link
          </Button>
        </ButtonGroup>
        <HorizontalBar />
        <div>
          <h4>Choose an amount</h4>
        </div>
        <ButtonGroup style={{ marginTop: '-12px' }}>
          <Button
            type="button"
            active={amount === 50}
            onClick={() => handleAmountClick(50)}
          >
            $50
          </Button>
          <Button
            type="button"
            active={amount === 100}
            onClick={() => handleAmountClick(100)}
          >
            $100
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            type="button"
            active={amount === 500}
            onClick={() => handleAmountClick(500)}
          >
            $500
          </Button>
          <Button
            type="button"
            active={!(amount === 500 || amount === 100 || amount === 50)}
            onClick={() => handleAmountClick(0)}
          >
            Custom
          </Button>
        </ButtonGroup>
        {!(amount === 500 || amount === 100 || amount === 50) && (
          <CustomAmountInput
            type="number"
            id="customAmount"
            name="customAmount"
            value={formData.customAmount}
            onChange={handleChange}
            min="25"
            placeholder="Enter custom amount"
          />
        )}
        <HorizontalBar />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Enter contact details</h4>
          <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Who is it for</p>
          <FloatingInputContainer>
            <FloatingInput
              type="email"
              id="recipientEmail"
              name="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleChange}
              onBlur={() => {
                validator.current.showMessageFor('recipientEmail')
              }}
            />
            <FloatingLabel
              htmlFor="recipientEmail"
              style={
                formData.recipientEmail ? { top: '0', fontSize: '10px' } : {}
              }
            >
              Recipient&apos;s Email
            </FloatingLabel>
          </FloatingInputContainer>
          {validator.current.message(
            'recipientEmail',
            formData.recipientEmail,
            'required|email'
          ) && (
            <ErrorDiv>
              *{validator.current.errorMessages.recipientEmail}
            </ErrorDiv>
          )}
          <FloatingInputContainer>
            <FloatingInput
              type="text"
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              onBlur={() => {
                validator.current.showMessageFor('recipientName')
              }}
            />
            <FloatingLabel
              htmlFor="recipientName"
              style={
                formData.recipientName ? { top: '0', fontSize: '10px' } : {}
              }
            >
              Recipient&apos;s Name
            </FloatingLabel>
          </FloatingInputContainer>
          {validator.current.message(
            'recipientName',
            formData.recipientName,
            'required|string'
          ) && (
            <ErrorDiv>
              *{validator.current.errorMessages.recipientName}
            </ErrorDiv>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Who is it from</p>
          <FloatingInputContainer>
            <FloatingInput
              type="email"
              id="senderEmail"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              onBlur={() => {
                validator.current.showMessageFor('senderEmail')
              }}
            />
            <FloatingLabel
              htmlFor="senderEmail"
              style={formData.senderEmail ? { top: '0', fontSize: '10px' } : {}}
            >
              Sender&apos;s Email
            </FloatingLabel>
          </FloatingInputContainer>
          {validator.current.message(
            'senderEmail',
            formData.senderEmail,
            'required|email'
          ) && (
            <ErrorDiv>*{validator.current.errorMessages.senderEmail}</ErrorDiv>
          )}
          <FloatingInputContainer>
            <FloatingInput
              type="text"
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              onBlur={() => {
                validator.current.showMessageFor('senderName')
              }}
            />
            <FloatingLabel
              htmlFor="senderName"
              style={formData.senderName ? { top: '0', fontSize: '10px' } : {}}
            >
              Sender&apos;s Name
            </FloatingLabel>
          </FloatingInputContainer>
          {validator.current.message(
            'senderName',
            formData.senderName,
            'required|string'
          ) && (
            <ErrorDiv>*{validator.current.errorMessages.senderName}</ErrorDiv>
          )}
        </div>
        <HorizontalBar />
        <PersonalNoteLabel>
          <p style={{ fontWeight: 'bold', fontSize: '14px' }}>
            Leave a personal note.{' '}
            <span style={{ fontWeight: 'normal' }}>(Optional)</span>
          </p>
          <FloatingInputContainer>
            <textarea
              id="giftMessage"
              name="giftMessage"
              value={formData.giftMessage}
              onChange={handleChange}
              style={{
                borderRadius: '10px',
                height: '100px',
                width: '100%',
                padding: '10px 20px',
              }}
            />
            <FloatingLabel
              htmlFor="giftMessage"
              style={formData.giftMessage ? { top: '0', fontSize: '10px' } : {}}
            >
              Personal Note
            </FloatingLabel>
          </FloatingInputContainer>
        </PersonalNoteLabel>
        <HorizontalBar />
        <DateInputDiv>
          <p style={{ fontWeight: 'bold', fontSize: '14px' }}>
            Set gift delivery date.{' '}
            <span style={{ fontWeight: 'normal' }}>(Optional)</span>
          </p>
          <input
            type="datetime-local"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            placeholder="Gift Delivery Date"
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </DateInputDiv>
        <HorizontalBar />
        <TermsAcceptedLabel>
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          <p style={{ paddingLeft: '10px', color: 'gray' }}>
            I agree to the{' '}
            <span style={{ textDecoration: 'underline' }}>
              Terms & Conditions
            </span>{' '}
            of the gift course
          </p>
        </TermsAcceptedLabel>
        <div style={{ textAlign: 'center' }}>
          <ButtonCheckout disabled={!formData.termsAccepted} type="submit">
            To Checkout
          </ButtonCheckout>
        </div>
      </RightContainer>
    </FormContainer>
  )
}

export default CreateGiftForm
