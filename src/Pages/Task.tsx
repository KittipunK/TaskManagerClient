import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskTemplate from "../Components/taskTemplate";

interface TaskTemplateProps{
    id: number,
    title: string,
    description: string,
    isComplete: boolean,
    userId: number
}

type taskInputProps = {
    title: string,
    description?: string
}

interface TaskPageProps {

}

const TaskPage: React.FC<TaskPageProps> = ({ }) => {

    const navigate = useNavigate();

    const [token] = useState<string | null>(localStorage.getItem('token'));
    const [tasks, setTasks] = useState<TaskTemplateProps[]>([]);
    const [taskInput, setTaskInput] = useState<taskInputProps>({
        title: "",
        description: "",
    });

    useEffect(()=>{
        fetch('http://localhost:5000/tasks',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(async (res)=>{
            if(res.status==200){
                const fetchData = (await res.json());
                setTasks(fetchData.data);
                
            }
        }).catch(err=>{console.log(err);
        })
    },[])

    const onSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    const onSubmit = () => {
        fetch('http://localhost:5000/tasks',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(taskInput),
        }).then( async (res) =>{
            const data = await res.json();
            if(res.status==200){
                console.log(data);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    return <div>
        <button onClick={onSignOut}>Sign out</button>
        <div className="tasksArea">
            <form onSubmit={()=>{onSubmit()}}>
                <label htmlFor="title">title</label>
                <input 
                    name="title"
                    type="text"
                    maxLength={30}
                    value={taskInput.title}
                    onChange={e=>{setTaskInput({...taskInput, [e.target.name]: e.target.value});}}
                />
                <label htmlFor="description">description (optional)</label>
                <input 
                    name="description"
                    type="text"
                    maxLength={100}
                    value={taskInput.description}
                    onChange={e=>{setTaskInput({...taskInput, [e.target.name]: e.target.value});}}
                />
                <button type="submit">Submit</button>
            </form>
            <div className="taskDisplay">
                <p>My Task</p>
                <ul>
                    {tasks.map((props: TaskTemplateProps, index:number)=>{              
                        return <TaskTemplate
                            key={index}
                            id={props.id}
                            title={props.title}
                            description={props.description}
                            isComplete={props.isComplete}
                            userId={props.userId}
                            token={token}
                        />
                    })}
                </ul>
            </div>
        </div>
    </div>
}

export default TaskPage;