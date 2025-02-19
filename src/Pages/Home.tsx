import React from "react";
import { Link } from "react-router-dom";

type UserInfo = {
    id?: number,
    username?: string,
    password?: string
}

interface HomePageProps {
    User: UserInfo
}

const HomePage: React.FC<HomePageProps> = ({ User }) => {

    return <div>
        
    </div>
}

export default HomePage;