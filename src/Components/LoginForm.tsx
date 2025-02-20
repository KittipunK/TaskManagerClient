import React, {FormEvent, useState} from "react";

type loginModel = {
    username: string,
    password: string
}

interface LoginFormProps{

}

const LoginForm: React.FC<LoginFormProps> = ({}) =>{

    const [input, setInput] = useState<loginModel>({
        username:'',
        password:''
    });

    const [message, setMessage] = useState<string>(' ')

    const onSubmit = async (e:FormEvent) => {
        e.preventDefault();

        fetch('http://localhost:5000/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        }).then( async (res) =>{
            const data = await res.json();
            
            setMessage(data.message);
                
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
        <button type="submit">Submit</button>
    </form>
}

export default LoginForm;