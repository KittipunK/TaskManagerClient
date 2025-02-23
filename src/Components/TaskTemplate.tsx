import React, { useState} from "react";

interface TaskTemplateProps{
    id: number,
    title: string,
    description: string,
    isComplete: boolean,
    token: string | null
}

interface taskInputProps{
    title: string,
    description: string
}

const TaskTemplate: React.FC<TaskTemplateProps> = ({id, title, description, isComplete, token}) =>{

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [input, setInput] = useState<taskInputProps>({
        title: title,
        description: description,
    });

    const onCheckboxChange = () =>{
        fetch(`http://localhost:5000/tasks/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                token: token,
                column: 'isComplete',
                value: !isComplete
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

    const onSave = () =>{
        fetch(`http://localhost:5000/tasks/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                token: token,
                column: 'title',
                value: `'${input.title}'`
            })
        }).then(async (res)=>{
            if(res.status==200){
                console.log('complete');
            }
        }).catch(err=>{console.log(err);
        })
        fetch(`http://localhost:5000/tasks/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                token: token,
                column: 'description',
                value: `'${input.description}'`
            })
        }).then(async (res)=>{
            if(res.status==200){
                console.log('complete');
            }
        }).catch(err=>{console.log(err);
        })
        window.location.reload();
    }

    const onDelete = () =>{
        fetch(`http://localhost:5000/tasks/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(async (res)=>{
            if(res.status==200){
                console.log('complete');
            }
        }).catch(err=>{console.log(err);
        })
        window.location.reload();
    }

    return  <li key={id} className="taskTemplate">
        <input type="checkbox" disabled={isEdit} onChange={onCheckboxChange} checked={(isComplete?true:false)}/>        
        <div className="detail">
            {(isEdit)
            ?<>
                <input maxLength={30} placeholder="title" name="title" onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}/>
                <input maxLength={100} placeholder="description" name="description" onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}/>
            </>
            :<>
                <h4>{title}</h4>
                <p>{description.length>0?description:"no description"}</p>
            </>
            }
        </div>
        {(isEdit)
        ?<button onClick={()=>onSave()}>save</button>
        :<button onClick={()=>onIsEdit()}>edit</button>
        }
        <button onClick={()=>onDelete()} disabled={isEdit}>delete</button>
    </li>
}

export default TaskTemplate;