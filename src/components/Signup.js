import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const[data,setData]= useState({ name:'', email:'', password:'', cpassword:'' })
    const navigate = useNavigate()

    const handleSubmit=async (e)=>{
        e.preventDefault()
         const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: data.name, email: data.email, password: data.password}),
        });
        const json = await response.json()
        console.log(json)

        if(json.success){
        //Save the authtoken and redirect
        localStorage.setItem('token',json.authtoken)
        navigate('/login')
        props.showAlert("Account Created Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    

    }

    const handleChange=(e)=>{
        setData({...data,[e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={data.name} id="name" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleChange} value={data.email} id="email" name="email"  aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleChange} value={data.password} id="password" name="password" minLength={5} required />
                </div>
               <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={handleChange} value={data.cpassword} id="cpassword" name="cpassword" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
