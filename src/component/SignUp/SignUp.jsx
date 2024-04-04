import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from '../../redux/userSlice/userSlice';


function SignUp() {
  const dispatch=useDispatch()
  const Navigate=useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(3, "username should contain atleast 3 characters")
        .required("username is required"),
      email: yup
        .string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email is not valid")
        .email("Invalid email address")
        .required("email is required"),
      password: yup
        .string()
        .min(8, "password should be atleast 8 character")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "password should contain minimum eight characters, at least one letter, one number and one special character"
        )
        .required("password is required"),
      confirmPassword: yup
        .string()
        .required("please confirm your password")
        .oneOf([yup.ref("password")], "password must be same"),
    }),
    onSubmit: async (values) => {
      const { data } = await axios.post("http://localhost:3000/signup", values);
      if (data.success) {
        dispatch(login(data.user)); // Corrected dispatch function
        Navigate("/");
      } else {
        toast.error(data.err_msg, { position: "top-center" });
      }  
    },
  });
  return (
    <div className="w-full flex flex-col gap-4 w- bg-n p-10 items-center mt-8">
      SignUp Page
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 w-[40%"
      >
        <div className="flex flex-col">
          <label htmlFor="">username</label>
          <input
            className="border-2 border-yellow-700"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 text-xs">{formik?.errors?.username}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">email</label>
          <input
            className="border-2 border-yellow-700"
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 text-xs">{formik?.errors?.email}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">password</label>
          <input
            className="border-2 border-yellow-700"
            type="text"
            autoComplete="true"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 text-xs">{formik?.errors?.password}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">confirm password</label>
          <input
            className="border-2 border-yellow-700"
            type="text"
            name="confirmPassword"
            autoComplete="true"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 text-xs">
            {formik?.errors?.confirmPassword}
          </p>
        </div>
        <div className="flex flex-col">
          <input
            className="bg-blue-200 w-20 border-black mt-3 ms-10 hover:bg-black hover:text-white"
            type="submit"
          />
          <p>
            already have an account?{" "}
            <Link to="/login" className="text-red-700">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
