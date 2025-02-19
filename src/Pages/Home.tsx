import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(()=>{
        if (token!=null){
            navigate('/tasks');
        }
    },[])

    return <div>
        <h2>stay organized together.</h2>
        <button onClick={()=>{navigate('/auth/login')}}>Login / Register</button>
    </div>
}

export default HomePage;