import React from "react";

import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

type AuthType = 'Login' | 'Register';

interface AuthPageProps {
    AuthType: AuthType
}

const AuthPage: React.FC<AuthPageProps> = ({ AuthType: authType }) =>{


    return <div>
        {(authType == 'Login')
        ?<LoginForm />
        :<RegisterForm />
        }
    </div>
}

export default AuthPage;