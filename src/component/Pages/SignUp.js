import Header from "../Header";
import idicon from "../../imgs/idIcon.png"
import pwicon from "../../imgs/pwIcon.png"
import numicon from "../../imgs/numIcon.png"
import adicon from "../../imgs/adIcon.png"
export default function SignUp (){
    return(
        <>
        <Header />
        <p className="amart-logo" style={{width:'660px', marginTop: '50px'}}><span>A</span>마트</p>
        <article className="signUp-form">
         <form>
            <div>
                <img src={idicon}/>
                <input type="text" placeholder="아이디"></input>
            </div>
            <div>
                <img src={pwicon}/>
                <input type="password" placeholder="비밀번호"></input>
            </div>
            <div>
                <img src={numicon}/>
                <input type="text" placeholder="전화번호"></input>
            </div>
            <div>
                <img src={adicon}/>
                <input type="text" placeholder="주소지"></input>
            </div>
         </form>
        </article>
        </>
    )
}