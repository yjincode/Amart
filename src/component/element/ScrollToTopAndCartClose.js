import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/cartContext";

const ScrollToTopAndCartClose = () => {
    const {setCartVisible} = useCart();
    const { pathname } = useLocation();
 
    useEffect(() => {
        setCartVisible(false);
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTopAndCartClose;