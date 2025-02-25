import { useState } from "react";
import { useProduct } from "./context/productContext";
import { imagesData } from "./data/imagesData";
import BuyComponent from "./element/BuyComponent";


export default function HomeSecondSection(){
    const {products} = useProduct();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const indexOfLastItem = itemsPerPage * currentPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProductsItem = products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

   return(
    <article className="home-second-section">
    <div>
        <p>마감 임박 상품</p>
        <p>주문마감 시간이 얼마 남지 않은 상품이에요!</p>
    </div>
    <div>
        {currentProductsItem.length > 0 ?
          (currentProductsItem.map((product)=>(
            <BuyComponent
            key={product.uid}
            product={product}/>
          ))
          ) : "등록된 상품이 없습니다."}
    </div>
     <div>
        <button disabled={currentPage === 1} onClick={()=>{handlePageChange(currentPage - 1)}}>
         <img src={imagesData.leftarrow} />
         </button>
         <button disabled={currentPage === totalPages} onClick={()=>{handlePageChange(currentPage +1)}}>
         <img src={imagesData.rightarrow} />
        </button>
     </div>
    </article>
   )
}