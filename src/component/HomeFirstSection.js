import { imagesData } from "./data/imagesData"
import HomeMenuSwipe from "./HomeMenuSwipe"

export default function HomeFirstSection (){
    const slides1 = [
        {id:1, title : "exampleimage" , image : imagesData.img0 },
        {id:2, title : "exampleimage" , image : imagesData.img7 },
        {id:3, title : "exampleimage" , image : imagesData.img8 },
        {id:4, title : "exampleimage" , image : imagesData.img11 },
        {id:5, title : "exampleimage" , image : imagesData.img9 },
        {id:6, title : "exampleimage" , image : imagesData.img4 },
        {id:7, title : "exampleimage" , image : imagesData.img29 },
        {id:8, title : "exampleimage" , image : imagesData.img39 },
        {id:9, title : "exampleimage" , image : imagesData.img2 },
        {id:10, title : "exampleimage" , image : imagesData.img35 },
        {id:11, title : "exampleimage" , image : imagesData.img1 },
        {id:12, title : "exampleimage" , image : imagesData.img22 },
    ]
    const slides2 = [
        {id:1, title : "exampleimage" , image : imagesData.img40 },
        {id:2, title : "exampleimage" , image : imagesData.img5 },
        {id:3, title : "exampleimage" , image : imagesData.img13 },
        {id:4, title : "exampleimage" , image : imagesData.img14 },
        {id:5, title : "exampleimage" , image : imagesData.img6 },
        {id:6, title : "exampleimage" , image : imagesData.img20 },
        {id:7, title : "exampleimage" , image : imagesData.img3 },
        {id:8, title : "exampleimage" , image : imagesData.img10 },
        {id:9, title : "exampleimage" , image : imagesData.img27 },
        {id:10, title : "exampleimage" , image : imagesData.img0 },
        {id:11, title : "exampleimage" , image : imagesData.img36 },
        {id:12, title : "exampleimage" , image : imagesData.img16 },
    ]
    
    return(
        <article className="home-first-section">
            <div>
            <p>사전예약 구매</p>
            <p>다양한 상품을 저렴하게 만나보세요!</p>
            </div>
        <HomeMenuSwipe slides ={slides1} />
        <HomeMenuSwipe slides = {slides2} reverseDirection={true}/>
        </article>
    )
 
}