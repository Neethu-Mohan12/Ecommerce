import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/userSlice/userSlice';
import { toast } from 'react-toastify';
function Login() {
    const dispatch = useDispatch();
   const navigate=useNavigate();
    const handleSubmit = async (values) => {
        try {
            const { data } = await axios.post("http://localhost:3000/login", {
                email: values.email,
                password: values.password,
            });
            if (data.success) {
              toast.success(`welcome back ${data.user.username}`,{
                position:"top-center",
              });
              dispatch(login(data.user));
              navigate("/");
            
            } else {
              toast.error(data.err_msg, {position:"top-center"});
                console.error("Login failed:", data.err_msg);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Invalid email address")
                .required("Email is required"),
            password: yup
                .string()
                .min(8, "Password should be at least 8 characters")
                .required("Password is required"),
        }),
        onSubmit: handleSubmit,
    });

    return (
        <div className="w-full flex flex-col gap-4 w- bg-n p-10 items-center mt-8">
            <h1>Login Page</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <p className="text-red-600 text-xs">{formik.errors.email}</p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <p className="text-red-600 text-xs">{formik.errors.password}</p>
                </div>
                <button className="bg-blue-200 w-full border-black mt-3  hover:bg-black hover:text-white mb-4" type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup" className="text-red-700">Sign Up</Link></p>
        </div>
    );
}

export default Login;
