import React, {FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";

type registerModel = {
    username: string,
    password: string,
    passwordConfirm: string,
}

interface RegisterFormProps{

}

const RegisterForm: React.FC<RegisterFormProps> = ({}) =>{

    const navigate = useNavigate();

    const [input, setInput] = useState<registerModel>({
        username:'',
        password:'',
        passwordConfirm:'',
    });

    const [message, setMessage] = useState<string>(' ');

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        
        if (input.password!==input.passwordConfirm){
            setMessage('password does not match.');
            return;
        }

        fetch('http://localhost:5000/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        }).then( async (res) =>{
            const data = await res.json();
            
            if(res.status==200){
                localStorage.setItem('token', data.token);
                navigate('/tasks');
            }else{
                setMessage(data.message);
            }
                
        }).catch((error)=>{
            console.log(error);
        })
    }

    return <form onSubmit={(e)=>{onSubmit(e)}}>
        <p>{message}</p>
        <label htmlFor="username">username</label>
        <input 
            name="username"
            type="text" 
            required
            maxLength={20}
            value={input.username} 
            onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}
        />
        <label htmlFor="password">password</label>
        <input 
            name="password"
            type="password" 
            required
            value={input.password} 
            onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}
        />
        <label htmlFor="passwordConfirm">re-type password</label>
        <input 
            name="passwordConfirm"
            type="password" 
            required
            value={input.passwordConfirm} 
            onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}
        />

        <button type="submit">Submit</button>
    </form>

}

export default RegisterForm;