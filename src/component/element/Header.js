import { Link, NavLink } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { imagesData } from "../data/imagesData";
import { throttle } from "lodash";
import './Header.css';
import { useCart } from "../context/cartContext";


export default function Header({ scrollEvent }) {
    const { auth, logout } = useAuth();
    const { toggleCart, cart } = useCart();

    const [isVisible, setIsVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuList = [
        {name:"홈", path:"/"},
        {name:"판매", path:"/buy"},
        {name:"신상품", path:"/new-arrivals"},
        {name:"게시판", path:"/bulletin-board"}
    ]

    useLayoutEffect(()=>{   
            if(!scrollEvent) setIsVisible(true);

            if(scrollEvent){
            const handleScroll = throttle(()=>{
                if (window.scrollY >= 200){
                    setIsVisible(true);
                }else{
                    setIsVisible(false);
                }
            },400)
            window.addEventListener('scroll', handleScroll);
            return()=>window.removeEventListener('scroll', handleScroll);
           }}
           ,[scrollEvent]);

        const toggleMenu = () => {
            setMenuVisible(!menuVisible);
        };

    return (
        <header>
            <Link to="/login" 
            className={`hedden-loing-icon ${!isVisible && auth.isAuthenticated === false ? 
             "hedden-loing-icon-active" : "hedden-loing-icon-hiden"}`}>
            <img src={imagesData.loginIcon1} alt="login" />
            </Link>
            <div className={`header-box ${isVisible? 'header-box-active' : 'header-box-hiden'}`}>
                <Link to="/" className="header-box-logo"><p style={{width:"max-content"}}>A마트</p></Link>
                <nav className="header-box-nav">
                    {menuList.map((list, index)=>(
                        <NavLink
                        key={index}
                        to={list.path}
                        className="header-menu-list"
                        >
                        <p>{list.name}</p>
                        </NavLink>
                    ))}
                </nav>
                <div className="header-box-div">
                    {auth.isAuthenticated ? (
                        <>
                            <span style={{ display: "flex", alignItems: "center", position: "relative" }}>
                                <p style={{width : "max-content"}}>{auth.nickName} 님 환영합니다</p>
                                <img
                                    src={imagesData.menuicon}
                                    onClick={toggleMenu}
                                    alt="popup-menu"
                                    style={{ cursor: "pointer", marginLeft: "10px" }}
                                />
                            </span>
                            <div className={`popup-menu ${menuVisible ? "show" : "hide"}`}>
                                <ul>
                                    <li>
                                        <Link to="/mypage">마이페이지</Link>
                                    </li>
                                    <li>
                                        <Link to="/profile">내 정보</Link>
                                    </li>
                                    <li>
                                        <Link to="/bulletin-board">문의/게시판</Link>
                                    </li>
                                    <li onClick={logout}>로그아웃</li>
                                    {auth.userRole === "seller_user" && (
                                        <li>
                                            <Link to="/seller-page">관리자 페이지</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link to="/login">
                            <img src={imagesData.login} alt="login"/>
                        </Link>
                    )}

                    {/* ✅ 장바구니 버튼 */}
                    <div className="cart-container">
                        <img 
                            src={imagesData.cart}
                            style={{cursor:'pointer'}}
                            alt="장바구니" 
                            className="cart-icon"
                            onClick={toggleCart} 
                        />
                       {cart.length > 0 ? 
                       <div className="cart-count">{cart.length}</div>
                        :
                        ""
                       }

                    </div>
                </div>
            </div>
        </header>
    );
}
