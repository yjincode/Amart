import axios from "axios";
import SignUp from "../element/SignUp";
import {useNavigate} from "react-router-dom";
import {API_BASE_URL} from "../data/ApiBaseURL";
import Header from "../element/Header";
import "./ConsumerSignUp.css";

export default function ConsumerSignUp() {

    const navigate = useNavigate();

    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users`, formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            navigate("/consumer-sign-up-details");
        } catch (error) {
            if (error.response) {
                console.log(error)
            }
        }
    };

    return (
        <>
        <Header scrollEvent={false}/>
          <div className="color-body">
            <SignUp onSubmit={handleFormSubmit}/>
          </div>
        </>
        
    )
}
