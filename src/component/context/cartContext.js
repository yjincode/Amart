import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartVisible, setCartVisible] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);
  
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]); 

    const toggleCart = () => {
        setCartVisible(!cartVisible);
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex(item => item.uid === product.uid);
            let updatedCart;

            if (existingIndex > -1) {
                updatedCart = prevCart.map((item, index) =>
                    index === existingIndex ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            } else {
                updatedCart = [...prevCart, product];
            }

            return updatedCart; 
        });
    };

    const removeFromCart = (uid) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item.uid !== uid);
            return updatedCart;
        });
    };
  
    const clearCart = () => {
        setCart([]); 
        localStorage.removeItem("cart"); 
    };

    return (
        <CartContext.Provider value={{ 
            cartVisible, 
            setCartVisible, 
            toggleCart, 
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
