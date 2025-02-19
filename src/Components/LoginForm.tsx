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

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        console.log(input);
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