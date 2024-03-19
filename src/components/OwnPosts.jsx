const OwnPosts=({post})=>{
    console.log(post);
    return(
        <div className="w-6/12 lg:w-3/12 border h-[400px]">
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
            <div>Likes({post.likes})</div>
            <div>Comments</div>
         </div>
        </div>
    )
}

export default OwnPosts;