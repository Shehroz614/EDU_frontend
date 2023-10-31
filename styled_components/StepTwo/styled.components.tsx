import styled from '@emotion/styled'

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const AddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`
const CreateCourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  border-radius: 2rem;
  width: 100%;
  position: relative;
`
const CreateCourseOutline = styled.div`
  display: flex;
  border: 1px solid #e4e4e4;
  padding: 1rem 1rem;
  min-height: 25rem;
  border-radius: 2rem;
  margin: 4rem;
  @media (min-width: 1300px) {
    width: 50rem;
  }
`
const MaterialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  overflow: scroll;
`

export {
  StepContainer,
  ButtonWrapper,
  AddButtonWrapper,
  CreateCourseOutline,
  CreateCourseContainer,
  MaterialsWrapper,
}
