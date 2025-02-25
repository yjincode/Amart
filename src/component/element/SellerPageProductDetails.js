import { useEffect, useState } from "react";
import { imagesData } from "../data/imagesData";
import { useNavigate } from "react-router-dom";
import "./SellerPageProductDetails.css";
import { useCart } from "../context/cartContext";

function SellerPageProductDetails({ productData, isPreviewMode, previewUrls, setIsModalOpen }) {
    const [quantity, setQuantity] = useState(1);
    const maxQuantity = 99;
    const minQuantity = 1;
    const [firstImgView, setFirstImgView] = useState(0) ;
    const { addToCart } = useCart();

    const navigate = useNavigate();

    const safeJsonParse = (value) => {
        if (!value) return [];
        try {
            return JSON.parse(value);
        } catch (e) {
            console.error("JSON 변환 오류:", e);
            return [];
        }
    };

    const totalPrice = productData?.sale ? productData.sale * quantity : "";
    const images = safeJsonParse(productData.image);

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > minQuantity) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    let pickupArray = [];
    if (productData.pickup) {
        if (typeof productData.pickup === "string") {
            try {
                pickupArray = safeJsonParse(productData.pickup);
            } catch (e) {
                console.error("JSON 변환 오류(픽업일):", e);
                pickupArray = [];
            }
        } else if (Array.isArray(productData.pickup)) {
            pickupArray = productData.pickup;
        }
    }

    const handleClick = (index) =>{
        setFirstImgView(index);
    }

    const createCartItem = () => ({   //<===암시적 반환(Implicit Return) 리턴을 생략하고 ({...}) 을 넣어서 함수가 자동으로 객체반환
            uid: productData.uid,
            product: productData.product,
            sale: productData.sale,
            cost: productData.cost,
            image: images[0],
            quantity: quantity,
            unit: productData.unit,
            category: productData.category
        })

    const handleAddToCart = () => {
        addToCart(createCartItem()); 
        setIsModalOpen(false);
    }
    
    const buyNow=() => {
        addToCart(createCartItem());
        navigate("/checkout");
    }

    return (
        <div className="product-details-form">
            <section className="product-details-section">
                <div className="product-details-left-box">
                    
                    {isPreviewMode ? (
                        previewUrls.length > 0 ?(
                            <img
                            src={previewUrls[firstImgView]} 
                            alt="상품 이미지"
                            width="200px"
                            height="200px"
                        />
                        ) : (
                            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>이미지</div>
                        )
                    ) : (
                        images.length > 0 ?(
                            <img
                             src={images[firstImgView]} 
                             alt="상품 이미지"
                             width="200px"
                             height="200px"
                            />
                        ) : (
                            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>이미지</div>
                        )
                        )}

                    <div className="product-details-bottom-img">
                        {isPreviewMode ? (
                            previewUrls.filter((index)=>index !== firstImgView).map((url, index) => (
                                <img 
                                key={index} 
                                src={url} 
                                alt={`미리보기 ${index + 1}`} width="50px" height="50px" 
                                onClick={()=>handleClick(index)}
                                />
                            ))
                        ):(
                            images.map((url, index) => (
                                <img 
                                key={index} 
                                src={url} 
                                alt={`미리보기 ${index + 1}`} width="50px" height="50px" 
                                onClick={()=>handleClick(index)}/>
                            ))
                        )
                        }
                    </div>
                </div>

                <div className="product-details-right-box">
                    <p className="product-details-name">{productData?.product || "상품이름"}</p>
                    <div>
                        <p>{productData?.sale ? `${productData.sale.toLocaleString()}원` : "상품가격"}</p>
                        <p style={{ textDecoration: "line-through", color: "gray" }}>
                            {productData?.cost ? `${productData.cost.toLocaleString()}원` : "상품기존가격"}
                        </p>
                    </div>
                    <p>{productData?.unit || "상품단위"}</p>

                    <div>
                        <p>마감일</p>
                        <p>{new Date(productData?.saleDeadline).toLocaleDateString('ko-kr',{
                        year : "2-digit",
                        month : "2-digit",
                        day : "2-digit",
                        weekday: "long"
                      }) || "마감일 정보 없음"}</p>
                    </div>

                    <div>
                        <p>수령일</p>
                        <p>{pickupArray.length > 0 ? pickupArray.map(date => new Date(date).toLocaleString("ko-KR", { 
                            month : "2-digit",
                            day : "2-digit",
                            weekday: "short"
                            })).join(", ") : "날짜정보 없음"}</p>
                    </div>

                    <div>
                        <p>{productData?.longComment || "상품 상세 정보가 없습니다."}</p>
                    </div>

                    <div>
                        <p>수량 선택</p>
                        <div>
                            <button type="button" onClick={handleDecrease}>
                                <img src={imagesData.downArrow} alt="감소" />
                            </button>
                            <span style={{ margin: "0 16px" }}>{quantity}</span>
                            <button type="button" onClick={handleIncrease}>
                                <img src={imagesData.upArrow} alt="증가" />
                            </button>
                        </div>
                        <div>
                            <p style={{ fontWeight: "bold" ,
                                width: "100px",
                                textAlign: "end"
                            }}>{totalPrice.toLocaleString()}원</p>
                        </div>
                    </div>

                    <div>
                    {isPreviewMode ? 
                    <>
                       <button type="button">바로 구매하기</button>
                       <button type="button">장바구니 담기</button>
                    </> 
                      : 
                    <>
                       <button type="button" onClick={buyNow}>바로 구매하기</button>
                       <button type="button" onClick={handleAddToCart}>장바구니 담기</button>
                    </>             
                    }
                        
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SellerPageProductDetails;
