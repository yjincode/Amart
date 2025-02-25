import { imagesData } from "../data/imagesData";
import Header from "../element/Header";
import axios from "axios";
import { API_BASE_URL } from "../data/ApiBaseURL";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; 
import "./ConsumerSignUpDetails.css";
export default function ConsumerSignUpDetails() {
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleNicknameFormData = async (nicknameData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/nickname`, nicknameData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (response.status === 200) {
                alert("회원가입이 완료되었습니다!");

                // ✅ 응답에서 액세스 토큰 가져오기
                const { accessToken } = response.data;
                if (accessToken) {
                    localStorage.setItem("accessToken", accessToken);
                    login(accessToken); 
                }

                setTimeout(() => {
                    navigate("/"); 
                }, 100);
            }
        } catch (error) {
            console.error("닉네임 설정 중 오류 발생:", error);
        }
    };

    return (
        <div className="color-body">
            <Header scrollEvent={false}/>
            <section className="sign-up-details-section">
                <p>환영합니다 고객님</p>
                <form
                    className="sign-up-details-form"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const nicknameData = {
                            nickname: e.target[0].value.trim()
                        };

                        await handleNicknameFormData(nicknameData);
                    }}
                >
                    <p>사용하실 닉네임을 설정해주세요</p>
                    <div className="details-input-group">
                        <img src={imagesData.idicon} />
                        <input type="text" placeholder="닉네임" />
                    </div>
                    <p>※ 닉네임을 설정하지 않으시면 자동으로 아이디로 가입됩니다.</p>
                    <p>※ 닉네임은 언제든 개인정보에서 변경 가능합니다.</p>
                    <button type="submit">저장하기</button>
                </form>
            </section>
        </div>
    );
}
