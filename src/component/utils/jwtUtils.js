function decodeToken(token) {
    try {
        if (!token) return null;

        const base64Url = token.split('.')[1]; // JWT의 Payload 부분
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const binaryData = atob(base64);

        // ✅ 한글 깨짐 방지: UTF-8 디코딩
        const utf8Decoder = new TextDecoder("utf-8");
        const decodedData = JSON.parse(utf8Decoder.decode(new Uint8Array([...binaryData].map(char => char.charCodeAt(0)))));

        return decodedData; // { memberType: "consumer", nickName: "사용자닉네임", ... }
    } catch (error) {
        console.error("토큰 디코딩 실패:", error);
        return null;
    }
}

export default decodeToken;

