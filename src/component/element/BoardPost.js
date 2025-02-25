import axios from "axios";
import { useAuth } from "../context/authContext";
import { API_BASE_URL } from "../data/ApiBaseURL";
import { useEffect } from "react";

export default function BoardPost ( {onPostSuccess, menuChange} ){ 
    const boardMenu = [
        {key : "QnA", name: "자주 묻는 질문 (QnA)"},
        {key : "Notice", name: "공지사항"},
        {key: "Question", name: "질문 게시판"}    
    ]

    const {auth} =useAuth();
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formData = new FormData(e.target)

        const postData ={
            title: formData.get("title"),
            content : formData.get("content"),
            category : menuChange,
            userId : auth.userUid
        }

        let response;
        try{
        response = await axios.post(`${API_BASE_URL}/boardPost`, postData, {
            headers: {  "Content-Type" : "application/json" },
        }); 
        alert("게시물이 정상적으로 등록 되었습니다");
        onPostSuccess();
        return 
        }catch(error){
        console.error("게시글 등록 중 에러발생", e)
        }
        
    }

    return(       
        <form 
        className="board-madal-content"
        onSubmit={handleSubmit}>
            <p>{boardMenu.find((item) => item.key === menuChange)?.name} 작성</p>
            <div>
               <p>게시글 제목</p>
               <input 
               type="text"
               name="title"  
               ></input>
            </div>
            <div>
                <p>게시글 내용</p>
                <textarea
                name="content"
                />
            </div>
            <button type="submit">등록하기</button>
        </form>
    )
}