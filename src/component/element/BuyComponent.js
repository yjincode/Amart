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