import { useState } from "react";
import { imagesData } from "../data/imagesData";
import { useProduct } from "../context/productContext";

export default function Category ({categoryBox, setCategoryBox, filterCategory}){
    const [categoryPopupMenu, setCategoryPopupMenu] = useState(false);
    
    const {products} = useProduct();
    const categories = ["전체", ...new Set(products.map(product => product.category))];

    const toggleCategory = ()=>{
        setCategoryPopupMenu(!categoryPopupMenu);
    }

    const handleClick = (category)=>{
        setCategoryBox(category);
        setCategoryPopupMenu(false);
    }
  
    return(
        <nav className="category-nav">
            <div className="category-tag">
                <p>판매 페이지</p>
                <div>
                    <p>상품분류: {categoryBox}</p>
                    <p> {filterCategory.length} 개의 상품이 있습니다</p>
                </div>
                
            </div>
            
             <ul className="category-ul">    
                <li>
                    <button 
                    onClick={toggleCategory}
                    className="category-button">
                        카테고리 
                        <img src={categoryPopupMenu ? imagesData.upArrow : imagesData.downArrow}/>
                    </button> 
        
                     <div className="category-container">
                     <ul className={`category-popup ${categoryPopupMenu ? "category-popup-active" : "category-popup-hiden"}`}>
                        {categories.map((menu, index) => (
                          <li
                          key={index}
                          onClick={()=>handleClick(menu)}
                          ><p>{menu}</p>
                          </li>
                        ))}
                     </ul>
                    </div>
                </li>  
        
             </ul>
            
        </nav>
    )
}