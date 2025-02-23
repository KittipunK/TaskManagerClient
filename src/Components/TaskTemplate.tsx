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
    const [data, setData] = useState<TaskTemplateProps>({
        id: id,
        title: title,
        description: description,
        isComplete: isComplete,
        userId: userId,
        token: token
    });

    const onCheckboxChange = () =>{
        fetch(`http://localhost:5000/tasks/${data.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                token: data.token,
                column: 'isComplete',
                value: !data.isComplete
            })
        }).then(async (res)=>{
            if(res.status==200){
                console.log('complete');
            }
        }).catch(err=>{console.log(err);
        })
        window.location.reload();
    }

    const onIsEdit = () =>{
        setIsEdit(!isEdit);
    }

    const onEditChange = () =>{

    }

    const onSave = () =>{

        window.location.reload();
    }

    const onDelete = () =>{

        window.location.reload();
    }

    return  <li key={data.id} className="taskTemplate">
        <input type="checkbox" disabled={isEdit} onChange={onCheckboxChange} checked={(data.isComplete?true:false)}/>
        <div className="detail">
            <h4>{data.title}</h4>
            <p>{data.description.length>0?data.description:"no description"}</p>
        </div>
        {(isEdit)
        ?<button onClick={()=>onSave()}>save</button>
        :<button onClick={()=>onIsEdit()}>edit</button>
        }
        <button onClick={()=>onDelete()} disabled={isEdit}>delete</button>
    </li>
}

export default TaskTemplate;