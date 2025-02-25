import axios from "axios";
import { API_BASE_URL } from "../data/ApiBaseURL";
import { DateTime } from "luxon";

export const handleSubmit = async ({ productData, isEdit = false, productId = null }) => {
    const formData = new FormData();

    const formattedSaleDeadline = DateTime.fromJSDate(new Date(productData.saleDeadline)).toFormat("yyyy-MM-dd'T'HH:mm:ss");

    const jsonData = {
        product: productData.product,
        sale: productData.sale,
        cost: productData.cost,
        unit: productData.unit,
        shortComment: productData.shortComment,
        longComment: productData.longComment,
        category: productData.category,
        pickup: productData.pickup,  
        saleDeadline: formattedSaleDeadline, 
    };

    formData.append("productData", JSON.stringify(jsonData)); 

    if (productData.imageUrl && productData.imageUrl.length > 0) {
        productData.imageUrl.forEach((file, index) => {
            if (file instanceof File) {
                formData.append("imageFiles", file); 
            } else {
                console.warn(`이미지 ${index}가 File이 아님:`, file);
            }
        });
    }

    try {
        let response;
        if (isEdit && productId) {
            response = await axios.put(`${API_BASE_URL}/products/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("상품이 성공적으로 수정되었습니다!");
        } else {
            response = await axios.post(`${API_BASE_URL}/products`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("상품이 성공적으로 등록되었습니다!");
            window.location.reload();
        }

        return response.data;
    } catch (error) {
        console.error("❌ 상품 등록/수정 중 오류 발생:", error);

        if (error.response && error.response.data) {
            alert("상품 등록/수정 실패: " + error.response.data);
        } else {
            alert("상품 등록/수정 실패: 서버 응답 없음");
        }

        throw error;
    }
};

export const fetchInquiries = async (currentPage, pageSize, menuChange) => {
    const response = await axios.get(`${API_BASE_URL}/inquiries`,{
        params: {
            page: currentPage,
            size: pageSize,
            menu: menuChange
        }
    });
    return response.data;
};

export const fetchReplies = async (postUid) => {
    const response = await axios.get(`${API_BASE_URL}/replies/${postUid}`);
    return response.data;
};

export const postReply = async (postUid, content) => {
    await axios.post(`${API_BASE_URL}/replies`, { postUid, content });
};