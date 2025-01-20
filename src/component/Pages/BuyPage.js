import BuyComponent from "../element/BuyComponent";
import Header from "../Header";
import HeaderNav from "../HeaderNav";
function BuySection(){
    return(
    <section className="buy-section">
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
      <BuyComponent />
    </section>
    )
}

export default function BuyPage (){
    return (
        <>
        <Header />
        <HeaderNav />
        <BuySection />
        </>
    )
  }