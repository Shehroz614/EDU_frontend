import { Dispatch, SetStateAction, useEffect } from 'react'
import { createContext, useState, useContext } from 'react'
import firebase, { signInWithGoogle } from 'configs/firebase'
import { User, RawUser } from 'types/user'
import RegisterAPI from '@services/api/auth/register'
import LoginAPI from '@services/api/auth/login'
import {
  LOCALSTORAGE_CART_KEY,
  LOCALSTORAGE_WISHLIST_KEY,
} from '@constants/localstorageKeys'
import normalizeUser from '@utils/normalizeUser'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  firebaseUser: firebase.User | null
  error: any | null
  authPressed: boolean
}

interface AuthContextType {
  authState: AuthState
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    emailSubscription: boolean
  ) => Promise<void>
  login: (
    email: string,
    password: string,
    withRedirection?: boolean,
    redirectionUrl?: string
  ) => Promise<void>
  logout: () => void
  forgetPassword: (email: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  onLogin: number
  updateCurrentUserFromResponse: (rawUser: RawUser) => void
  setPostLoginAction: Dispatch<SetStateAction<(() => void) | null>>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({
  authState: {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    firebaseUser: null,
    error: null,
    authPressed: false,
  },
  login: async () => {},
  register: async () => {},
  forgetPassword: async () => {},
  logout: () => {},
  loginWithGoogle: async () => {},
  onLogin: 0,
  updateCurrentUserFromResponse: () => {},
  setPostLoginAction: () => {},
})

//export AuthContext using a Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    firebaseUser: null,
    error: null,
    authPressed: false,
  })
  //to allow postLoginActionExecution
  const [postLoginAction, setPostLoginAction] = useState<(() => void) | null>(
    null
  )
  const [onLogin, setOnLogin] = useState(0)
  //this is used to prevent updating the state while the user is being registered
  let registering = false

  //effects:
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = firebase
      .auth()
      .onIdTokenChanged(async (firebaseUser) => {
        if (!registering) {
          if (firebaseUser) {
            const tokenId = await firebaseUser.getIdToken(false)
            console.log('Signed in:', tokenId)
            localStorage.setItem('tokenId', tokenId) //must be deleted. Update: why?
            //Answer: storing token in localStorage is not secure, someone can have virus on their machine

            try {
              const user = await LoginAPI(tokenId)
              console.log('logging in')
              //create user
              setAuthState({
                isLoading: false,
                isAuthenticated: true,
                firebaseUser: firebaseUser,
                user: user,
                error: null,
                authPressed: false,
              })
            } catch (error) {
              const [firstName = '', lastName = ''] = firebaseUser.displayName
                ? firebaseUser.displayName.split(' ')
                : ''
              RegisterAPI(tokenId, firstName, lastName, true).then((user) => {
                setAuthState({
                  firebaseUser: firebaseUser,
                  isLoading: false,
                  user: user,
                  isAuthenticated: true,
                  error: null,
                  authPressed: false,
                })
              })
            }
          } else {
            setAuthState({
              isLoading: false,
              isAuthenticated: false,
              firebaseUser: null,
              user: null,
              error: null,
              authPressed: false,
            })
            localStorage.setItem('tokenId', '')
          }
        }
      })

    return unsubscribe
  }, [])

  // Refresh token every 1 hour
  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (authState.firebaseUser) {
        const tokenId = await authState.firebaseUser.getIdToken(true)
        localStorage.setItem('tokenId', tokenId)
      }
    }, 10 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [authState.firebaseUser])

  //methods:
  const login = async (
    email: string,
    password: string,
    withRedirection = false,
    redirectionUrl = '/'
  ) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      if (postLoginAction) {
        postLoginAction()
        setPostLoginAction(null) // Clear the action after executing
      }
    } catch (error) {
      setAuthState({ ...authState, error: error })
    }
    setOnLogin(onLogin + 1)
    withRedirection && window.location.replace(redirectionUrl)
  }

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    emailSubscription: boolean
  ) => {
    registering = true
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user?.getIdToken(false).then((tokenId) => {
            console.log('tokenId in AuthContext: ', tokenId)
            RegisterAPI(tokenId, firstName, lastName, emailSubscription).then(
              (user) => {
                setAuthState({
                  ...authState,
                  firebaseUser: res.user,
                  user: user,
                  isAuthenticated: true,
                })
                registering = false
                if (postLoginAction) {
                  postLoginAction()
                  setPostLoginAction(null) // Clear the action after executing
                }
              }
            )
          })
        })
      setOnLogin(onLogin + 1)
    } catch (error) {
      setAuthState({ ...authState, isLoading: false, error: error })
    }
    //window.location.replace('/')
  }

  const forgetPassword = async (email: string) => {
    try {
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then((value) => {
          console.log('Forget Password: ', value)
        })
    } catch (error) {
      setAuthState({ ...authState, isLoading: false, error: error })
    }
  }

  const logout = () => {
    localStorage.setItem(LOCALSTORAGE_CART_KEY, '[]')
    localStorage.setItem(LOCALSTORAGE_WISHLIST_KEY, '[]')
    firebase.auth().signOut()
  }

  async function loginWithGoogle() {
    try {
      await signInWithGoogle()
      if (postLoginAction) {
        postLoginAction()
        setPostLoginAction(null) // Clear the action after executing
      }
    } catch (error) {
      console.error(error)
      setAuthState({ ...authState, isLoading: false, error: error })
    }
    setOnLogin(onLogin + 1)
    //window.location.replace('/')
  }

  /**
   * Updates the current user in the authentication state based on the response from the server.
   *
   * This function is typically called after a successful update to the user's information on the server.
   * It takes the raw user data from the server response, normalizes it using the `normalizeUser` function,
   * and then updates the user in the authentication state.
   *
   * By keeping the user's information in sync with the server, this function ensures that the rest of
   * the application can rely on having the latest and most accurate user data available.
   *
   * @param user The raw user data received from the server
   */
  const updateCurrentUserFromResponse = (rawUser: RawUser) => {
    setAuthState({ ...authState, user: normalizeUser(rawUser) })
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        register,
        login,
        forgetPassword,
        logout,
        loginWithGoogle,
        onLogin,
        updateCurrentUserFromResponse,
        setPostLoginAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
