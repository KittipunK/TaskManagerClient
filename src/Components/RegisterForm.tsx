import React, {FormEvent, useState} from "react";

type registerModel = {
    username: string,
    password: string,
    passwordConfirm: string,
    email: string
}

interface RegisterFormProps{

}

const RegisterForm: React.FC<RegisterFormProps> = ({}) =>{

    const [input, setInput] = useState<registerModel>({
        username:'',
        password:'',
        passwordConfirm:'',
        email:''
    });

    const [message, setMessage] = useState<string>(' ');

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
        <label htmlFor="passwordConfirm">re-type password</label>
        <input 
            name="passwordConfirm"
            type="password" 
            required
            value={input.passwordConfirm} 
            onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}
        />
        <label htmlFor="email">email</label>
        <input 
            name="email"
            type="email" 
            required
            value={input.email} 
            onChange={e=>{setInput({...input, [e.target.name]: e.target.value})}}
        />

        <button type="submit">Submit</button>
    </form>

}

export default RegisterForm;