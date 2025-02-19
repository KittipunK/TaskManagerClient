import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

type AuthType = 'Login' | 'Register';

interface AuthPageProps {
    AuthType: AuthType
}

const AuthPage: React.FC<AuthPageProps> = ({ AuthType: authType }) =>{

    const navigate = useNavigate();

    return <div>
        <div>
            <button onClick={()=>{navigate('/auth/login')}} className={(authType!='Login')?"loginBtn":"loginBtn authSelect"}>login</button>
            <button onClick={()=>{navigate('/auth/register')}} className={(authType=='Login')?"registerBtn":"registerBtn authSelect"}>register</button>
        </div>
        {(authType == 'Login')
        ?<LoginForm />
        :<RegisterForm />
        }
    </div>
}

export default AuthPage;