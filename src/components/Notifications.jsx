import { useEffect, useState } from "react";
import Navbar from "./Navabar"
import axios from "axios";
import OwnPosts from "./OwnPosts";


const Notifications = () => {
    const [notifications, setNotification] = useState("")//ALL USER NOTIFICATION WILL COMES HERE
    const [AllPosts, setAllPosts] = useState("") //ALL POSTS CONAIN
    const [commentRefreash, setCommentRefreash] = useState(0) //IT WILL TRIGGER WHEN COMMENT UPDATED,SO IT IS USED IN USEEFFECT THEN IT WILL AGAIN TETCH ALL DATA WITH UPDATED COMMANDS IN ORDER TO LIVE SEE CMD
    const [clickedPost, setclickedPost] = useState("") //IT SAVES NOTIFIACTION CLICKED POST IDS



    useEffect(() => {
        console.log("called");
        notific()
    }, [commentRefreash])

    const notific = async () => {
        const response = await axios.get('http://localhost:3000/notifications')
        setNotification(response.data.notifications)
        setAllPosts(response.data.posts)
    }

    if (!notifications) {
        return (
            <div>No Notificatons</div>
        )
    }


    return (
        <div>
            <Navbar />
            <div className="w-6/12  p-5 ">
                <ul>
                    {notifications.map((data) => (
                        <li onClick={() => { setclickedPost(data._id) }} className="m-1 cursor-pointer" key={data._id}> {data.message} </li>
                    ))}

                </ul>
            </div>
            <div className="flex flex-col gap-y-7 items-center p-8 justify-center">
                {clickedPost && AllPosts.filter(post => post.notifications.some(noti => noti._id === clickedPost)).map(filteredPost => (
                    <OwnPosts post={filteredPost} key={filteredPost._id} OWNPOSTS={true} setCommentRefreash={setCommentRefreash} />
                ))}
            </div>
        </div>
    )
}

export default Notifications;