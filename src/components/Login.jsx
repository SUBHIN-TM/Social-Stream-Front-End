/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
// import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverLink } from "../../serverLink"

function Login() {
    
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
      window.process ={
        ...window.process
      };
    },[])

    useEffect(() => {
      const token=localStorage.getItem('token')
      if(token){
        navigate('/');
      }
    },[])
    
 
    let onChangeFunction =(e)=>{
     e.target.name=="name"?setName(e.target.value) :setPassword(e.target.value);
    }

    const handleSubmit =async (event)=>{
    event.preventDefault();
     if(!name || !password){
     return toast.error("Please Fill The Field")
     }

    try {
        // console.log(name , password);
       const response=await axios.post(`${serverLink}/login`,{
        name,password
       });
       if(response.data.invalidUser){
        console.log("invalid");
        toast.error("Invalid User")
       }else if(response.data.passwordMissmatch){
        toast.error("Wrong Password")
       }else{
        console.log(response.data);
        localStorage.setItem('token',response.data.token)
        navigate('/')
       }
      
    } catch (error) {
        console.error("Login Error");
    }
    }

  return (
    <div className="LOGIN border-4 bg-slate-300 h-screen w-screen flex flex-col justify-center items-center ">
      <h1 className="logHeading p-4 mb-4 text-4xl italic  ">Login</h1>
      <div className="LOGINBOX   rounded-lg p-14 flex  shadow-2xl w-10/12 sm:w-6/12 md:w-6/12 lg:w-3/12">
        <form onSubmit={handleSubmit} className="" action="">
          <label className=" " htmlFor="userName">
            Email
          </label>
          <input className="rounded-lg border mt-1 mb-6  text-gray-500 hover:border-gray-500" type="text" name="name" id="name" value={name} onChange={(e)=> onChangeFunction(e)} />
          <br />
          <label className="" htmlFor="password">
            Password
          </label>
          <input className="rounded-lg mt-1 mb-8   text-gray-500 hover:border-gray-500" type="password" name="password" id="password" value={password} onChange={(e)=> onChangeFunction(e)} />
          <br />
          <button type="submit" className="p-1 bg-white font-semibold rounded-md px-4  hover:bg-slate-700 hover:text-white">Login</button>
          <p className="mt-10 italic">Don't Have an account <span className="text-blue-700"><Link to='/signup'>Signup</Link></span> Here</p>
        </form>
       
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
