export const updateCart = state => {
  state.totalPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  localStorage.setItem('cart', JSON.stringify(state))

  return state
}
