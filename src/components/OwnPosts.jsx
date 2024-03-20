/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const OwnPosts=({post,OWNPOSTS})=>{
    const [likeCount,setLikeCount] = useState(post.likes.length)
    const [commentCount,setcommentCount] = useState(post.comments.length)
    const [commentContent,setCommentContent]=useState("")
    
    const [likeList,setLikeList]=useState([post.likes])
    const [commentBox,setCommentBox] =useState(false)
    console.log(likeList);
    const navigate=useNavigate()
        
    const likefuction= async(id,userId)=>{
      try {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login')
        }else{
          let OWNPROFILEPOST=false
          if(OWNPOSTS){  //IF CHECKING THE POSTS CALL FROM HOME OR PROFILE.INCASE CALL TO DO LIKE FROM PROFILE THE POST OWNER ID TAKE TOKEN ID AS SAME IN BACK END
             OWNPROFILEPOST=true
          }
         let response=await axios.post('http://localhost:3000/addLike',{postId:id,userId:userId,ownProfile:OWNPROFILEPOST})
           let post=response.data.result.posts.filter((posts) => posts._id ==id)
           setLikeList(post[0].likes)
           setLikeCount(post[0].likes.length)
        }
      } catch (error) {
        console.error(error);
      }    
    }

    const commentfuction= async(id,userId)=>{
        try {
          const token = localStorage.getItem('token');
          if(!token){
              navigate('/login')
          }else{
            let OWNPROFILEPOST=false
            if(OWNPOSTS){  //IF CHECKING THE POSTS CALL FROM HOME OR PROFILE.INCASE CALL TO DO LIKE FROM PROFILE THE POST OWNER ID TAKE TOKEN ID AS SAME IN BACK END
               OWNPROFILEPOST=true
            }
           let response=await axios.post('http://localhost:3000/addComment',{postId:id,userId:userId,comment:commentContent,ownProfile:OWNPROFILEPOST})
           let post=response.data.result.posts.filter((posts) => posts._id ==id)
           console.log("like count", post[0].comments.length);
           setcommentCount(post[0].comments.length)
           
           console.log("secmnt",commentCount);
          }
        } catch (error) {
          console.error(error);
        }    
      }
    
      const commentBoxToggle=()=>{
      if(commentBox){
        setCommentBox(false)
      }else{
        setCommentBox(true)
      }
      }


    // console.log("post",post);
    return(
        <div className="w-6/12 lg:w-3/12 border ">
         {post.userName && (
            <div className="border-b h-[50px] flex items-center">
            <div className="w-[50px] border h-[50px] rounded-xl"><img src={post.profileImage} className="object-cover h-full w-full" alt="" /></div>
            <div className="p-3 font-semibold">{post.userName}</div>
        </div>
         )}
           

         <div className="p-4">{post.postName}</div>
         <div className="mt-5 flex justify-center">
            <img className=" sm:w-10/12 lg:w-11/12 w-10/12 h-[200px]" src={post.postImage} alt="" />
         </div>
         <div className="flex justify-around p-4">
            <div><span onClick={()=> likefuction(post._id,post.userId)} className="cursor-pointer">Like👍</span>({likeCount})</div>
           
            <div ><span onClick={()=> commentBoxToggle()} className="cursor-pointer">Comments ({commentCount})</span> </div> 
         </div>
        
          {commentBox && (
             <div>
             <div className="w-12/12 border pt-2">
                   
                  <div className="my-2 flex justify-around">
                   <div><input className="border-2 border-black" type="text" onChange={(e)=> setCommentContent(e.target.value)} value={commentContent} /></div>
                    <div><span onClick={()=> commentfuction(post._id,post.userId)} className="cursor-pointer border-black border rounded-lg bg-black text-white p-1 m-1">Add Comment</span></div>
                   
                 </div>

                 {post.comments.map((cmd) => (
                     <div className="pl-3" key={post._id}> <p>{cmd.name} : {cmd.content}</p></div>       
                 ))}
             </div>
          </div>
          )}
        

        </div>
    )
}

export default OwnPosts;