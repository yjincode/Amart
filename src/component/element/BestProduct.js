import { imagesData } from "../data/imagesData"

export default function BestProduct ({product, gold}) {
   

let imageUrlArray = product.image
if(typeof product.image === "string"){
    try{
          imageUrlArray = JSON.parse(product.image)
    }catch(e){
        console.error("베스트이미지 불러오기 실패",e)
        imageUrlArray = []
    }
}
   
    return(
        <>
         <div className="home-best-product-card">
            <div><img src={imageUrlArray[0]} className="home-best-img"/></div>
            <div className="home-best-product-text">
                <img src={`${gold ? imagesData.gold : imagesData.silver}`}/>
                <p>{product?.product || "상품명 없음"}</p>
                <p>{product?.unit || ""}</p>
                <div>
                    <p>{product?.sale?.toLocaleString() || "0"}원</p>
                    <p>{product?.cost?.toLocaleString() || ""}원</p>
                </div>
                <div>
                <p>{product?.shortComment || ""}</p>
                </div>
            </div>
         </div>
        </>
    )
}