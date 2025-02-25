<<<<<<< HEAD
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
                  <Link to="/user-select"><p>회원가입</p></Link>
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
=======
import { Link, useNavigate } from "react-router-dom";
import Header from "../element/Header";
import axios from "axios";
import { API_BASE_URL } from "../data/ApiBaseURL";
import { useAuth } from "../context/authContext";
import "./LoginPage.css";

export default function LoginPage(){
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      const { accessToken } = response.data;
      
      login(accessToken); 
      
      alert("로그인이 완료 되었습니다");
      navigate("/"); 

    } catch (error) {
      alert("회원정보가 일치하지 않습니다.");
    }
  };

  return (
    <div className="color-body">
      <Header scrollEvent={false}/>
      <article className="login-form">
        <p>로그인</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            id: e.target[0].value.trim(),
            password: e.target[1].value.trim(),
          };
          handleFormSubmit(formData);
        }}>
          <div>
            <input type="text" placeholder="아이디"></input>
            <input type="password" placeholder="비밀번호"></input>
          </div>
          <div>
            <Link to="/consumer-sign-up"><p>회원가입</p></Link>
            <div>
              <p>아이디찾기</p>
              <p>비밀번호찾기</p>
            </div>
          </div>
          <button type="submit">로그인</button>
        </form>
      </article>
    </div>
  );
}
>>>>>>> d5e9570 (최종 프론트)
