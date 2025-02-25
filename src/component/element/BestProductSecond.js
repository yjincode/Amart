

export default function BestProductSecond ({product}) {

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
          <div className="home-best-product-Second-card">
                <img src={imageUrlArray[0]}/>
                <div className="home-best-product-Second-text">
                    <div>
                        <p>{product?.product || "상품명 없음"}</p>
                        <p>{product?.unit || ""}</p>
                    </div>
                    <div>
                        <p>{product?.sale?.toLocaleString() || "0"}원</p>
                        <p>{product?.cost?.toLocaleString() || ""}원</p>
                    </div>
                </div>
           </div>
        </>
    )
}