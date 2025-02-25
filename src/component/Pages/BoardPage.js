import { useLayoutEffect, useState } from "react";
import Header from "../element/Header";
import {fetchInquiries, fetchReplies} from "../utils/api";
import { imagesData } from "../data/imagesData";
import BoardPost from "../element/BoardPost";
import { useAuth } from "../context/authContext";
import PageNavigator from "../element/PageNavigator";
import Footer from "../element/Footer";
import "./BoardPage.css";

export default function BoardPage () {
    const {auth} = useAuth();

    const [inquiries, setInquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeUid, setActiveUid] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [eachPages, setEachPages] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuChange, setMenuChange] = useState("Notice");
    const [replies, setReplies] = useState({});

    const boardMenu = [
        {key : "QnA", name: "자주 묻는 질문 (QnA)"},
        {key : "Notice", name: "공지사항"},
        {key: "Question", name: "질문 게시판"}    
    ]
    
    useLayoutEffect(() => {
        loadInquiries(currentPage, menuChange);
    }, [currentPage, menuChange]);
    

    const loadInquiries = async(page) => {
        try{
        const data = await fetchInquiries(currentPage, pageSize, menuChange);
        setInquiries(data.inquiries);
        setTotalPages(data.totalPages);
        setEachPages(data.eachOfTotalPages);
        }catch(e){
            console.error("게시판 데이터 불러오기 실패", e)
        }
    }
    
    const handleClick = async (uid)=>{
        setActiveUid(activeUid === uid ? null : uid);
        if (!replies[uid]) {
          await loadReplies(uid);
      }
    }

    const handleModalChange = (isModalOpen) =>{
        if(auth.isAuthenticated){
        setIsModalOpen(isModalOpen)
       }else{
        alert("로그인 후 이용해주세요")
       }
    }

    const handlePostSuccess =()=>{
        setIsModalOpen(false);
        loadInquiries(currentPage);
    }

    const handleMenuChange = (menukey)=>{
        setMenuChange(menukey);
        setCurrentPage(1);
    }

    const loadReplies = async (postUid) => {
      if (!replies[postUid]) {
          const data = await fetchReplies(postUid);
          setReplies((prev) => ({ ...prev, [postUid]: data }));
      }
  };

    const displayCreateAt = (createdAt) => {
        const date = new Date(createdAt);
        const now = Date.now();
        const milliSeconds = now - date;
        const day = date.toLocaleDateString('ko-kr',{
            year : "2-digit",
            month : "2-digit",
            day : "2-digit",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false 
          })
    
        const seconds = milliSeconds / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
    
        if (seconds < 60) {
          return "방금 전";
        } else if (minutes < 60) {
          return `${Math.floor(minutes)}분 전`;
        } else if (hours < 24) {
          return `${Math.floor(hours)}시간 전`;
        } else if (days < 2) {
          return `어제 ${date.toLocaleTimeString('ko-kr',{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false 
          })}`
        } else {
          return day;
        }
      };

    return(
        <>
        <Header scrollEvent={false}/>
        <ul className="board-menu-ul">
        {boardMenu.map((item)=>(    
                <li
                key={item.key}
                className={`board-menu-li ${menuChange === item.key ? "board-menu-active" : ""}`}
                onClick={()=>handleMenuChange(item.key)}><p>{item.name}</p></li>
        ))}
        </ul>
         <div className="board-page">
            <div>{boardMenu.find((item) => item.key === menuChange)?.name}</div>
         </div>
 

        {menuChange === "QnA" &&(
            <>
            <ul className="board-page-ul">
            {inquiries
            .filter((inquiry)=>inquiry.category === "QnA")
            .map((inquiry)=>(
                <li key={inquiry.uid}
                    onClick={()=>handleClick(inquiry.uid)}
                    className="board-page-li">
                    <div className="board-page-board-menu">
                      <p>Q.</p>
                      <p>{inquiry.title}</p>
                      <p><img src={activeUid === inquiry.uid ? imagesData.upArrow : imagesData.downArrow}/></p>
                    </div>
                    <div className={`board-page-board-content ${activeUid === inquiry.uid ? "board-page-board-content-active" : "board-page-board-content-hide"}`}>
                      <div className="board-page-qna-content">
                        <p className="board-page-qna-text">A.</p>
                          {inquiry.content.split("\n").map((line, index) => (
                          <p key={index}>{line}</p>
                           ))}
                      </div>
                    </div>
                </li>
            ))}
         </ul>
            <PageNavigator currentPage = {currentPage} setCurrentPage={setCurrentPage} totalPages={eachPages} />
            </>
        )}

      {menuChange === "Notice" &&(
                 <>
            <ul className="board-page-ul">
            {inquiries
            .filter((inquiry)=>inquiry.category === "Notice")
            .map((inquiry)=>(
                <li key={inquiry.uid}
                    onClick={()=>handleClick(inquiry.uid)}
                    className="board-page-li">
                    <div className="board-page-board-menu">
                      <p>{inquiry.uid}.</p>
                      <p>{inquiry.title}</p>
                      <p>{new Date(inquiry.created).toLocaleDateString('ko-kr',{
                        year : "2-digit",
                        month : "2-digit",
                        day : "2-digit"
                      })}</p>
                      <p><img src={activeUid === inquiry.uid ? imagesData.upArrow : imagesData.downArrow}/></p>
                    </div>
                    <div className={`board-page-board-content ${activeUid === inquiry.uid ? "board-page-board-content-active" : "board-page-board-content-hide"}`}>
                        <div className="board-page-notice-text">
                          <p>작성시간</p>
                          <p>{displayCreateAt(inquiry.created)}</p>
                        </div>
                        <div className="board-page-notice-content">
                          {inquiry.content.split("\n").map((line, index) => (
                          <p key={index}>{line}</p>
                           ))}
                        </div>
                    </div>
                </li>
            ))}
         </ul>
         <PageNavigator currentPage = {currentPage} setCurrentPage={setCurrentPage} totalPages={eachPages} />
         </>
        )}

       {menuChange === "Question" &&(
             <>
                <div className="board-post-button">
                <button onClick={()=>handleModalChange(!isModalOpen)}>게시글 작성</button>
             </div>
            <ul className="board-page-ul">
            {inquiries
            .filter((inquiry)=>inquiry.category === "Question")
            .map((inquiry)=>(
                <li key={inquiry.uid}
                    onClick={()=>handleClick(inquiry.uid)}
                    className="board-page-li">
                    <div className="board-page-board-menu">
                      <p>{inquiry.uid}.</p>
                      <p>{inquiry.title}</p>
                      <p>{new Date(inquiry.created).toLocaleDateString('ko-kr',{
                        year : "2-digit",
                        month : "2-digit",
                        day : "2-digit"
                      })}</p>
                      <p><img src={activeUid === inquiry.uid ? imagesData.upArrow : imagesData.downArrow}/></p>
                    </div>
                <div className={`board-page-board-content ${activeUid === inquiry.uid ? "board-page-board-content-active" : "board-page-board-content-hide"}`}>
                    <div className="board-page-question-consumer-text">
                      <div>
                        <p>닉네임</p>
                        <p>{inquiry.nickname}</p>
                      </div>
                      <div>
                        <p>작성시간</p>
                        <p>{displayCreateAt(inquiry.created)}</p>
                      </div>
                    </div>
                    <div className="board-page-question-consumer-content">
                        {inquiry.content.split("\n").map((line, index) => (
                        <p key={index}>{line}</p>
                         ))}
                    </div>
                    <div>
                {replies[inquiry.uid] && replies[inquiry.uid].length > 0 && (
                                <div className="board-page-reply-box">
                                    <h4>사장님 답변</h4>
                                    {replies[inquiry.uid].map((reply) => (
                                        <div key={reply.id} className="board-page-reply">
                                            <p>{reply.content}</p>
                                            <span>{displayCreateAt(reply.createdAt)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                     </div>
                  </div>
                </li>
            ))}
         </ul>
         <PageNavigator currentPage = {currentPage} setCurrentPage={setCurrentPage} totalPages={eachPages} />
         </>
        )}

        {isModalOpen &&(
            <section className="board-modal-overlay">
                <div className="board-modal-close" 
                onClick={()=>handleModalChange(!isModalOpen)}>나가기 ✖</div>
                <BoardPost onPostSuccess={handlePostSuccess} menuChange={menuChange} />
            </section>
        )}

        <Footer />
        
        </>
    )
}