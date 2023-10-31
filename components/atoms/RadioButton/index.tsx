import React from 'react'
import styled from '@emotion/styled'
import { BorderRadius } from '../../../configs/styles/config'
import { Field, FieldProps } from 'formik'

type Props = {
  id: string
  name: string
  label?: string | React.ReactNode
  width?: string
}

const Input = styled.input`
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  :checked ~ .check-container div {
    background-color: ${(props) => props.theme.colors.ctaButton};
  }
`

const Label = styled.label<{ width: string }>`
  font-family: 'RobotoLight';
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.lightText};
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${(props) => props.width};
  word-wrap: break-word;
  cursor: pointer;
`
const CustomCheckbox = styled.div`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: ${BorderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.checkboxBg};
  margin-right: 0.5rem;
  flex-shrink: 0;
`
const Checkmark = styled.div`
  height: 0.75rem;
  width: 0.75rem;
  border-radius: ${BorderRadius.round};
  background-color: ${(props) => props.theme.colors.checkboxBg};
`

const Checkbox = ({ id, name, label = '', width = '26rem' }: Props) => (
  <Label width={width}>
    <Field name={name}>
      {({ field }: FieldProps) => <Input type="checkbox" id={id} {...field} />}
    </Field>
    <CustomCheckbox className="check-container">
      <Checkmark />
    </CustomCheckbox>
    {label}
  </Label>
)
export default Checkbox
