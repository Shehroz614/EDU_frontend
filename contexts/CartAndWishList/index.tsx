import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
} from 'react'
import { CouponType, ShortCourse } from '@type/course'
import { useAuth } from '@hooks/useAuth'
import {
  LOCALSTORAGE_CART_KEY,
  LOCALSTORAGE_WISHLIST_KEY,
  LOCALSTORAGE_BUY_NOW_KEY,
  LOCALSTORAGE_SAVED_CART_ITEMS_KEY,
  LOCALSTORAGE_INACTIVE_CART_ITEMS_KEY,
} from '@constants/localstorageKeys'
import {
  getUserCart,
  addUserCart,
  updateUserCart,
  deleteUserCart,
  getUserWishlist,
  addUserWishlist,
  updateUserWishlist,
  deleteUserWishlist,
} from '@services/api/user'
import { difference } from '@helpers/difference'
import { isEmpty } from 'lodash'
import validateCoupon from '@services/api/payment/validateCoupon'
import validateDiscount from '@services/api/payment/validateDiscount'
import getUserSavedItems from '@services/api/user/getUserSavedItems'

type CartAndWishListContext = {
  cartItems: ShortCourse[]
  addToCart: (item: ShortCourse) => void
  removeFromCart: (itemId: string) => void
  inactiveCartItems: string[]
  toggleAllCartItemsState: (value: boolean) => void
  toggleCartItemState: (itemId: string) => void
  wishlistItems: ShortCourse[]
  addToWishlist: (item: ShortCourse) => void
  removeFromWishlist: (itemId: string) => void
  coupons: CouponType[]
  addCoupon: (coupon: string) => Promise<void>
  discounts: any[]
  checkDiscount: (code: string) => Promise<any>
  addDiscounts: (code: string) => Promise<void>
  replaceDiscount: (oldDiscount: string, newDiscount: any) => Promise<void>
  removeDiscount: (code: string) => Promise<void>
  getCartTotal: () => number
  updateCartAndWishlist: Function
  getCartTotalDiscount: () => number
  getPayableAmount: () => number
  giftDetails: any
  setGiftDetails: any
  instantCheckoutItem: ShortCourse | null
  setInstantCheckoutItem: Dispatch<SetStateAction<ShortCourse | null>>
  updateCartAndWishlistFromAPI: () => void
}
const Index = createContext({} as CartAndWishListContext)
const useCartAndWishList = () => useContext(Index)

const CartAndWishlistProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}): JSX.Element => {
  const {
    authState: { isAuthenticated },
    onLogin,
  } = useAuth()
  const [cartItems, setCartItems] = useState<ShortCourse[]>([])
  const [inactiveCartItems, setInactiveCartItems] = useState<string[]>([])
  const [savedCartItems, setSavedCartItems] = useState<ShortCourse[]>([])
  const [wishlistItems, setWishlistItems] = useState<ShortCourse[]>([])
  const [giftDetails, setGiftDetails] = useState<any>(null)
  const [coupons, setCoupons] = useState<CouponType[]>([])
  const [discounts, setDiscounts] = useState<any[]>([])
  const [instantCheckoutItem, setInstantCheckoutItem] =
    useState<ShortCourse | null>(null)

  useEffect(() => {
    const localBuyNowItem = localStorage.getItem(LOCALSTORAGE_BUY_NOW_KEY)
    const localInactiveCartItems = localStorage.getItem(
      LOCALSTORAGE_INACTIVE_CART_ITEMS_KEY
    )

    localBuyNowItem && setInstantCheckoutItem(JSON.parse(localBuyNowItem))
    localInactiveCartItems &&
      setInactiveCartItems(JSON.parse(localInactiveCartItems))
  }, [])
  useEffect(() => {
    const localCart = localStorage.getItem(LOCALSTORAGE_CART_KEY)
    const localWishlist = localStorage.getItem(LOCALSTORAGE_WISHLIST_KEY)
    const localSavedCartItems = localStorage.getItem(
      LOCALSTORAGE_SAVED_CART_ITEMS_KEY
    )
    if (isAuthenticated) {
      if (onLogin > 0) {
        updateCartAndWishlist()
      } else {
        getCartAndWishlist().then(({ cart, wishlist, savedItems }) => {
          setCartItems(cart)
          localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(cart))
          setWishlistItems(wishlist)
          localStorage.setItem(
            LOCALSTORAGE_WISHLIST_KEY,
            JSON.stringify(wishlist)
          )
          setSavedCartItems(savedItems)
          localStorage.setItem(
            LOCALSTORAGE_SAVED_CART_ITEMS_KEY,
            JSON.stringify(savedItems)
          )
        })
      }
    } else {
      console.log('Cart & Wishlist populated from localstorage')
      localCart && setCartItems(JSON.parse(localCart))
      localWishlist && setWishlistItems(JSON.parse(localWishlist))
      localSavedCartItems && setSavedCartItems(JSON.parse(localSavedCartItems))
    }
  }, [isAuthenticated])
  useEffect(() => {
    if (instantCheckoutItem) {
      localStorage.setItem(
        LOCALSTORAGE_BUY_NOW_KEY,
        JSON.stringify(instantCheckoutItem)
      )
    } else {
      localStorage.removeItem(LOCALSTORAGE_BUY_NOW_KEY)
    }
  }, [instantCheckoutItem])
  useEffect(() => {
    localStorage.setItem(
      LOCALSTORAGE_INACTIVE_CART_ITEMS_KEY,
      JSON.stringify(inactiveCartItems)
    )
  }, [inactiveCartItems])

  const updateCartAndWishlist = async () => {
    const localCart = localStorage.getItem(LOCALSTORAGE_CART_KEY)
    const localWishlist = localStorage.getItem(LOCALSTORAGE_WISHLIST_KEY)
    getCartAndWishlist().then(({ cart, wishlist, savedItems }) => {
      if (!isEmpty(difference(localCart, cart))) {
        const localCartParsed: ShortCourse[] = JSON.parse(localCart || '[]')
        //const updatedCartItems = difference(localCartParsed.map(item => item?._id), cart.map(item => item?._id)).concat(cart);
        const updatedCartItems = localCartParsed
          .filter((item) => !cart.map((itm) => itm._id).includes(item._id))
          .concat(cart)
        console.log('cart diff', updatedCartItems)
        if (!isEmpty(difference(updatedCartItems, cart))) {
          updateUserCart(updatedCartItems.map((itm) => itm._id)).then(
            (items) => {
              setCartItems(items)
              localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(items))
              return true
            }
          )
        }
      }
      if (!isEmpty(difference(localWishlist, wishlist))) {
        const localWishlistParsed: ShortCourse[] = JSON.parse(
          localWishlist || '[]'
        )
        //const updatedWishlistItems = difference(localWishlistParsed.map(item => item?._id), wishlist.map(item => item?._id)).concat(wishlist);
        const updatedWishlistItems = localWishlistParsed
          .filter((item) => !wishlist.map((itm) => itm._id).includes(item._id))
          .concat(wishlist)
        console.log('wishlist diff', updatedWishlistItems)
        if (!isEmpty(difference(updatedWishlistItems, wishlist))) {
          updateUserWishlist(updatedWishlistItems.map((itm) => itm._id)).then(
            (items) => {
              setWishlistItems(items)
              localStorage.setItem(
                LOCALSTORAGE_WISHLIST_KEY,
                JSON.stringify(items)
              )
              return true
            }
          )
        }
      }

      setCartItems(cart)
      localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(cart))
      setWishlistItems(wishlist)
      localStorage.setItem(LOCALSTORAGE_WISHLIST_KEY, JSON.stringify(wishlist))
      setSavedCartItems(savedItems)
      localStorage.setItem(
        LOCALSTORAGE_SAVED_CART_ITEMS_KEY,
        JSON.stringify(savedItems)
      )
    })
  }
  const updateCartAndWishlistFromAPI = async () => {
    getCartAndWishlist()
      .then(({ cart, wishlist, savedItems }) => {
        setCartItems(cart)
        localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(cart))
        setWishlistItems(wishlist)
        localStorage.setItem(
          LOCALSTORAGE_WISHLIST_KEY,
          JSON.stringify(wishlist)
        )
        setSavedCartItems(savedItems)
        localStorage.setItem(
          LOCALSTORAGE_SAVED_CART_ITEMS_KEY,
          JSON.stringify(savedItems)
        )
      })
      .catch((err) => console.log(err))
  }

  const getCartAndWishlist = async () => {
    const [cart, wishlist, savedItems] = await Promise.all([
      getUserCart(),
      getUserWishlist(),
      getUserSavedItems(),
    ])
    return { cart, wishlist, savedItems }
  }
  const addToCart = async (item: ShortCourse) => {
    if (
      cartItems?.filter((cartItem) => cartItem?._id === item?._id).length == 0
    ) {
      const items = [...cartItems, item]
      setCartItems(items)
      localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(items))
      if (isAuthenticated) {
        await addUserCart(item._id)
      }
      setInstantCheckoutItem(null)
    }
  }
  const removeFromCart = async (itemId: string) => {
    const items = cartItems.filter((item) => item?._id !== itemId)
    setInactiveCartItems((state) => state.filter((s) => s !== itemId))
    setCartItems(items)
    localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(items))
    if (isAuthenticated) {
      await deleteUserCart(itemId)
    }
    setInstantCheckoutItem(null)
  }
  const toggleAllCartItemsState = async (value: boolean) => {
    setInactiveCartItems(value ? [] : cartItems.map((c) => c._id))
  }
  const toggleCartItemState = async (itemId: string) => {
    const exists = inactiveCartItems.includes(itemId)
    setInactiveCartItems((state) =>
      exists ? state.filter((s) => s !== itemId) : [...state, itemId]
    )
  }
  const addToWishlist = async (item: ShortCourse) => {
    if (
      wishlistItems?.filter((wishlistItem) => wishlistItem?._id === item?._id)
        .length == 0
    ) {
      const items = [...wishlistItems, item]
      setWishlistItems(items)
      localStorage.setItem(LOCALSTORAGE_WISHLIST_KEY, JSON.stringify(items))
      if (isAuthenticated) {
        await addUserWishlist(item._id)
      }
    }
  }
  const removeFromWishlist = async (itemId: string) => {
    const items = wishlistItems.filter((item) => item?._id !== itemId)
    setWishlistItems(items)
    localStorage.setItem(LOCALSTORAGE_WISHLIST_KEY, JSON.stringify(items))
    if (isAuthenticated) {
      await deleteUserWishlist(itemId)
    }
  }
  const getCartTotal = () => {
    let priceSum = 0
    if (instantCheckoutItem) {
      return (
        // @ts-ignore
        (+instantCheckoutItem?.salePrice as number) ||
        +instantCheckoutItem?.price
      )
    }
    cartItems
      ?.filter((c) => !inactiveCartItems.includes(c._id))
      ?.forEach((item) => {
        // @ts-ignore
        priceSum = priceSum + (+item?.salePrice || +item?.price || 0)
      })
    return priceSum
  }
  const getCartTotalDiscount = () => {
    let discountSum = 0

    discounts?.forEach(async (discount) => {
      if (discount.courses) {
        const course = discount.courses.find((item: string) => {
          if (instantCheckoutItem && instantCheckoutItem._id === item) {
            return instantCheckoutItem
          }
          return cartItems
            ?.filter((c) => !inactiveCartItems.includes(c._id))
            ?.map((i) => i._id)
            .includes(item)
        })
        if (course) {
          if (discount.valueType === 'fixed') {
            if (course.salePrice) {
              const discountValue = +discount.value
              discountSum = discountSum + discountValue
            } else {
              const discountValue = +discount.value
              discountSum = discountSum + discountValue
            }
          } else if (discount.valueType === 'percentage') {
            if (course.salePrice) {
              const discountValue =
                (+discount.value / 100) *
                parseInt(course?.salePrice?.toString() || '0', 10)
              discountSum = discountSum + discountValue
            } else {
              const discountValue = (+discount.value / 100) * +course.price
              discountSum = discountSum + discountValue
            }
          }
        }
      }
    })
    return discountSum * 100
  }
  const getPayableAmount = (): number => {
    return getCartTotal() - getCartTotalDiscount()
  }

  const addCoupon = (coupon: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await validateCoupon(coupon, cartItems)
        if (response) {
          setCoupons((state) => [...state, response])
          resolve()
        } else {
          reject()
        }
      } catch (err) {
        console.log(err)
        reject()
      }
    })
  }
  const checkDiscount = (code: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const items = instantCheckoutItem
          ? [instantCheckoutItem]
          : cartItems.filter((c) => !inactiveCartItems.includes(c._id))
        const response = await validateDiscount(
          code,
          items.map((i) => i._id),
          instantCheckoutItem !== null
        )
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }
  const addDiscounts = (code: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await checkDiscount(code)
        if (response) {
          setDiscounts((state) => [...state, response])
          resolve()
        } else {
          reject()
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  const removeDiscount = (code: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        setDiscounts((state) => state.filter((s) => s.code !== code))
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
  const replaceDiscount = (
    oldDiscount: string,
    newDiscount: string
  ): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        setDiscounts((state) => [
          ...state.filter((s) => s.code !== oldDiscount),
          newDiscount,
        ])
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  const contextValues = {
    cartItems,
    addToCart,
    removeFromCart,
    inactiveCartItems,
    toggleAllCartItemsState,
    toggleCartItemState,
    savedCartItems,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    discounts,
    checkDiscount,
    addDiscounts,
    removeDiscount,
    replaceDiscount,
    coupons,
    addCoupon,
    getCartTotal,
    updateCartAndWishlist,
    getCartTotalDiscount,
    getPayableAmount,
    giftDetails,
    setGiftDetails,
    instantCheckoutItem,
    setInstantCheckoutItem,
    updateCartAndWishlistFromAPI,
  }
  return <Index.Provider value={contextValues}>{children}</Index.Provider>
}

export { useCartAndWishList, CartAndWishlistProvider }
