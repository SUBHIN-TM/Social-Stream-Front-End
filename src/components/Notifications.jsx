import { useEffect, useState } from "react";
import Navbar from "./Navabar"
import axios from "axios";


const Notifications=()=>{
    const [notifications,setNotification] =useState("")
  
    useEffect(()=>{
    notific()
    },[])

    const notific=async()=>{
    const response=await axios.get('http://localhost:3000/notifications')
    console.log(response.data.notifications);
    setNotification(response.data.notifications)
    }

    if(!notifications){
        return (
            <div>No Notificatons</div>
        )
    }

    return(
        <div>
            <Navbar/>
            <div className="w-6/12  p-5 ">
                <ul>
                    {notifications.map((data)=>(
                     <li className="m-1" key={data._id}>{data.message} </li>
                    ))}
                    
                </ul>
            </div>
        </div>
    )
}

export default Notifications;