import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: null,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => null,
  addItemToCart: () => null,
  removeItemFromCar: () => {},
  clearItemFromCart: () => {},
})

const addCartItem = (cartItems, producToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === producToAdd.id)
  
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === producToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
  )} else { return [...cartItems, { ...producToAdd, quantity: 1}] }
}


const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
  
  if ( existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id )
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemsToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemsToClear.id )
}


export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) =>  total + cartItem.quantity ,0 ) 
    setCartCount(newCartCount)

  }, [cartItems])
  
  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) =>  total + cartItem.quantity  * cartItem.price ,0 ) 
    setCartTotal(newCartTotal)
    
  }, [cartItems])

  const addItemToCart = ( productToAdd ) => {
    setCartItems(addCartItem( cartItems, productToAdd ))
  }

  const removeItemToCart = ( cartItemToRemove ) => {
    setCartItems(removeCartItem( cartItems, cartItemToRemove ))
  }

  const clearItemFromCart = ( cartItemToClear ) => {
    setCartItems(clearCartItem( cartItems, cartItemToClear ))
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemToCart, clearItemFromCart, cartCount, cartTotal }


  return <CartContext.Provider value={value} >{ children }</CartContext.Provider>
}