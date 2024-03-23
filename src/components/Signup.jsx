/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverLink } from "../../serverLink"

const Signup =()=>{
const navigate=useNavigate()

 const nameRef=useRef(null)
 const mailRef=useRef(null)
 const passwordRef=useRef(null)


    const handleSubmit =async (event)=>{
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const mail = mailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if(!name || !mail || !password){
      toast.error("Please Fill The Fields")
        return;
    }

    try {   
       const response=await axios.post(`${serverLink}/signup`,{
        name,mail,password
       });
      //  console.log("response is",response.data);
       if(response.data.registered){
        toast.success("Registration successful. Redirecting to login page...", {
          onClose: () => {
            navigate('/login')
          }
        });

       }else if(response.data.nameExists){
        toast.error("UserName Already Exists")
       }else if(response.data.mailExists){
        toast.error("Email Already Exists")
       }
     
    } catch (error) {
        console.error("Login Error");
    }
    }


    return(
        <div className="SIGN border-4 bg-slate-300 h-screen w-screen flex flex-col justify-center items-center ">
      <h1 className="logHeading p-4 my-4 text-4xl italic  ">Registration</h1>
      <div className="SIGNBOX  rounded-lg p-8  flex shadow-2xl w-10/12 sm:w-6/12 md:w-6/12 lg:w-3/12 ">
        <form onSubmit={handleSubmit} className="pl-5 pt-11" action="">
          <label className="mr-9 " htmlFor="userName">
            Name
          </label>
          <input className="rounded-lg mb-6 pl-2 text-gray-500 hover:border-gray-500" type="text" name="name" id="name" ref={nameRef}  />
          <br />
          <label className="mr-10" htmlFor="password">
            Email
          </label>
         
          <input className="mb-5 rounded-lg pl-2 text-gray-500 hover:border-gray-500" type="mail" name="mail" id="mail" ref={mailRef}  />
          <br />
          <label className="mr-3 " htmlFor="password">
            Password
          </label>
          <input className="rounded-lg mb-8 mt-1 pl-2 text-gray-500 hover:border-gray-500" type="password" name="password" id="password" ref={passwordRef} />
          <br />
          
       
          <button type="submit" className="p-1 bg-white font-semibold rounded-md px-4 ml-[90px] hover:bg-slate-700 hover:text-white">Signup</button>
          <p className="mt-14 italic">Back To  <span className="text-blue-700"><Link to='/login'>Login Page</Link></span></p>
        </form>
       
      </div>
      <ToastContainer />
    </div>
    
    )
}

export default Signup;