import { Link } from "react-router-dom"

const menuItems = [
    {name:'사전 예약 구매' , path:'/buy'},
    {name:'마감 임박 상품' , path:'/closing-soon'},
    {name:'신상품' , path:'/new-arrivals'},
    {name:'베스트 Top 5' , path:'/best-sellers'},
    {name:'게시판' , path:'/bulletin-board'}
  ]
  
export default function MenuBox(){
    return(
    <nav className='menu-box'>
      {menuItems.map((item, index)=>(
        <Link key={index} to={item.path} className="menu-link">
          {item.name}
        </Link>
      ))}
    </nav>
    )
  }