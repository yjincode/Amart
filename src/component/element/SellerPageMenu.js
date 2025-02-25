import { Link } from "react-router-dom"

const headerNavItems = [
    {name:'상품관리', path:'/'},
    {name:'카테고리 관리', path:'/buy'},
    {name:'주문 관리', path:'/new-arrivals'},
    {name:'주문 통계', path:'/bulletin-board'}
  ]

export default function SellerPageMenu(){
    return(
    <nav className='seller-page-menu'>
      {headerNavItems.map((item, index)=>(
        <Link key={index} to={item.path} className='seller-page-link'>
          {item.name}
        </Link>
      ))}    
    </nav>
    )
  }