import React from 'react'
import styled from '@emotion/styled'
import { BorderRadius, FormFieldHeight } from '../../../configs/styles/config'
import { Field, FieldProps } from 'formik'

type Props = {
  type: 'text' | 'password' | 'email'
  id: string
  name: string
  placeholder?: string
  width?: string
}

const Input = styled.input<{ width: string }>`
  border: 1px solid ${(props) => props.theme.colors.formFieldBorder};
  border-radius: ${BorderRadius.large};
  padding: 0 1.5rem;
  height: ${FormFieldHeight.large};
  width: ${(props) => props.width};
`

const TextField = ({
  type,
  id,
  name,
  placeholder = '',
  width = '20rem',
}: Props) => (
  <Field name={name}>
    {({ field }: FieldProps) => (
      <Input
        placeholder={placeholder}
        type={type}
        width={width}
        id={id}
        {...field}
      />
    )}
  </Field>
)
export default TextField
