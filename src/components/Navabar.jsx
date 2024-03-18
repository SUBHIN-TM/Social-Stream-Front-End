import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Navbar= ()=> {
    const [user,setUser]=useState("")
    const navigate=useNavigate()

     useEffect(()=>{
        homeFetch()
     },[])

     const homeFetch=async()=>{
        try {
            let response=await axios.get('http://localhost:3000')
            if(response.data.details){
                setUser(response.data.details)
            }    
            
        } catch (error) {
            console.log("home fetch",error);
        }
          
     }

     const logout=async()=>{
        localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setUser("")
    navigate('/')
     }
    //  console.log(user);

    return(
        <>
        <div className="border-2 w-full h-[80px] flex justify-between px-6 items-center " >
            <div className=" w-8/12 italic font-bold text-2xl"><span className="cursor-pointer" onClick={()=> navigate('/')}>Social Stream</span> </div>
            <div className="flex  w-4/12 justify-end px-4 items-center">
                {user?( <div className="flex items-center text-green-600"><h1 className="px-2 text-lg font- hidden sm:block "><span className="font-normal"><i>Hi, </i></span> {user.name}</h1><button onClick={logout} className="border-2 bg-black text-white p-2 rounded-lg">Logout</button></div>):
                (<div className="flex items-center"><button onClick={()=> navigate('/login')} className="border-2 bg-black text-white p-2 rounded-lg">Login</button></div>)}
                {/* {user && ( <div className="mx-4"><button onClick={()=> navigate('/profile')} className="border-2 bg-black text-white rounded-lg p-2">Profile</button></div>)} */}
                <div className="mx-4"><button onClick={()=> navigate('/profile')} className="border-2 bg-black text-white rounded-lg p-2">Profile</button></div>
               
            </div>
        </div>
        </>
    )
}

export default Navbar;