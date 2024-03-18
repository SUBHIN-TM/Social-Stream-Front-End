import { useEffect, useState } from "react";
import Navbar from "./Navabar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile=()=>{
    const [profile,setProfile]=useState("")
    const navigate=useNavigate()

    useEffect(()=>{
     profileFetch()
    },[])
   
    const profileFetch=async()=>{
        try {
            let response=await axios.get('http://localhost:3000/profile')
            setProfile(response.data.profileDetails)        
        } catch (error) {
            console.log(error);
            navigate('/login')
        }
    }


    if(!profile){
        return (
            <h1>loading</h1>
        )
    }


   return(
    <>
    <Navbar/>
    <div>
        <ul>
            <li>Name : {profile.name}</li>
            <li>mail : {profile.mail}</li>
            <li>id : {profile._id}</li>
        </ul>
    </div>
    </>
   )
}

export default Profile;