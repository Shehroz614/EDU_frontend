import * as React from 'react'
import { User } from '@ugu/types'

type Action =
  | {
      type: 'login'
      user: User
    }
  | { type: 'logout' }
type Dispatch = (action: Action) => void
type State = { user: User }
type CountProviderProps = { children: React.ReactNode }

const CountStateContext = React.createContext<State | undefined>(undefined)
const CountDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
)

const defaultUser: User = {
  signedIn: false,
  // _id: '',
  // email: '',
  // first_name: '',
  // last_name: '',
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'login': {
      return { user: { ...state.user, ...action.user } }
    }
    case 'logout': {
      return { user: defaultUser }
    }
    default: {
      throw new Error(`Unhandled action type!`)
    }
  }
}

// const signInUser = (
//   tokenId: string,
//   dispatch: (action: { type: 'login'; user: User }) => void
// ) => {
//   const url = 'http://localhost:4000/login'
//   const data = {
//     // idToken: tokenId,
//   }
//   const config = {
//     headers: {
//       Authorization: `Bearer ${tokenId}`,
//     },
//   }

//   axios.post(url, data, config).then((res) => {
//     console.log('Res from the backend: ', res)

//     const user: User = {
//       signedIn: true,
//       _id: res.data._id,
//       email: res.data.email,
//       first_name: res.data.first_name,
//       last_name: res.data.last_name,
//       email_subscription: res.data.email_subscription,
//       updatedAt: res.data.updatedAt,
//       createdAt: res.data.createdAt,
//       //level
//       rank: res.data.rank,
//       wishlisted_courses: res.data.wishlisted_courses,
//       my_courses: res.data.my_courses,
//       in_cart: res.data.in_cart,
//       completed_courses: res.data.completed_courses,
//       visited_courses: res.data.visited_courses,
//       notifications: res.data.notifications,
//       messages: res.data.messages,
//       payment_methods: res.data.payment_methods,
//       isCouch: res.data.isCouch,
//     }

//     dispatch({ type: 'login', user: user })
//   })
// }

const CountProvider = ({ children }: CountProviderProps) => {
  const [state, dispatch] = React.useReducer(countReducer, {
    user: defaultUser,
  })

  // const authListener = () => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log(user)
  //       user.getIdToken(false).then((tokenId) => {
  //         console.log(tokenId)
  //         localStorage.setItem('tokenId', tokenId)
  //         signInUser(tokenId, useUserDispatch)
  //       })
  //     } else {
  //       // setUser('')
  //       dispatch({ type: 'logout' })
  //     }
  //   })
  // }

  // useEffect(() => {
  //   authListener()
  //   console.log('useEffect in context')
  // }, [])

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

const useUserState = () => {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

const useUserDispatch = () => {
  const context = React.useContext(CountDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

export { CountProvider, useUserState, useUserDispatch }
