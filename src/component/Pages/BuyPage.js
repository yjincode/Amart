<<<<<<< HEAD
import BuyComponent from "../element/BuyComponent";
import Header from "../Header";
import HeaderNav from "../HeaderNav";
function BuySection(){
    return(
    <section className="buy-section">
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
    </section>
    )
}

export default function BuyPage (){
    return (
        <>
        <Header />
        <HeaderNav />
        <BuySection />
        </>
    )
  }
=======
import { useEffect, useState } from "react";
import BuyComponent from "../element/BuyComponent";
import SellerPageProductDetails from "../element/SellerPageProductDetails";
import Header from "../element/Header";
import Category from "../element/Category";
import { imagesData } from "../data/imagesData";
import Footer from "../element/Footer";
import { useProduct } from "../context/productContext";
import "./BuyPage.css";

export default function BuySection() {
    const {products} = useProduct();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [categoryBox, setCategoryBox] = useState("전체");
    const [filterCategory, setFilterCategory] = useState(products);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    useEffect(()=>{
        setFilterCategory(categoryBox === "전체" ? products : products.filter(product => product.category === categoryBox));
        setCurrentPage(1);
    },[categoryBox, products])
    

    let totalPages = Math.ceil(filterCategory.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filterCategory.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <Header scrollEvent={false}/>
            <Category categoryBox={categoryBox} setCategoryBox={setCategoryBox} filterCategory={filterCategory}/>
            <section className="buy-section">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <BuyComponent 
                            key={product.uid} 
                            product={product} 
                            onClick={() => handleProductClick(product)} 
                        />
                    ))
                ) : (
                    <p>등록된 상품이 없습니다.</p>
                )}
            </section>

            <div className="buy-pagination">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    <img src={imagesData.leftarrow} />
                </button>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                    <img src={imagesData.rightarrow} />
                </button>
            </div>

            {isModalOpen && selectedProduct && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-close" onClick={closeModal}>✖</div>
                        <SellerPageProductDetails productData={selectedProduct || {}} isPreviewMode={false} setIsModalOpen={setIsModalOpen}/>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
    
}
>>>>>>> d5e9570 (최종 프론트)
