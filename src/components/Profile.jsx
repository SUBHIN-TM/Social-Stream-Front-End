/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Navbar from "./Navabar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OwnPosts from "./OwnPosts";
import { serverLink } from "../../serverLink.js"
import Shimmer from "./Shimmer.jsx";



const Profile = () => {
    const [profile, setProfile] = useState("")
    const navigate = useNavigate()
    const [details, setDetails] = useState(false)
    const [post, setPost] = useState(false)
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isPicLoading, setIsPicLoading] = useState(false)

    const [profilePic, setProfilePic] = useState(false)
    const [profilePicFile, setProfilePicFile] = useState(null)



    useEffect(() => {
        profileFetch()
    }, [])

    const profileFetch = async () => {
        try {
            let response = await axios.get(`${serverLink}/profile`)
            setProfile(response.data.profileDetails)
        } catch (error) {
            console.log(error);
            navigate('/login')
        }
    }


    if (!profile) {
        let divs = [];
        for (let i = 0; i <= 5; i++) {
            divs.push(<Shimmer key={i} />)
        }
        return (
            <div>
                <Navbar />
                <div className="p-5  flex justify-between sm:w-6/12">
                    <button onClick={() => showToggle("details")} className="border-2 bg-black text-white rounded-lg p-2">Details</button>
                    <button onClick={() => showToggle("post")} className="border-2 bg-black text-white rounded-lg p-2">Add New Post</button>
                    <button onClick={() => changePic()} className="border-2 bg-black text-white rounded-lg p-2">Update Profile Picture</button>
                </div>
                <div className="">
                    <h1 className="text-center">Your Posts</h1>
                    <div className="flex flex-col gap-y-7 items-center p-8 justify-center">
                        {divs}
                    </div>
                </div>
            </div>
        )
    }

    const showToggle = (value) => {
        if (value === 'details') {
            if (details) {
                setDetails(false);
            } else {
                setDetails(true);
                setPost(false);
                setProfilePic(false)
            }
        } else if (value === 'post') {
            if (post) {
                setPost(false);
            } else {
                setPost(true);
                setDetails(false);
                setProfilePic(false)
            }
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !file) {
            return toast.error("Input Should Be Filled")
        }
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg","image/gif"];
        if (!validImageTypes.includes(file.type)) {
            return toast.error("File type should be JPEG, JPG,GIF, or PNG");
        }

        setIsLoading(true)

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", file);

        try {
            const response = await axios.post(`${serverLink}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response:", response.data);
            toast.success("POSTED")

            setProfile(response.data.result)
            setTitle("")
            setFile("")
            // navigate('/profile')
            console.log(response.data.result);


        } catch (error) {
            console.error("Error:", error);
            toast.error("Cant Process right Now")
        } finally {
            setIsLoading(false)
        }
    };


    const changePic = () => {
        if (profilePic) {
            setProfilePic(false)
        } else {
            setProfilePic(true)
            setDetails(false)
            setPost(false)
        }

    }


    //PROFILE PICTURE SECTION

    const handleProfilePicChange = (e) => {
        setProfilePicFile(e.target.files[0]);
    };


    const picSubmit = async (e) => {
        e.preventDefault();
        if (!profilePicFile) {
            return toast.error("iMAGE Should Be Select")
        }
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg","image/gif"];
        if (!validImageTypes.includes(profilePicFile.type)) {
          
            return toast.error("File type should be JPEG, JPG,GIF, or PNG");
        }

        setIsPicLoading(true)

        const formData = new FormData();
        formData.append("image", profilePicFile);

        try {
            const response = await axios.post(`${serverLink}/profilePicture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response:", response.data);
            toast.success(response.data.message)
            setProfilePicFile("")
            profileFetch()



        } catch (error) {
            console.error("Error:", error);
            toast.error("Cant Process right Now")
        } finally {
            setIsPicLoading(false)
        }
    };




    return (
        <>
            <Navbar />
            <div>
                <div className="p-5  flex justify-between sm:w-6/12">
                    <button onClick={() => showToggle("details")} className="border-2 bg-black text-white rounded-lg p-2">Details</button>
                    <button onClick={() => showToggle("post")} className="border-2 bg-black text-white rounded-lg p-2">Add New Post</button>
                    <button onClick={() => changePic()} className="border-2 bg-black text-white rounded-lg p-2">Update Profile Picture</button>

                </div>

                <div className="flex items-center justify-center">
                    {details &&
                        (<ul className="border-2 rounded-lg border-black w-6/12 h-[250px] sm:w-5/12 lg:w-3/12 mx-10 my-10 p-3">
                            <li className=" w-[100px] h-[100px]  mx-auto my-4 "><img className=" rounded-3xl object-cover h-full w-full" src={profile.profileImage} alt="" /></li>
                            <li className="mt-3 text-center">Name : {profile.name}</li>
                            <li className="text-center">Email : {profile.mail}</li>

                        </ul>
                        )}
                </div>



                {post &&
                    (
                        <div className="mt-8  w-12/12 sm:w-6/12 lg:w-4/12 flex h-[300px]   items-center  justify-center mx-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="border-2 sm:p-7 border-black flex-col justify-center pl-4">
                                    <div className="py-5">
                                        <label htmlFor="title"> Title : </label>
                                        <input className="border-black border" type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="py-5">
                                        <label htmlFor="image">Image : </label>
                                        <input type="file" name="image" id="image" onChange={handleFileChange} />
                                    </div>
                                    <div className="py-5">
                                        {!isLoading ? (<button type="submit" className="border p-2 font-semibold text-white bg-black rounded-lg">Upload</button>) : ("")}
                                        <button onClick={() => { setPost(false); setTitle(""); setFile("") }} className="ml-6 border p-2 font-semibold text-white bg-black rounded-lg">Close</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    )}

                {profilePic &&
                    (
                        <div className="  w-/12 sm:w-6/12 lg:w-4/12 flex h-[300px]  mx-auto  items-center  justify-center">
                            <form onSubmit={picSubmit}>
                                <div className="border-2 border-black sm:p-10 pl-5 ">
                                    <div className="py-5">
                                        <label htmlFor="image">Image : </label>
                                        <input type="file" name="image" id="image" onChange={handleProfilePicChange} />
                                    </div>
                                    <div className="py-5">
                                        {!isPicLoading ? (<button type="submit" className="border p-2 font-semibold text-white bg-black rounded-lg">Upload</button>) : ("")}
                                        <button onClick={() => { setProfilePic(false) }} className="ml-6 border p-2 font-semibold text-white bg-black rounded-lg">Close</button>

                                    </div>
                                </div>

                            </form>
                        </div>
                    )}






            </div>
            <div>
                <h1 className="text-center text-xl my-5">Your Posts</h1>

                <div className="flex flex-col gap-y-7 items-center p-8 justify-center">
                    {profile.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
                        <OwnPosts post={post} key={post._id} OWNPOSTS={true} />
                    ))}

                </div>
            </div>



            <div>  <ToastContainer /></div>
        </>
    )
}

export default Profile;