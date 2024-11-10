import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from "notistack";
import axios from "axios";
import '../../src/index.css';

export default function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        let [key, value] = [e.target.name, e.target.value];
        setFormData({ ...formData, [key]: value })
    }
    const handleInput = async (e) => {
        e.preventDefault();
        console.log("Data is -> ", formData)
        const valid = validateInput(formData)
        if (valid) {
            try {
                let res = await axios.post(`http://localhost:5000/api/login`, {
                    email: formData.email,
                    password: formData.password
                })
                console.log('response', res)
                localStorage.setItem('token', res.data.token);
                console.log(localStorage.getItem('token'))
                enqueueSnackbar("Login Successfully", { variant: "success" })
                navigate('/');
            } catch (e) {
                if (e.response) {
                    enqueueSnackbar(e.response.data.message, { variant: "error" });
                } else {
                    enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON", { variant: "error" });
                }
            }
        }
    }


    const validateInput = (data) => {
        let msg = "";

        if (!data.email) {
            msg = "Name is a required field";
        } else if (!data.password) {
            msg = "Password is a required field";
        } else if (data.password.length < 6) {
            msg = "Password must be at least 6 characters";
        }
        console.log(msg);
        if (msg) {
            enqueueSnackbar(msg, { variant: "warning" });
            return false;
        }
        else {
            return true;
        }
    };
    return (
        <>
            <div className='logindiv'>
                <div className='login'>
                    <form onSubmit={handleInput}>
                        <div className=" m-3 w-100">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="m-3 w-100">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formData.password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-success m-3">Submit</button>
                        <Link to="/signup" className='m-3 btn btn-danger'>I am a new user</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
