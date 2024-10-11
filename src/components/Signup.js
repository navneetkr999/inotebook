import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = ({showAlert}) => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/auth/createuser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
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
        <div>
            <form className='col-md-4' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name}  onChange={onChange} minLength={3} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email}  onChange={onChange} minLength={3} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Signup
