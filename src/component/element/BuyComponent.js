<<<<<<< HEAD
import gogo from '../../imgs/gogo.webp'
import cart from '../../imgs/Frame 56.png'

export default function BuyComponent (){
return (
    <article className="product-card">
        <img src={gogo} alt="맛있는 고구마"/>
        <div className="product-info">
            <div>
                <div className="product-title">
                    <p>맛있는 고구마</p>
                    <img src={cart} alt="Add to Cart" className="product-cart" />
                    </div>
                <div>
                    <p className="product-price">6,000원</p>
                    <p className="product-price-discount">9,200원</p>
                </div>
    
                <div className="product-delivery">수령일: 6.7일(토) ~ 6.8일(일)</div>
            </div>
            <div className="product-description">
                * 산지에서 직송으로 배송받은 신선한 고구마입니다. 이번 주만 이가격으로 판매합니다.
            </div>
        </div>
    </article>
)
}
=======
import { imagesData } from "../data/imagesData";
import "./BuyComponent.css";

export default function BuyComponent({ product, onClick}) {
    if (!product) return <div>상품 정보를 불러오는 중...</div>;

    let pickupArray = product.pickup;
    if (typeof product.pickup === "string") {
    try {
        pickupArray = JSON.parse(product.pickup); 
    } catch (e) {
        console.error("JSON 변환 오류(픽업일):", e);
        pickupArray = []; // 변환 실패 시 빈 배열 할당
    }
    }
    
    let imageUrlArray = product.image
    if (typeof product.image === "string") {
        try{
            imageUrlArray = JSON.parse(product.image);
        }catch (e){
            console.error("JSON 변환 오류(이미지)", e);
            imageUrlArray = [];
        }
    }

    const formattedPickupDates = Array.isArray(pickupArray)
        ? pickupArray.map(date => new Date(date).toLocaleDateString("ko-KR", { month : "2-digit", day: "2-digit", weekday: "short"})).join(", ")
        : "날짜 미정";


    return (
        <article className="product-card" onClick={onClick}>
            <img src={imageUrlArray[0] || "/images/default.jpg"} alt={product?.product || "상품 이미지"} />
            <div className="product-info"> 
                <div>
                    <div className="product-title">
                        <p>{product?.product || "상품명 없음"}</p>
                        <img src={imagesData.cart} alt="Add to Cart" className="product-cart" />
                    </div>
                    <div>
                        <p className="product-price">{product?.sale?.toLocaleString() || "0"}원</p>
                        <p className="product-price-discount">{product?.cost?.toLocaleString() || ""}원</p>
                    </div>
                    <div className="product-delivery">
                        <p>수령일: </p>
                        <p title={formattedPickupDates}>{formattedPickupDates}</p>
                    </div>
                    <div className="product-saleDeadline">
                        <p>마감일: </p>
                        <p>{new Date(product?.saleDeadline).toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "long"})}</p>
                    </div>
                </div>
                <div className="product-description">
                    {product?.shortComment || ""}
                </div>
            </div>
        </article>
    );
}
>>>>>>> d5e9570 (최종 프론트)
