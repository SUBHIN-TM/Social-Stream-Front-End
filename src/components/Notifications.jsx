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
    const navigate = useNavigate()


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
            <>
             <Navbar />
            <div className="text-center mt-5 text-xl italic">No Notificatons</div>
            </>
           
        )
    }

    const notificON = (id)=>{
        setclickedPost(id)
    }


    return (
        <div>
            <Navbar />

            <div className=" p-5 ">
                 <div className=" ">
                    {clickedPost && AllPosts.filter(post => post.notifications.some(noti => noti._id === clickedPost)).map(filteredPost => (
                        <OwnPosts post={filteredPost} key={filteredPost._id} OWNPOSTS={true} setCommentRefreash={setCommentRefreash} />
                    ))}
                </div>
                <ul className=" list-disc ml-5 mt-3">
                    {notifications.map((data) => (
                       <li onClick={() => notificON(data._id) } className="m-1 cursor-pointer" key={data._id}> <span className="text-black">{data.message}</span> <u className="text-blue-600">Your Post</u> </li>
                    ))}
                </ul>
                

            </div>

        </div>
    )
}

export default Notifications;