import { imagesData } from "../data/imagesData";

export default function PageNavigator ({currentPage, setCurrentPage, totalPages}){

    const handlePageChange = (currentPage)=>{
        setCurrentPage(currentPage);
    }

    return(
        <section className="board-page-section">
            <button
            onClick={()=>handlePageChange(currentPage = 1)}> {/*나중에 수정*/}
            <img src={imagesData.boardLastLeft} />
            </button>
            <button 
            disabled={currentPage === 1}
            onClick={()=>handlePageChange(currentPage -1)}
            >
                <img src={imagesData.boardLeftArrow} />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button 
                key={index +1}
                onClick={()=> handlePageChange(index + 1)}
                className={`board-page-button ${currentPage === index +1 ? "board-page-button-selected":"board-page-button-unselected"}`}> <p>{index +1}</p>
                </button>
            ))}
            <button 
            disabled={totalPages === currentPage} 
            onClick={()=>handlePageChange(currentPage +1)}
            >
                <img src={imagesData.boardRightArrow} />
            </button>
            <button>
                <img src={imagesData.boardLastRight} />
            </button>
        </section>
    )
}

