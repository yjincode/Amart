import Header from "../element/Header";
import Footer from "../element/Footer";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import EmptyCart from "../element/EmptyCart";
import { useCart } from "../context/cartContext"; 


export default function CheckoutPage() {
    const { cart, addToCart, removeFromCart} = useCart(); 
    const navigate = useNavigate();


    // ✅ 개별 상품 수량 변경 (수량 증가/감소)
    const handleQuantityChange = (uid, newQuantity) => {
        if (newQuantity < 1) return; // 최소 수량 1 유지

        const product = cart.find(item => item.uid === uid);
        if (!product) return;

        addToCart({ ...product, quantity: newQuantity - product.quantity }); 
    };

    const handleRemove = (uid) => {
        removeFromCart(uid); 
    };

    const backPage = () => {
        navigate("/buy");
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.sale * item.quantity, 0); 
    const totalSale = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0); 

    return (
        <>
            <Header scrollEvent={false} />
            <div className="checkout-page">
                <h2>장바구니 목록</h2>

                {cart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <form className="checkout-page-form">
                        <ul className="checkout-cart-ul">
                            {cart.map((item) => ( 
                                <li className="checkout-cart-li" key={item.uid}>
                                    <img src={item.image} alt="item"/>
                                    <div className="checkout-cart-text">
                                        <div>
                                            <div>
                                                <p>{item.product}</p>
                                                <p>{item.unit}</p>
                                            </div>
                                            <p>{item.sale.toLocaleString()}원</p>

                                            <div>
                                                <p>수량선택</p>
                                                <div className="checkout-cart-quantity">
                                                    <button
                                                        className="checkout-quantity-btn"
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.uid, item.quantity - 1)}
                                                    >
                                                        －
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className="checkout-quantity-btn"
                                                        type="button"
                                                        onClick={() => handleQuantityChange(item.uid, item.quantity + 1)}
                                                    >
                                                        ＋
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={() => handleRemove(item.uid)}>삭제</button>
                                            <p className="checkout-cart-total-price">
                                                {(item.sale * item.quantity).toLocaleString()}원
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="checkout-cart-right">
                                        <div>
                                <p>상품가격</p>
                                <span>{totalSale.toLocaleString()}</span>
                                <p>원</p>
                            </div>
                            <div>
                                <p>할인가격</p>
                                <span>{(totalSale - totalPrice).toLocaleString()}</span>
                                <p>원</p>
                            </div>
                            <div>
                                <p>최종 가격</p>
                                <p>
                                    <span>{totalPrice.toLocaleString()}</span>원
                                </p>
                            </div>
                            <div>
                                <p>픽업일 선택</p>
                                <select>
                                    <option> 임시 </option>
                                </select>
                            </div>

                            <div>
                                <button type="button" onClick={backPage}>더 담으러 가기</button>
                                <button>주문 하기</button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
            <Footer />
        </>
    );
}
