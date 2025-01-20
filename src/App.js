import './App.css';

import {Route, Routes } from 'react-router-dom';
import HomePage from './component/Pages/HomePage';
import BuyPage from './component/Pages/BuyPage';
import LoginPage from './component/Pages/LoginPage';
import SignUp from './component/Pages/SignUp';


function ClosingSoon (){
  return <h1>ClosingSoon</h1>
}
function NewArrivals (){
  return <h1>NewArrivals</h1>
}
function BestSellers (){
  return <h1>BestSellers</h1>
}
function BulletinBoard (){
  return <h1>BulletinBoard</h1>
}

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/closing-soon" element={<ClosingSoon />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/best-sellers" element={<BestSellers />} />
        <Route path="/bulletin-board" element={<BulletinBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up"element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
