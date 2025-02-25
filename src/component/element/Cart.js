import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import { useCart } from "../context/cartContext";

export default function Cart() {
    const { cartVisible, setCartVisible, cart, addToCart, removeFromCart, clearCart } = useCart(); 
    const navigate = useNavigate();

    const closeCart = () => {
        setCartVisible(false);
    };
    
    const handleRemove = (uid) => {
        removeFromCart(uid); // 
    };
   
    const handleAllRemove = () => {
        clearCart();
    };

    // ✅ 개별 상품 수량 변경 (수량 증가/감소)
    const handleQuantityChange = (uid, newQuantity) => {
        if (newQuantity < 1) return; // 최소 수량 1 유지

        const product = cart.find(item => item.uid === uid);
        if (!product) return;

        addToCart({ ...product, quantity: newQuantity - product.quantity }); // ✅ 기존 상품 수량 변경
    };

    const goToCheckout = () => {
        navigate("/checkout");
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.sale * item.quantity, 0); 

    return (
        <>
            {/* 장바구니 드롭다운 */}
            {cartVisible && (
                <div className="cart-dropdown">
                    <button className="cart-close-btn" onClick={closeCart}>✖</button>
                    <h4>장바구니</h4>

                    {cart.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <>
                            <ul className="cart-items">
                                {cart.map((item) => ( 
                                    <li key={item.uid} className="cart-item">
                                        <img src={item.image} alt={item.product} className="cart-image" />
                                        <div className="cart-details">
                                            <p className="cart-product-name">{item.product}</p>
                                            <p className="cart-price">개당 {item.sale.toLocaleString()}원</p>

                                            <div className="cart-quantity">
                                                <button 
                                                    className="quantity-btn" 
                                                    onClick={() => handleQuantityChange(item.uid, item.quantity - 1)}
                                                >－</button>
                                                <span>{item.quantity}</span>
                                                <button 
                                                    className="quantity-btn" 
                                                    onClick={() => handleQuantityChange(item.uid, item.quantity + 1)}
                                                >＋</button>
                                                <p className="cart-total-price">
                                                    {(item.sale * item.quantity).toLocaleString()}원
                                                </p>
                                            </div>
                                        </div>
                                        <button className="remove-btn" onClick={() => handleRemove(item.uid)}>✖</button>
                                    </li>
                                ))}
                            </ul>

                            <div className="cart-summary">
                                <div>
                                    <p className="total-price">총 가격: {totalPrice.toLocaleString()}원</p>
                                    <button className="cart-all-delbtn" onClick={handleAllRemove}>전체삭제</button>
                                </div>
                                <button className="checkout-btn" onClick={goToCheckout}>주문하기</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
