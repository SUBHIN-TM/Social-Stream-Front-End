/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Navbar from "./Navabar"
import axios from "axios";
import OwnPosts from "./OwnPosts";
import { serverLink } from "../../serverLink"
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const [notifications, setNotification] = useState("")//ALL USER NOTIFICATION WILL COMES HERE
    const [AllPosts, setAllPosts] = useState("") //ALL POSTS CONAIN
    const [commentRefreash, setCommentRefreash] = useState(0) //IT WILL TRIGGER WHEN COMMENT UPDATED,SO IT IS USED IN USEEFFECT THEN IT WILL AGAIN TETCH ALL DATA WITH UPDATED COMMANDS IN ORDER TO LIVE SEE CMD
    const [clickedPost, setclickedPost] = useState("") //IT SAVES NOTIFIACTION CLICKED POST IDS
    const navigate=useNavigate()


    useEffect(() => {
        notific()
    }, [commentRefreash])

    const notific = async () => {
        try {
            const response = await axios.get(`${serverLink}/notifications`)
            setNotification(response.data.notifications)
            setAllPosts(response.data.posts)
        } catch (error) {
            console.error(error)
            navigate('/login')
        }
       
    }

    if (!notifications) {
        return (
            <div>No Notificatons</div>
        )
    }


    return (
        <div>
            <Navbar />
           
            <div className=" p-5 sm:flex">
                <ul>
                    {notifications.map((data) => (
                        <li onClick={() => { setclickedPost(data._id) }} className="m-1 cursor-pointer text-blue-500 underline" key={data._id}> {data.message} </li>
                    ))}
                </ul>
                <div className=" ">
                {clickedPost && AllPosts.filter(post => post.notifications.some(noti => noti._id === clickedPost)).map(filteredPost => (
                    <OwnPosts post={filteredPost} key={filteredPost._id} OWNPOSTS={true} setCommentRefreash={setCommentRefreash} />
                ))}
            </div>
                
            </div>
           
        </div>
    )
}

export default Notifications;