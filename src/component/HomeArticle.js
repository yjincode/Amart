import { Link } from "react-router-dom";

export default function HomeArticle (){
    return(
    <article className="home_article">
        <div className="home_article_left_box">
            <h2>가격은<span>내리고</span></h2>
            <h2>신선도는<span>올리고</span></h2>
            <h2>사전예약 주문의 즐거움</h2>
        </div>
            <div className="home-article-link-line"/>
            <Link className="home-article-link" to="/buy">주문하러가기</Link>
    </article>
    )
}