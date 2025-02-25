import './App.css';

import {Route, Routes } from 'react-router-dom';
import HomePage from './component/Pages/HomePage';
import BuyPage from './component/Pages/BuyPage';
import LoginPage from './component/Pages/LoginPage';
<<<<<<< HEAD
import SignUp from './component/Pages/SignUp';
import UserSelect from './component/Pages/UserSelect';
import SellerSignUp from './component/Pages/SellerSignUp';

=======
import ConsumerSignUp from './component/Pages/ConsumerSignUp';
import ConsumerSignUpDetails from './component/Pages/ConsumerSignUpDetails';
import { AuthProvider } from './component/context/authContext';
import SellerPage from './component/Pages/SellerPage';
import CheckoutPage from './component/Pages/CheckoutPage';
import { ProductProvider } from './component/context/productContext';
import BoardPage from './component/Pages/BoardPage';
import { CartProvider } from './component/context/cartContext';
import Cart from './component/element/Cart';
import ScrollToTopAndCartClose from './component/element/ScrollToTopAndCartClose';
>>>>>>> d5e9570 (최종 프론트)

function ClosingSoon (){
  return <h1>ClosingSoon</h1>
}
function NewArrivals (){
  return <h1>NewArrivals</h1>
}
function BestSellers (){
  return <h1>BestSellers</h1>
}
<<<<<<< HEAD
function BulletinBoard (){
  return <h1>BulletinBoard</h1>
}
=======
>>>>>>> d5e9570 (최종 프론트)

function App() {
  return (
    <>
<<<<<<< HEAD
    <Routes>
=======
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Cart />
        <ScrollToTopAndCartClose />
        <Routes>
>>>>>>> d5e9570 (최종 프론트)
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/closing-soon" element={<ClosingSoon />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/best-sellers" element={<BestSellers />} />
<<<<<<< HEAD
        <Route path="/bulletin-board" element={<BulletinBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-select" element={<UserSelect />} />
        <Route path="/seller-sign-up" element={<SellerSignUp />} />
    </Routes>
=======
        <Route path="/bulletin-board" element={<BoardPage />} />
        <Route path="/seller-page" element={<SellerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/consumer-sign-up" element={<ConsumerSignUp />} />
        <Route path="/consumer-sign-up-details" element={<ConsumerSignUpDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      </CartProvider>
      </ProductProvider>
    </AuthProvider>
>>>>>>> d5e9570 (최종 프론트)
    </>
  );
}

export default App;
