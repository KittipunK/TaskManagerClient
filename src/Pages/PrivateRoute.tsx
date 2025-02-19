import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    component: React.ComponentType<any>,
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component}) =>{
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(()=>{
        if (token==null){
            navigate('/auth/login');
        }
    },[])

    return (<Component/>);
}

export default PrivateRoute;