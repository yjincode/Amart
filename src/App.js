import './App.css';

import MainSwipe from './component/MainSwipe';
import Header from './component/Header';
import { Route, Routes } from 'react-router-dom';
import MenuBox from './component/MenuBox';

function HeaderNav(){
  <nav className='header-nav'>
    
  </nav>
}

function BuyPage (){
  return <h1>BuyPage</h1>
}
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
    <Header></Header>
    <MainSwipe></MainSwipe>
    <MenuBox></MenuBox>
    <Routes>
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/closing-soon" element={<ClosingSoon />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/best-sellers" element={<BestSellers />} />
        <Route path="/bulletin-board" element={<BulletinBoard />} />
      </Routes>
    </>
  );
}

export default App;
