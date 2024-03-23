const Shimmer = () => {
    return (
        <div className="w-10/12 sm:w-7/12 md:w-6/12 lg:w-4/12 border mx-auto sm:mx-0 sm:ml-4 my-7">
            <div className="border-b flex items-center p-1">
                <div className="ml-2 border  h-10 w-10 rounded-xl bg-gray-200 "></div>
                <div className="p-3 font-semibold"></div>
            </div>
            <div className="p-4"></div>
            <div className="mt-5 flex justify-center">
                <div className="bg-gray-200 border sm:w-11/12 sm:h-[300px] lg:w-11/12 w-10/12 h-[200px]" src="" alt="" />
            </div>
            <div className="flex justify-around p-4">
                <div ><span className="cursor-pointer"></span> </div>
            </div>
            <div>
                <div className="w-12/12 border pt-2">
                    <div className="my-2 flex justify-around">
                        <div><input className="border-2 bg-gray-200" type="text" /></div>
                        <div><span className="cursor-pointer border rounded-lg bg-gray-200 text-gray-200 p-1 m-1">Add Comment</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shimmer;
