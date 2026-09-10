import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const[credentials,setCredentials]= useState({email:'', password:''})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Api Call
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password:  credentials.password}),
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            //Save the authtoken and redirect
            localStorage.setItem('token',json.authtoken)
            navigate('/')
        }

    }

    const handleChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})

    }

    return (
        <div className='container'>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={handleChange} id="password" name="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
