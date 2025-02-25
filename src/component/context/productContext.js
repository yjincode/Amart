import { createContext, useContext, useEffect, useState } from "react"
import { API_BASE_URL } from "../data/ApiBaseURL";
import axios from "axios";

const ProductContext = createContext();

export function ProductProvider ({ children }){
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        axios.get(`${API_BASE_URL}/products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("상품 데이터를 불러오는 중 오류 발생:", error);
            });
    }, []);

    return(
        <>
         <ProductContext.Provider value={{ products }}>
            {children}
         </ProductContext.Provider>
        </>
    )

}

export const useProduct = ()=> useContext(ProductContext);