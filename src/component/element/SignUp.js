import {useEffect, useState} from "react";
import {imagesData} from "../data/imagesData";
import Header from "./Header";
import {API_BASE_URL} from "../data/ApiBaseURL";

export default function SignUp({onSubmit, checkIdAvailability}) {
    const [id, setId] = useState(""); // 입력된 아이디 상태
    const [idStatus, setIdStatus] = useState(""); // 아이디 상태 메시지
    const [idError, setIdError] = useState(false); // 에러 여부
    const [password, setPassword] = useState("");
    const [passwordStatus, setPasswordStatus] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false); // 전체 동의 여부
    const [agreements, setAgreements] = useState({
        terms: false, // 이용약관 필수
        privacy: false, // 개인정보 필수
        marketing: false, // 선택 동의
    });

    const usernameRegex = /^[a-zA-Z0-9_-]{5,20}$/;
    const userpasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        setConfirmPasswordError(false);
        setConfirmPasswordStatus("");
    }, [password, confirmPassword]);

    const handleIdBlur = async () => {

        if (!id.trim()) {
            setIdStatus("아이디를 입력해주세요.");
            setIdError(true);
            return;
        }

        if (!usernameRegex.test(id)) {
            setIdStatus("아이디는 5~20자의 영문, 숫자, -, _만 가능합니다.");
            setIdError(true);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/public/check-id`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            });

            if (!response.ok) {
                console.log("서버 응답 상태 코드:", response.status);
                throw new Error("서버 응답 오류");
            }

            const data = await response.json();
            console.log(data.available)

            if (data.available) {
                setIdStatus("사용 가능한 아이디입니다.");
                setIdError(false);

            } else {
                setIdStatus("사용 할 수 없는 아이디입니다.");
                setIdError(true);
            }

        } catch (error) {
            console.error("아이디 중복 확인 중 오류 발생:", error);
            setIdStatus("아이디 확인 중 오류가 발생했습니다.");
            setIdError(true);
        }
    };

    const handlePasswordBlur = () => {
        if (!password.trim()) {
            setPasswordStatus("비밀번호를 입력해주세요.");
            setPasswordError(true);
            return;
        }

        if (!userpasswordRegex.test(password)) {
            setPasswordStatus("비밀번호는 8자리 이상, 하나 이상의 숫자, 영문, 특수문자를 포함해야 합니다.");
            setPasswordError(true);
            return;
        } else {
            setPasswordStatus("사용 가능한 비밀번호입니다.");
            setPasswordError(false);
        }

    }

    const handleConfirmPasswordBlur = () => {
        if (!confirmPassword.trim()) {
            setConfirmPasswordStatus("비밀번호 확인을 입력해주세요.");
            setConfirmPasswordError(true);
            return;
        }

        if (confirmPassword !== password) {
            setConfirmPasswordStatus("비밀번호가 일치하지 않습니다.");
            setConfirmPasswordError(true);
        }

        if (confirmPassword === password) {
            setConfirmPasswordStatus("비밀번호가 일치합니다.");
            setConfirmPasswordError(false);
        }
    };

    const handleAllCheck = () => {
        const newCheckedState = !isAllChecked;
        setIsAllChecked(newCheckedState);
        setAgreements(
            {terms: newCheckedState, privacy: newCheckedState, marketing: newCheckedState}
        );

        if (newCheckedState) {
            //window.open("/terms-privacy", "_blank", "noopener,noreferrer");
        }

    };

    const handleSingleCheck = (key) => {
        const newAgreements = {
            ...agreements,
            [key]: !agreements[key]
        };
        setAgreements(newAgreements);

        // 모든 필수 약관이 체크되었는지 확인 후 전체 동의 상태 업데이트
        const allChecked = Object
            .values(newAgreements)
            .every((v) => v);
        setIsAllChecked(allChecked);
    };

    const isFormValid = id.trim() !== "" && !idError && password.trim() !== "" && !passwordError && confirmPassword.trim() !== "" && !confirmPasswordError && agreements.terms && agreements.privacy;

    return (
        <> < Header /> <form
            className={`signUp-form ${isFormValid
                ? "active-form"
                : ""}`}
            onSubmit={(e) => {
                e.preventDefault();

                const formData = {
                    id: id.trim(),
                    password: e
                        .target[1]
                        .value
                        .trim(),
                    confirmPassword: e
                        .target[2]
                        .value
                        .trim()
                };

                if (!formData.id || !formData.password || !formData.confirmPassword) {
                    alert("모든 필드를 입력해주세요.");
                    return;
                }

                if (formData.password !== formData.confirmPassword) {
                    alert("비밀번호가 일치하지 않습니다.");
                    return;
                }

                if (!agreements.terms || !agreements.privacy) {
                    alert("필수 이용약관에 동의해야 회원가입이 가능합니다.");
                    return;
                }

                if (idError) {
                    alert("아이디를 다시 확인해주세요.");
                    return;
                }

                onSubmit(formData);
            }}>
            <article className="signUp-article">
                <div className="signUp-header">
                    <p className="signUp-title">A마트</p>
                    <p className="signUp-subtitle">고객 회원가입</p>
                </div>
                <div>
                    <div className="signUp-first-input-group">
                        <div className="input-group">
                            <img src={imagesData.idicon} alt="아이디 입력 아이콘"/>
                            <input type="text" placeholder="아이디" value={id}
                                // 상태 연결
                                onChange={(e) => setId(e.target.value)}
                                // 입력값 상태 업데이트
                                onBlur={handleIdBlur}
                                // 포커스 해제 시 호출
                            />
                        </div>
                        {
                            idStatus && (
                                <p
                                    className={`status-message ${
                                    idError
                                        ? "error"
                                        : "success"}`}>
                                    {idStatus}
                                </p>
                            )
                        }
                    </div>

                    <div className="signUp-first-input-group">
                        <div className="input-group">
                            <img src={imagesData.pwicon} alt="비밀번호 입력 아이콘"/>
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handlePasswordBlur}/>
                        </div>
                        {
                            passwordStatus && (
                                <p
                                    className={`status-message ${
                                    passwordError
                                        ? "error"
                                        : "success"}`}>
                                    {passwordStatus}
                                </p>
                            )
                        }
                    </div>

                    <div className="signUp-first-input-group">
                        <div className="input-group">
                            <img src={imagesData.pwicon} alt="비밀번호 확인 아이콘"/>
                            <input
                                type="password"
                                placeholder="비밀번호 확인"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={handleConfirmPasswordBlur}/>
                        </div>
                        {
                            confirmPassword && (
                                <p
                                    className={`status-message ${
                                    confirmPasswordError
                                        ? "error"
                                        : "success"}`}>
                                    {confirmPasswordStatus}
                                </p>
                            )
                        }
                    </div>
                </div>

            </article>

            <div className="agreement-section">
                <div>
                    <div
                        style={{
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center"
                        }}>

                        <p>
                            <span className="terms-highlight">이용약관</span>
                            확인하고 동의하기
                        </p>
                        <input
                            id="all-agree"
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={handleAllCheck}/>
                        <label
                            htmlFor="all-agree"
                            style={{
                                cursor: "pointer"
                            }}>전체 동의하기</label>
                    </div>
                    <div>

                        <div className="agreement-link">
                            <input
                                className="agreement-checkbox"
                                type="checkbox"
                                checked={agreements.terms}
                                onChange={() => {
                                    handleSingleCheck("terms");
                                    if (!agreements.terms) {
                                        window.open("/terms", "_blank", "noopener,noreferrer");
                                    }
                                }}/>
                            개인정보 처리방침
                        </div>

                        <div className="agreement-link">
                            <input
                                className="agreement-checkbox"
                                type="checkbox"
                                checked={agreements.privacy}
                                onChange={() => {
                                    handleSingleCheck("privacy");
                                    if (!agreements.privacy) {
                                        window.open("/privacy", "_blank", "noopener,noreferrer");
                                    }
                                }}/>
                            약관보기
                        </div>

                        <div className="agreement-link">
                            <input
                                className="agreement-checkbox"
                                type="checkbox"
                                checked={agreements.marketing}
                                onChange={() => {
                                    handleSingleCheck("marketing");
                                    if (!agreements.marketing) {
                                        window.open("/marketing", "_blank", "noopener,noreferrer");
                                    }
                                }}/>
                            개인정보 수집 및
                            <br/>이용[선택]
                        </div>

                    </div>
                </div>
                <button
                    type="submit"
                    className={`submit-button ${isFormValid
                        ? "active-button"
                        : ""}`}
                    disabled={!isFormValid}>
                    다음
                </button>
            </div>
        </form>
    </>
    );
}
