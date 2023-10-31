import { useEffect } from 'react'
import { createContext, useState } from 'react'
import firebase from 'configs/firebase'
import { User } from 'types/user'
import RegisterAPI from '@services/api/auth/register'
import LoginAPI from '@services/api/auth/login'
import {
  LOCALSTORAGE_CART_KEY,
  LOCALSTORAGE_WISHLIST_KEY,
} from '@constants/localstorageKeys'
//this context will handle userAuthentication only
//login and any changes to the state

//=======ATTENTION=========
//Most likely our approach is wrong
//Firebase gives us the user with all of the properties
//onAuthStateChanged fires only when the page is loaded/reloaded,
//when user Signed In or Signed Out
//It does not fire every hour BUT
//It keeps our user updated
//User object that we receive from onAuthStateChanged  has refresh_token
//And Firebase automatically updates refresh_token every hour!!!!
//So, you don't need to store this token in your local storage,
//You will need to run this user.getIdToken every time you need a token

const defaultUser: User = {
  signedIn: false,
}

type AuthProviderProps = { children: React.ReactNode }

type AuthContextType = {
  user: User
  isSignedIn: boolean
  register: (email: string, password: string) => void
  login: (email: string, password: string) => void
  logout: () => void
  getIdToken: () => Promise<string>
}

const AuthContext = createContext({} as AuthContextType)

//Export AuthContext using a Custom Hook
// export const useAuth = () => {
//   return useContext(AuthContext)
// }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User>()
  const [user, setUser] = useState<User>(defaultUser)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false) //can be removed since we will rely only on user
  //let registering = false

  // const loginUser = (user: User) => {
  //   setUser(user)
  // }

  const login = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Res from login: ', res)
      })
  }

  const register = (email: string, password: string) => {
    //registering = true
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user?.getIdToken(false).then((tokenId) => {
          console.log('tokenId in AuthContext: ', tokenId)
          RegisterAPI(tokenId, '', '', false).then((user) => {
            setUser(user)
          })
          //registering = false
        })
      })
  }

  const logout = () => {
    //call firebase.logout
    localStorage.setItem(LOCALSTORAGE_CART_KEY, '[]')
    localStorage.setItem(LOCALSTORAGE_WISHLIST_KEY, '[]')
    firebase.auth().signOut()
    setUser(defaultUser)
  }

  //this doesn't work:
  useEffect(() => {
    const authState = firebase.auth().onIdTokenChanged(async (user) => {
      // console.log('User state has changed on Firebase! User: ', user)
      if (user) {
        // console.log('USER FROM FIREBASE::::', user) //to show that user has refresh_token property
        //user is signed in
        setFirebaseUser(user)

        //set token
        const tokenId = await user.getIdToken(false)
        console.log('Token:', tokenId)
        localStorage.setItem('tokenId', tokenId) //must be deleted

        LoginAPI(tokenId).then((user) => {
          setUser(user)
          setIsSignedIn(true)
        })
      } else {
        //user is not signed in
        setIsSignedIn(false)
        setUser(defaultUser)
        localStorage.setItem('tokenId', '')
      }
    })
    return authState
  }, [])

  // useEffect(() => {
  //   if (firebaseUser) {
  //     firebaseUser?.getIdToken().then((tokenId) => {
  //       console.log('Firebase user has changed. New token: ', tokenId)
  //       localStorage.setItem('tokenId', tokenId) //must be deleted
  //     })
  //   }
  // }, [firebaseUser])

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser
      console.log('Refreshed user tokens')
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])
  // useEffect(() => {
  //   const tokenState = firebase.auth().onIdTokenChanged((user) => {

  //     if(user) {
  //       //user is signed in
  //       //no need to do anything
  //       user.getIdToken(false).then((tokenId) => {
  //         console.log(tokenId)
  //         localStorage.setItem('tokenId', tokenId)
  //       }
  //     }
  //     else {
  //       //user is not signed in
  //       //need to update token

  //     }
  //   })
  // })

  //must be improved so when the user tries to
  //get something and he is not loged
  //in - we must try to log him, otherwise show SignIn view
  //So he could login
  //But most of the time user will be logged in
  const getIdToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (firebaseUser) {
        console.log('firebaseUser: ', firebaseUser)
        firebaseUser
          .getIdToken(false)
          .then((token) => {
            resolve(token)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, isSignedIn, register, login, logout, getIdToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
