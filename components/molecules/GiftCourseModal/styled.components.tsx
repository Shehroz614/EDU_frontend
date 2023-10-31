import styled from '@emotion/styled'

const ModalContent = styled.div`
  padding: 10px 15%;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  overflow-y: auto;
`
const DescriptionHeader = styled.div`
  font-size: 21px;
  margin-top: 10px;
`
const ButtonWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
`
const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`

export {
  DescriptionHeader,
  ModalContent,
  ButtonWrapper,
  FormWrapper,
  InputWrapper,
}
