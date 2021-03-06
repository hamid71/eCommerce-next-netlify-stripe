import { createContext } from "react"
import { useState,useEffect } from "react"
export const Context = createContext()
const Cart = ({children}) => {
    const getInitialCart = ()=> JSON.parse(localStorage.getItem("cart"))
const [cart, setCart]=useState([])
const [isOpen,setIsOpen]=useState(false)
const [total,setTotal]=useState(0)
// to avoid ReferenceError: localStorage is not defined
//because localStoarage fired only on client side, we need to run 
//useEffect one more time with empty array on server side
useEffect(()=>{
const initialCart = getInitialCart()
if(initialCart){
    setCart(initialCart)
}
},[])
// we useEffect to keep old cart details 
useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
    let newTotal =0
    cart.forEach(element => {newTotal+=element.price * element.qty
        
    });
    setTotal(newTotal)

}, [cart])
const openCart = ()=>{
    setIsOpen(true)
}
const closeCart =() =>{
    setIsOpen(false)
}
const addItemToCart = (product, qty = 1) =>{
    const item = cart.find(i => i.id===product.id)
    if(item){
        item.qty +=qty
        setCart([...cart])
    }
    else {
        setCart([...cart,{...product, qty}])
    }
    
}
const removeItemFromCart = (id) =>{
    const newCart = cart.filter((item)=>{
        return item.id !== id
    })
    setCart(newCart)
}
const clearCart = () =>{
    localStorage.removeItem("cart")
    setCart([])
}
  const exposed= {
        cart,
        addItemToCart,
        removeItemFromCart,
        openCart,
        closeCart,
        isOpen,
        total,
        clearCart,
  }
  return (
    <Context.Provider value = {exposed}>
      {children}
    </Context.Provider>
  )
}

export default Cart
