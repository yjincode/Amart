import { createContext, useContext, useState, useEffect } from "react";
import decodeToken from "../utils/jwtUtils";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false, 
    userRole: "guest",
    nickName: "",
    userUid: 0
  });

  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.nickName) {
          setAuth({
            isAuthenticated: true,
            userRole: decodedToken.memberType,
            nickName: decodedToken.nickName,
            userUid: decodedToken.userUid
          });
        }
      } else {
        setAuth({ isAuthenticated: false, userRole: "guest", nickName: "", userUid: 0});
      }
    };

    updateAuthState(); // ✅ 초기 실행
    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener("storage", updateAuthState); 
    };
  }, [localStorage.getItem("accessToken")]);

  // ✅ 로그인 함수 (토큰 저장 & 상태 업데이트)
  const login = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      localStorage.setItem("accessToken", token);
      setAuth({
        isAuthenticated: true,
        userRole: decodedToken.memberType,
        nickName: decodedToken.nickName,
        userUid: decodedToken.userUid
      });
      window.dispatchEvent(new Event("storage")); 
    }
  };

  // ✅ 로그아웃 함수 (토큰 삭제 & 상태 초기화) -- 서버에서도 리프레쉬 토큰 삭제 해야함!!
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth({ isAuthenticated: false, userRole: "guest", nickName: "", userUid: 0});
    window.dispatchEvent(new Event("storage")); 
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
