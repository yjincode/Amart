import { Link } from "react-router-dom";
import Header from "../Header";

export default function LoginPage(){
    return(
        <>
        <Header />
        <p className="amart-logo" style={{width:'410px', marginTop: '150px'}}><span>A</span>마트</p>
        <article className="login-form">
            <p>로그인</p>
            <form>
                <div>
                  <input type="text"  placeholder="아이디"></input>
                  <input type="password"  placeholder="비밀번호"></input>
                </div>
                <div>
                  <Link to="/sign-up"><p>회원가입</p></Link>
                  <div>
                   <p>아이디찾기</p>
                   <p>비밀번호찾기</p>
                  </div>
                </div>
                <button>로그인</button>
            </form>
        </article>
        </>
    )
}