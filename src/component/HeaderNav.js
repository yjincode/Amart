import { Link } from "react-router-dom"

const headerNavItems = [
    {name:'홈', path:'/'},
    {name:'구매', path:'/buy'},
    {name:'신상품', path:'/new-arrivals'},
    {name:'문의/게시판', path:'/bulletin-board'}
  ]
export default function HeaderNav(){
    return(
    <nav className='header-nav'>
      {headerNavItems.map((item, index)=>(
        <Link key={index} to={item.path} className='header-link'>
          {item.name}
        </Link>
      ))}    
    </nav>
    )
  }