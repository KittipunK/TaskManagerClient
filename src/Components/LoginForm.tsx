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

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        console.log(input);
    }

    return <form onSubmit={(e)=>{onSubmit(e)}}>

        <input 
            name="username"
            type="text" 
            placeholder="USERNAME"
            required
            value={input.username} 
            onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}
        />

        <input 
            name="password"
            type="password" 
            placeholder="PASSWORD"
            required
            value={input.password} 
            onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}
        />
        <button type="submit">Submit</button>
    </form>
}

export default LoginForm;