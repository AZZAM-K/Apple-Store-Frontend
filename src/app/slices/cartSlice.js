import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = sessionStorage.getItem('cart')
  ? JSON.parse(sessionStorage.getItem('cart'))
  : {
      cartItems: [],
      totalPrice: 0,
    }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { ...item } = action.payload
      const existItem = state.cartItems.find(
        x => x.productId === item.productId
      )

      if (existItem) {
        state.cartItems = state.cartItems.map(x =>
          x.productId === existItem.productId ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        x => x.productId !== action.payload.id
      )
      return updateCart(state)
    },

    clearCartItems: state => {
      state.cartItems = []
      state.totalPrice = 0
      sessionStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions
export default cartSlice.reducer
