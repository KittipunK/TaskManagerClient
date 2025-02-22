import React,{ useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface taskProps{
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

declare global {
    namespace JSX {
        interface IntrinisicElements {
            'taskProps': taskProps
        }
    }
}

interface TaskPageProps {

}

const TaskPage: React.FC<TaskPageProps> = ({ }) => {

    const navigate = useNavigate();

    const [token] = useState<string | null>(localStorage.getItem('token'));
    const [tasks, setTasks] = useState<taskProps[]>([]);
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
        }).then(()=>{

        }).then(data=>{
            if(data!=undefined){
                setTasks(data);
            }
        })
    },[])

    const onSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
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
            <form onSubmit={(e)=>{onSubmit(e)}}>
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
                {tasks.map((props, index)=>{
                    const [expand, setExpand] = useState<boolean>(false);

                    const onExpand = () =>{
                
                    }
                
                    const onEdit = () =>{
                
                    }
                
                    const onDelete = () =>{
                
                    }
                
                    return <li key={props.id} className="taskTemplate">
                        <input type="checkbox" checked={(props.isComplete?true:false)}/>
                        <p>{props.title}</p>
                        {(props.description?.length<=0)&&
                        <button onClick={()=>onExpand()}>{'>'}</button>
                        }
                        <button onClick={()=>onEdit()}>edit</button>
                        <button onClick={()=>onDelete()}>delete</button>
                    </li>
                })}
                </ul>
            </div>
        </div>
    </div>
}

export default TaskPage;