<<<<<<< HEAD
import Header from "../Header";
import MainSwipe from "../MainSwipe";
import MenuBox from "../MenuBox";

=======
import Header from "../element/Header";
import Footer from "../element/Footer";
import HomeArticle from "../HomeArticle";
import HomeFirstSection from "../HomeFirstSection";
import HomeSecondSection from "../HomeSecondSection";
import MenuBox from "../MenuBox";
import MainSlide from "../MainSlide";
import HomeLastSection from "../element/HomeLastSection";
import "./HomePage.css";
>>>>>>> d5e9570 (최종 프론트)

export default function HomePage (){
    return(
        <>
<<<<<<< HEAD
        <Header />
        <MainSwipe />
        <MenuBox />
=======
        <Header scrollEvent={true}/>
        <MainSlide />
        <HomeArticle />
        <MenuBox />
        <HomeLastSection />
        <HomeSecondSection />
        <HomeFirstSection />
        <Footer />
>>>>>>> d5e9570 (최종 프론트)
        </>
    )
}