import styled from '@emotion/styled'
import DashedLine from 'public/static/icons/dashed-line-icon'

type DropdownSeparatorProps = {
  height?: string
  width?: string
  marginBottom?: string
  marginTop?: string
  opacity?: string
}

const DropdownSeparatorWrapper = styled.div<{
  marginBottom?: string
  marginTop?: string
  opacity?: string
  width?: string
}>`
  width: ${(props) => (props.width ? props.width : '')};
  display: flex;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
  align-items: flex-start;
`

const DropdownSeparator: React.FC<DropdownSeparatorProps> = (props) => {
  const { height, marginBottom, marginTop, opacity, width } = props
  return (
    <DropdownSeparatorWrapper
      marginBottom={marginBottom}
      marginTop={marginTop}
      opacity={opacity}
      width={width}
    >
      <DashedLine height={height} />
    </DropdownSeparatorWrapper>
  )
}

export default DropdownSeparator
