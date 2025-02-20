import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";


interface TaskPageProps {

}

const TaskPage: React.FC<TaskPageProps> = ({ }) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token'));

    const onSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return <div>
        <button onClick={onSignOut}>Sign out</button>
        
    </div>
}

export default TaskPage;