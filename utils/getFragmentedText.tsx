import React from 'react'

export const getFragmentedText = (text: string) => {
  return text.split('\n').map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index !== array.length - 1 && <br />}
    </React.Fragment>
  ))
}
