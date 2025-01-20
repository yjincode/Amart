import './App.css';
import loginImg from './imgs/loginimg.png';
import cartImg from './imgs/cartsimg.png';
import MainSwipe from './component/MainSwipe';


function Header(){
  return(
  <header>
    <div className="headerBox">
      <a>A마트</a>
      <div>
      <img src={loginImg}></img>
      <img src={cartImg}></img>
      </div>
    </div>
  </header>
  )
}

function App() {
  return (
    <>
    <Header></Header>
    <MainSwipe></MainSwipe>
    
    hello
    </>
  );
}

export default App;
