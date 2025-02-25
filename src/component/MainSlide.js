import { useEffect, useState } from "react";
import { slideImages } from "./data/imagesData";

export default function MainSlide () {
    const slides = [
        {name: 'main-slide1', src:slideImages.slide1, alt:'slide1'},
        {name: 'main-slide2', src:slideImages.slide2, alt:'slide2'},
        {name: 'main-slide3', src:slideImages.slide3, alt:'slide3'},
        {name: 'main-slide4', src:slideImages.slide4, alt:'slide4'}
    ]
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        },7000)
        return 
    },[])
  
    return(
        <article className="main-slide-article">
            {slides.map((item, index)=>(
                <img 
                key={`${index}-${currentIndex}`}
                className={`main-slides ${index === currentIndex ? 'main-slides-active' : 'main-slides-hidden' } ${item.name}`}
                src={item.src}
                alt={item.alt}
               />
            ))}
        </article>
    )
}