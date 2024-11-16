import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from "notistack";
import axios from "axios";
import '../../src/index.css';
import { config } from "../App";

export default function Signup() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        let [key, value] = [e.target.name, e.target.value];
        setFormData({ ...formData, [key]: value })
    }
    const handleInput = async(e) => {
        e.preventDefault();
        console.log("Data is -> ",formData)
        const valid = validateInput(formData)
        if(valid) {
            try {
                let res = await axios.post(`${config.endpoint}/api/signup`, {
                    name:formData.name,
                    location:formData.location,
                    email:formData.email,
                    password:formData.password
                })
                console.log('response', res)
                enqueueSnackbar("Registered Successfully", {variant: "success"})
                navigate('/login');
            } catch (e) {
                if (e.response) {
                    enqueueSnackbar(e.response.data.message, {variant: "error"});
                  } else {
                    enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON", {variant: "error"});
                  }
            }
        }
    }


    const validateInput = (data) => {
        let msg = "";

        if (!data.name) {
            msg = "Name is a required field";
        } else if (data.name.length < 6) {
            msg = "Username must be at least 6 characters";
        } else if (!data.password) {
            msg = "Password is a required field";
        } else if (data.password.length < 6) {
            msg = "Password must be at least 6 characters";
        } else if (!data.location || data.password.length < 6) {
            msg = "Location is a required field";
        } else if (!data.email) {
            msg = "Email is a required field";
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
            <div className='signupdiv'>
            <div className='signup'>
                <form onSubmit={handleInput}>
                    <div className="mb-3 w-60">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" name='name' value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="location" className="form-control" name='location' value={formData.location} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
            </div>
        </>
    )
}
