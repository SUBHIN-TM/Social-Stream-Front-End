/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup =()=>{
const [mailExist,setMailExist] =useState("")
const [error, setError] = useState("");
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
        setError("Please fill the fields")
        return;
    }else{
        setError("")
    }

    try {   
       const response=await axios.post('http://localhost:3000/signup',{
        name,mail,password
       });
       console.log("response is",response.data);
       if(response.data.registered){
        toast.success("Registration successful. Redirecting to login page...", {
          onClose: () => {
            navigate('/login')
          }
        });

       }else if(response.data.nameExists){
        toast.error("UserName Already Exists")
       }else if(response.data.mailExists){
        setMailExist("Email Already Exists")
       }
       else{
        setMailExist("")
       }
    } catch (error) {
        console.error("Login Error");
    }
    }


    return(
        <div className="SIGN border-4 bg-slate-300 h-screen w-screen flex flex-col justify-center items-center ">
      <h1 className="logHeading p-4 my-4 text-4xl italic  ">Registration</h1>
      <div className="SIGNBOX border-[1px] border-black rounded-lg p-8 px-14 flex shadow-2xl   h-[400px]">
        <form onSubmit={handleSubmit} className="mt-4" action="">
          <label className="mr-9 " htmlFor="userName">
            Name
          </label>
          <input className="mb-6 pl-2 text-gray-500 hover:border-gray-500" type="text" name="name" id="name" ref={nameRef}  />
          <br />
          <label className="mr-10" htmlFor="password">
            Email
          </label>
         
          <input className="  pl-2 text-gray-500 hover:border-gray-500" type="mail" name="mail" id="mail" ref={mailRef}  />
          {mailExist && <p className="ml-20 text-red-500">{mailExist}</p>}
          <br />
          <label className="mr-3 " htmlFor="password">
            Password
          </label>
          <input className="mb-8 mt-8 pl-2 text-gray-500 hover:border-gray-500" type="password" name="password" id="password" ref={passwordRef} />
          <br />
          {error && <p className="text-red-500 mb-2 ml-20">{error}</p>}
       
          <button type="submit" className="p-1 bg-white font-semibold rounded-md px-4 ml-[90px] hover:bg-slate-700 hover:text-white">Signup</button>
          <p className="mt-14 italic">Back To  <span className="text-blue-700"><Link to='/login'>Login Page</Link></span></p>
        </form>
       
      </div>
      <ToastContainer />
    </div>
    
    )
}

export default Signup;