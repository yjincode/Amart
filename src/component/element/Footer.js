import { Link } from "react-router-dom";
import { imagesData } from "../data/imagesData";
import "./Footer.css";

export default function Footer (){
    return(
        <footer className="footer-box">
            <div>
                <div>
                    <p><span>A</span>마트</p>
                    <p>"가격은 내리고</p>
                    <p>신선도는 올리고"</p>
                </div>
                <div>
                    <div>
                        <p>A마트 대표 : 홍길동</p>
                        <p>(주)A마트 주소: 서울시 00구 00동 00대로 3길</p>
                        <p>사업자 등록번호: 123-12-12345</p>
                        <p>통신 판매업 신고: 1234-서울강동-12345</p>
                    </div>
                    <div>
                        <Link className="footer-agreement-link" to="/">개인정보처리방침 </Link>
                        <Link className="footer-agreement-link" to="/">회사소개</Link>
                        <Link className="footer-agreement-link" to="/">이용약관</Link>
                        <Link className="footer-agreement-link" to="/">환불 및 교환 정책</Link>
                    </div>
                </div>
                <div>
                    <div>
                        <p>고객센터 1234-1234</p>
                        <p>운영시간 09:00 ~ 18:00</p>
                        <p>점심시간 12:00 ~ 13:00</p>
                    </div>
                    <p>SNS</p>
                    <div>
                        <Link to="/" className="footer-sns-link"><img src={imagesData.facebook}/></Link>
                        <Link to="/" className="footer-sns-link"><img src={imagesData.youtube}/></Link>
                    </div>
                </div>
            </div>
            <div className="footer-line"></div>
            <p>© 2025 A마트. All rights reserved.</p>
        </footer>
    )
}