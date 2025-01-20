import { Link } from "react-router-dom";
import Header from "../Header";

export default function UserSelect(){
    return(
        <>
        <Header />
        <div className="user-select">
        <Link to="/sign-up">
        <section className="consumer-user-select">
            <p>고객</p>
            <p>회원가입</p>
        </section>
        </Link>
        <Link to="/seller-sign-up">
        <section className="seller-user-select">
            <p>사장님</p>
            <p>회원가입</p>
            <p>사업자 등록증이 필요합니다</p>
        </section>
        </Link>
        </div>
        </>
    )
}