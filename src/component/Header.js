import loginImg from '../imgs/loginimg.png';
import cartImg from '../imgs/cartsimg.png';
import { Link } from 'react-router-dom';

export default function Header(){
  return(
  <header>
    <div className="header-box">
      <Link to='/'>A마트</Link>
      <div>
      <Link to='/login'>
      <img src={loginImg} />
      </Link>
      <img src={cartImg} />
      </div>
    </div>
  </header>
  )
}