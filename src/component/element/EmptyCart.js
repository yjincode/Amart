import { useNavigate } from "react-router-dom";
import { imagesData } from "../data/imagesData";
import styled from "styled-components";

const StyledAside = styled.aside`
     display: flex;
     height: max-content;
     align-items: center;
     flex-direction: column;
     margin: auto 0 420px 0;
     gap: 16px;

     & >img {
     width: 200px;
}

     & >p {
     font-size: 20px;
}

     & > button {
     border: none;
     width: 200px;
     height: 40px; 
     border-radius: 8px;
     cursor: pointer;
     transition: 0.3s;
     font-size: 12px;
}

     & > button:hover{
      background-color: rgba(51, 171, 245, 1);
      color: white;
}
    `

export default function EmptyCart () {
    
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/buy");
    }

   return(
    <StyledAside>
      <img src={imagesData.cart} alt="carticon"/>
      <p>장바구니가 비어있어요</p>
      <button onClick={handleClick}>인기상품 보러가기</button>
    </StyledAside>
   )
}