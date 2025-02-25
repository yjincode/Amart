import { useProduct } from "../context/productContext";
import BestProduct from "./BestProduct";
import BestProductSecond from "./BestProductSecond";

export default function HomeLastSection (){
    const {products} =useProduct();
    const currentProductsItem2 = products.slice(3,7)

    return(
        <section className="home-last-section">
        <div>
            <p>인기 상품</p>
            <div>주문량이 가장 많은 상품들입니다</div>
        </div>

        <div className="home-last-section-best">
        {products.length > 0 ?
          products.slice(0,1).map((product)=>(
            <BestProduct 
            key={product.uid}
            product={product} 
            gold={true}/>
          )): ""
        } 
        {products.length > 0 ?
          products.slice(1,2).map((product)=>(
            <BestProduct 
            key={product.uid}
            product={product} 
            gold={false}/>
          )): ""
        } 
        </div> 

        <div>
        {currentProductsItem2.length > 0 ?
          currentProductsItem2.map((product)=>(
            <BestProductSecond
            key={product.uid}
            product={product} 
            />
          )): ""
        } 
        </div>
        
        </section>
    )
}