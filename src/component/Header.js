import loginImg from '../imgs/loginimg.png';
import cartImg from '../imgs/cartsimg.png';

export default function Header(){
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