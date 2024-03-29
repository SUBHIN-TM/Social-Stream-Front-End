/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import Navbar from "./Navabar"
import axios from "axios"
import OwnPosts from "./OwnPosts"
import { serverLink } from "../../serverLink"
import Shimmer from "./Shimmer"

const HomePage = () => {
  const [allPosts, setAllPosts] = useState()
  const [commentRefreash, setCommentRefreash] = useState(0)



  useEffect(() => {

    allPostFetch()
  }, [commentRefreash])

  const allPostFetch = async () => {
    try {
      const result = await axios.get(serverLink)
      if (result.status == 200) {
        setAllPosts(result.data.allPosts)
        // console.log(result.data.allPosts.map((data) =>data));
      }

    } catch (error) {
      console.error(error)
    }
  }




  if (!allPosts) {
    let counter=4;
    let div=[];
    for(let i=0;i<=counter;i++){
      div.push( <Shimmer key={i}/>)
    }
    return (
      <>
        <div>
          <Navbar />
        </div >
       {div}
        
      </>
    )
  }



  return (
    <>
      <div>
        <Navbar passedPost={allPosts} />
        <div className="p-5  w-full  md:pl-20 mt-8 flex flex-col gap-y-10 ">
          {allPosts.map((post) => (
            <OwnPosts post={post} key={post._id} setCommentRefreash={setCommentRefreash} />
          ))}
        </div>

      </div>

    </>
  )

}

export default HomePage