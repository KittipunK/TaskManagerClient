import React, { useState} from "react";

interface TaskTemplateProps{
    id: number,
    title: string,
    description: string,
    isComplete: boolean,
    userId: number,
    token: string | null
}

const TaskTemplate: React.FC<TaskTemplateProps> = ({id, title, description, isComplete, userId, token}) =>{

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onCheckboxChange = () =>{
        
    }

    const onEdit = () =>{

    }

    const onDelete = () =>{

    }

    return  <li key={id} className="taskTemplate">
        <input type="checkbox" onChange={onCheckboxChange} checked={(isComplete?true:false)}/>
        <div className="detail">
            <h4>{title}</h4>
            <p>{description.length>0?description:"no description"}</p>
        </div>
        <button onClick={()=>onEdit()}>edit</button>
        <button onClick={()=>onDelete()}>delete</button>
    </li>
}

export default TaskTemplate;