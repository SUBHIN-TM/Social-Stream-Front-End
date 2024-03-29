/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewDetais, clearUser } from "../utils/userSlice"
import { serverLink } from "../../serverLink"
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

    useEffect(() => {
        window.process = {
            ...window.process
        };
    }, [])

    const [user, setUser] = useState("")
    const navigate = useNavigate()
    const [toggle,setToggle]=useState(false)

    //SELECTOR //IT WILL GIVE ACCES TO STORE //NOW SUBSCRIBING THE STORE
    const USER = useSelector((store) => store.user.details) //NOW USER HAS THE DETAILS OF USER DETAILS DATABASE
    const dispatch = useDispatch() //INSIDE THIS DISPATCH WE HAVE TO MENTION WHAT TYPE OF ACTION THAT WE HAVE PERFORMING


    useEffect(() => {
        homeFetch()
    }, [])




    const homeFetch = async () => {
        try {
            let response = await axios.get(serverLink)
            if (response.data.details) {
                setUser(response.data.details)
                dispatch(viewDetais(response.data.details));  //IN REDUX BY VIEWDETALS ACTION DEFINED TO STORE THE VALUE TO DATA STORE.
            }

        } catch (error) {
            console.log("home fetch", error);
        }

    }

    //  console.log("redux store",USER);


    const logout = async () => {
        dispatch(clearUser()); //CLEAR USER IS A FUNCTIN THAT DEFINED TO EMPTY THE REDUX
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = null;
        setUser("")
        navigate('/')
    }
    
    const toggleSwitch=()=>{
       toggle?setToggle(false):setToggle(true)
    }

    return (
        <>
            <div className="border-2 w-full h-[70px] flex justify-between px-6 items-center " >
                <div className=" w-8/12 italic font-bold text-2xl"><span className="cursor-pointer" onClick={() => navigate('/')}>Social Stream</span> </div>
                <div onClick={toggleSwitch} className="block sm:hidden border-1 border-black p-1">
                    <GiHamburgerMenu />
                </div>
                <div className=" hidden sm:flex w-4/12 justify-end px-4 items-center ">
                    {user ? (<div className="flex items-center text-gray-600"><h1 className="px-2 text-lg font- hidden sm:block "><span className="font-normal"><i>Hi, </i></span> {user.name}</h1><button onClick={logout} className="border-2 bg-black text-white p-2 rounded-lg">Logout</button></div>) :
                        (<div className="flex items-center"><button onClick={() => navigate('/login')} className="border-2 bg-black text-white p-2 rounded-lg">Login</button></div>)}
                    <div className="mx-4 "><button onClick={() => navigate('/profile')} className="ml-3 border-2 bg-black text-white rounded-lg p-2">Profile</button></div>
                    <div className="mx-4 k"><button onClick={() => navigate('/notifications')} className="border-2 bg-black text-white rounded-lg p-2">Notifications</button></div>
                </div>
            </div>
          
           {toggle &&
            <div id="toggle" className="absolute right-0  grid gap-3 justify-end w-full p-3 ">
            {user ? (<button onClick={logout} className="border-2  bg-black text-white p-2 rounded-lg">Logout</button>) :
                (<button onClick={() => navigate('/login')} className="border-2 bg-black text-white p-2 rounded-lg">Login</button>)}
           <button onClick={() => navigate('/profile')} className="border-2 bg-black text-white rounded-lg p-2">Profile</button>
           <button onClick={() => navigate('/notifications')} className="border-2 bg-black text-white rounded-lg p-2">Notifications</button>
         </div>}
           


        </>
    )
}

export default Navbar;