
const PostCard = ({post  }) => {
    const { id , title , body } = post;
  return (
    <>
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border flex flex-col justify-between border-slate-100">
            <div>
                <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                ID: {id}
                </span>

                <h2 className="text-xl font-bold text-slate-800 mb-3">
                {title}
                </h2>

                <p className="text-slate-600 leading-relaxed">
                {body}
                </p>
            </div>

            <div className="mt-4 flex gap-3 ">
                
                <button
                className="
                    flex-1
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    font-medium
                    py-2.5
                    rounded-xl
                    transition-all
                    duration-300
                    cursor-pointer
                "
                
                >
                Edit
                </button>

                <button
                className="
                    flex-1
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    font-medium
                    py-2.5
                    rounded-xl
                    transition-all
                    duration-300
                    cursor-pointer
                "
                    
                >
                Delete
                </button>

            </div>
        </div>
    </>
  )
}

export default PostCard