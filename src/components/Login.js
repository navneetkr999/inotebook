import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({showAlert}) => {
    const [credentials, setCredentials] = useState({email:'', password:''});
    let navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
        } else {
            showAlert(json.error, "danger");
        }
    }
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div onSubmit={handleSubmit}>
            <form>
                <div className="form-floating mb-3 col-md-4">
                    <input type="email" className="form-control" id="floatingInput" name='email' value={credentials.email} onChange={onChange} minLength={3} required placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating col-md-4">
                    <input type="password" className="form-control" id="floatingPassword" name='password' value={credentials.password} onChange={onChange} minLength={3} required placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-primary mt-5">Login</button>
            </form>
        </div>
    )
}

export default Login
