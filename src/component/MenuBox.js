<<<<<<< HEAD
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
=======
import React from "react";
import { NavLink } from "react-router-dom";
import { imagesData } from "./data/imagesData";

const menuItems = [
  { src: imagesData.baskat2, name: "판매 상품", path: "/buy" },
  { src: imagesData.lastoff, name: "마감임박 상품", path: "/closing-soon" },
  { src: imagesData.new, name: "신상품", path: "/new-arrivals" },
  { src: imagesData.best, name: "인기 상품",path: "/best-sellers" },
  { src: imagesData.board, name: "문의 게시판", path: "/bulletin-board" },
];

export default function MenuBox() {
  return (
    <nav className="menu-box">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className= "menu-link"
        >
          <img src={item.src} />
          <p>{item.name}</p>
        </NavLink>
      ))}
    </nav>
  );
}
>>>>>>> d5e9570 (최종 프론트)
