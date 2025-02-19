import React from "react";
import { Route, Navigate, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
    component: React.ComponentType<any>,
    RouteProps: RouteProps
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest}) =>{
    const token = localStorage.getItem('token');
    return (<Route
        {...rest}
        element = {
            (token)
            ?(<Component />)
            :(<Navigate to='/auth/login' replace />)
        }
        />
    );
}

export default PrivateRoute;