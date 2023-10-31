import styled from '@emotion/styled'

export const ButtonContainer = styled.button<{
  justifyContent: string
  fontWeight: string
  fontSize: string
  fontFamily: string
  width: string
  height: string
  minHeight: string
  marginLeft: string
  marginRight: string
  borderRadius: string
  backgroundColor: string
  color: string
  border: string
  borderColor: string
  opacity: number
  padding: string
  marginTop: string
  marginBottom: string
  disabled: boolean
}>`
  display: flex;
  flex-shrink: 0;

  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
  font-size: ${(props: { fontSize: any }) =>
    props.fontSize ? props.fontSize : '0.875rem'};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  min-width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '2rem')};
  min-height: ${(props) => (props.minHeight ? props.minHeight : '2rem')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '40px'};
  background-color: ${(props) => {
    if (props.backgroundColor) {
      return props.backgroundColor === 'cta'
        ? props.theme.colors.ctaButton
        : props.backgroundColor
    } else {
      return ''
    }
  }};
  color: ${(props) => (props.color ? props.color : '#1a1e3d')};
  border: ${(props) =>
    props.border
      ? props.border
      : '1px solid ' + props.borderColor
      ? props.borderColor
      : 'none'};
  opacity: ${(props) => (props.opacity ? props.opacity : 1)};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: ${(props) => (props.padding ? props.padding : 'none')};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : 'RobotoRegular'};
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};

  a {
    text-decoration: none;
    color: inherit; // or any color you want

    &:visited {
      color: inherit; // or any color you want
    }

    &:hover {
      color: inherit; // or any color you want
      text-decoration: none;
    }

    &:active {
      color: inherit; // or any color you want
    }
  }
`
