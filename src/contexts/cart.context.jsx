import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: null,
  cartItems: [],
  setIsCartOpen: () => null,
  addItemToCart: () => null,
  cartCount: 0,
})

const addCartItem = (cartItems, producToAdd) => {

  const existingCartItem = cartItems.find((cartItem) => cartItem.id === producToAdd.id)
  if (existingCartItem) {

    return cartItems.map((cartItem) => 
      cartItem.id === producToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )

  }

  return [...cartItems, { ...producToAdd, quantity: 1}]
}
 

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {

    const newCartCount = cartItems.reduce((total, cartItem) =>  total + cartItem.quantity ,0 ) 
    setCartCount(newCartCount)

  }, [cartItems])
  

  const addItemToCart = ( productToAdd ) => {
    setCartItems(addCartItem( cartItems, productToAdd ))
  }


  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }


  return <CartContext.Provider value={value} >{ children }</CartContext.Provider>
}