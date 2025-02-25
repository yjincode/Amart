import {useState} from "react";
import Header from "../element/Header";
import SellerPageMenu from "../element/SellerPageMenu";
import {handleSubmit} from "../utils/api";
import CalendarPicker from "../element/CalendarPicker";
import SellerPageProductDetails from "../element/SellerPageProductDetails";
import "./SellerPage.css";

export default function SellerPage() {
    const [productData, setProductData] = useState({
        product: "",
        sale: "",
        cost: "",
        unit: "",
        shortComment: "",
        longComment: "",
        pickup: [],
        saleDeadline: "",
        category: "",
        imageUrl: []
    });

    const [previewUrls, setPreviewUrls] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files) 
            return;
        
        if (productData.imageUrl.length + files.length > 5) {
            alert("최대 5장까지 이미지를 업로드할 수 있습니다.");
            return;
        }

        const fileArray = Array.from(files);

        const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
        //이건 미리보기용이고

        setProductData(prevState => ({
            ...prevState,
            imageUrl: [
                ...prevState.imageUrl,
                ...fileArray
            ]
        }));

        setPreviewUrls(prevUrls => [
            ...prevUrls,
            ...newPreviews
        ]);
    };

    const handleImageRemove = (index) => {
        setProductData(prevState => ({
            ...prevState,
            imageUrl: prevState
                .imageUrl
                .filter((_, i) => i !== index)
        }));

        setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
    };

    const submitProduct = async (e) => {
        e.preventDefault();
        await handleSubmit({productData});
    };

    return (
        <> < Header scrollEvent={false}/> <SellerPageMenu/>

        <form className="seller-page-form" onSubmit={submitProduct}>
            <div className="seller-page-top-box">
                <section className="seller-page-section">
                    <div>
                        <div className="seller-page-input">
                            <p>상품이름</p>
                            <input
                                type="text"
                                name="product"
                                value={productData.product}
                                onChange={handleChange}/>
                        </div>
                        <p>상품의 이름을 적어주세요</p>
                    </div>

                    <div>
                        <div className="seller-page-input">
                            <p>판매 가격</p>
                            <input
                                type="number"
                                name="sale"
                                value={productData.sale}
                                onChange={handleChange}/>
                        </div>
                        <p>고객에게 판매하는 가격입니다 (숫자만 입력해주세요)</p>
                    </div>

                    <div>
                        <div className="seller-page-input">
                            <p>기존 판매가격</p>
                            <input
                                type="number"
                                name="cost"
                                value={productData.cost}
                                onChange={handleChange}/>
                        </div>
                        <p>할인 전 판매금액입니다. 비교용으로 판매페이지에 노출됩니다</p>
                    </div>

                    <div>
                        <div className="seller-page-input">
                            <p>상품 단위</p>
                            <input
                                type="text"
                                name="unit"
                                value={productData.unit}
                                onChange={handleChange}/>
                        </div>
                        <p>상품의 판매 단위를 입력해주세요 (예시: 1팩 / 300g, 1묶음 / 12개 등)</p>
                    </div>

                    <div>
                        <div className="seller-page-input">
                            <p>짧은 상품설명</p>
                            <input
                                type="text"
                                name="shortComment"
                                value={productData.shortComment}
                                onChange={handleChange}/>
                        </div>
                        <p>상품 카드에 보여질 간단한 설명을 입력해주세요</p>
                    </div>

                    <div className="seller-page-main-text">
                        <div className="seller-page-input-textarea">
                            <p>상품설명 본문</p>
                            <textarea
                                name="longComment"
                                value={productData.longComment}
                                onChange={handleChange}
                                rows={5}
                                cols={10}/>
                        </div>
                        <p>상품 상세페이지의 상세 설명을 입력해주세요</p>
                    </div>
                </section>

                <SellerPageProductDetails productData={productData} isPreviewMode={true} previewUrls={previewUrls} />
            </div>

            <div className="seller-page-bottom-box">
                <CalendarPicker
                    dates={productData.pickup}
                    setDates={(newDates) => setProductData({
                        ...productData,
                        pickup: newDates
                    })}
                    label="픽업 날짜"
                    isMultiple={true}/>

                <CalendarPicker
                    dates={productData.saleDeadline}
                    setDates={(newDate) => setProductData(prevState => ({
                        ...prevState,
                        saleDeadline: newDate
                    }))}
                    label="상품 마감일"
                    isMultiple={false}/>

                <div>
                    <p>이미지 등록(최대 5장)</p>
                    <label htmlFor="filesUp" className="seller-page-input-file">
                        클릭해서 이미지 올리기
                    </label>
                    <input
                        type="file"
                        id="filesUp"
                        accept="image/*"
                        multiple="multiple"
                        style={{
                            display: "none"
                        }}
                        onChange={handleFileChange}/>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                            flexWrap: "wrap"
                        }}>
                        {
                            previewUrls.map((url, index) => (
                                <div
                                    key={index}
                                    style={{
                                        position: "relative"
                                    }}>
                                    <img
                                        src={url}
                                        alt="미리보기"
                                        width="100px"
                                        height="100px"
                                        onClick={() => handleImageRemove(index)}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                  <div>
                    <p>카테고리</p>
                  </div>
                <button type="submit">상품등록</button>
            </div>       
        </form>
    </>
    );
}
