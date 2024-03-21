import { useEffect, useState } from "react"
import Navbar from "./Navabar"
import axios from "axios"
import OwnPosts from "./OwnPosts"

const HomePage=()=>{
    const [allPosts,setAllPosts]=useState([])
    const[commentRefreash,setCommentRefreash]=useState(0)


 useEffect(()=>{
  console.log("called all post fetch");
    allPostFetch()
 },[commentRefreash])

 const allPostFetch = async()=>{
  console.log("refreashed");
  try {
    const result=await axios.get('http://localhost:3000')
    if(result.status ==200){
        setAllPosts(result.data.allPosts)
        // console.log(result.data.allPosts.map((data) =>data));
    }

  } catch (error) {
    console.error(error)
  }
 }




 if(!allPosts){
    return  <div>
    <Navbar />
    <h1 className="p-3">Loading....</h1>
   </div>
 }



    return(
        <>
        <div>
         <Navbar/>
         <div className="pl-20 mt-8 flex flex-col gap-y-9">
         {allPosts.map((post)=>(
          <OwnPosts post={post} key={post._id}   setCommentRefreash={setCommentRefreash}  />
        ))}
         </div>
         
        </div>
       
        </>
    )

}

export default HomePage