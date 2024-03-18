import { useEffect, useState } from "react";
import Navbar from "./Navabar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Profile=()=>{
    const [profile,setProfile]=useState("")
    const navigate=useNavigate()
    const [details,setDetails]=useState(false)
    const [post,setPost]=useState(false)
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);



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

    const showToggle=(value)=>{
        value == 'details'? (setPost(false),setDetails(true)):(setPost(true),setDetails(false))

    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", file);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response:", response.data);
            toast.success(response.data.message)      
          
        } catch (error) {
            console.error("Error:", error);
            toast.error("Cant Process right Now")    
        }
    };

    


   return(
    <>
    <Navbar/>
    <div>
        <div className="p-5  flex justify-between sm:w-4/12">
            <button onClick={()=> showToggle("details")} className="border-2 bg-black text-white rounded-lg p-2">Details</button>
            <button onClick={()=> showToggle("post")} className="border-2 bg-black text-white rounded-lg p-2">Add New Post</button>
        </div>

        {details && 
        ( <ul className="border-2 w-6/12 h-60 sm:w-6/12 mx-10 my-10 p-3">
            <li className="w-[100px] h-[100px] border mx-auto my-4">IMage</li>
            <li>Name : {profile.name}</li>
            <li>mail : {profile.mail}</li>
            <li>id : {profile._id}</li>
        </ul>)}

       
        {post && 
        (     
            <div className="mt-8 border-2 w-/12 sm:w-6/12 lg:w-4/12 flex h-[300px]  mx-auto  items-center  justify-center">
            <form onSubmit={handleSubmit}>
                <div className="py-5">
                    <label htmlFor="title"> Title : </label>
                    <input className="border-black border" type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="py-5">
                    <label htmlFor="image">Image : </label>
                    <input type="file" name="image" id="image" onChange={handleFileChange} />
                </div>
                <div className="py-5">
                    <button type="submit" className="border p-2 font-semibold text-white bg-black rounded-lg">Upload</button>
                </div>
            </form>
        </div>
        )}
        

    </div>
    <div>  <ToastContainer /></div>
    </>
   )
}

export default Profile;