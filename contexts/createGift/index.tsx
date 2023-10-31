import React, { createContext, useContext } from 'react'

type CreateGiftContext = {
  value: string
}

const CreateGiftContext = createContext<CreateGiftContext | undefined>(
  undefined
)

const useCreateGiftContext = (): CreateGiftContext => {
  const context = useContext(CreateGiftContext)
  if (!context) {
    throw new Error(
      'useCreateGiftContext must be used within a CreateGiftProvider'
    )
  }
  return context
}

const CreateGiftProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <CreateGiftContext.Provider
      value={{
        value: 'value',
      }}
    >
      {children}
    </CreateGiftContext.Provider>
  )
}

export { CreateGiftProvider, useCreateGiftContext }
