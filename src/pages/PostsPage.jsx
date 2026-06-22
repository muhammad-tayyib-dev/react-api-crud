import { useEffect, useState } from 'react'
import {  getData } from '../services/postService'
import PostCard from '../components/PostCard';






const PostsPage = () => {


  const [data, setData] = useState([]);
  
  

  



  // < ----------------------------------- DataGet Functionality -------------------------------------->
  
  const getPostData = async () =>{
    
    try {
      const res = await getData();

      setData(res.data)

    } catch (error) {
      console.log(error);
      
    }
    
  }

  useEffect(() => {
    getPostData()
  }, [])









  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Task Manager
          </h1>
          <p className="text-slate-500 mt-2">
            Organize and manage your tasks efficiently
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            
            <input
              type="text"
              name='title'
              placeholder="Enter Title"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              
            />

            <input
              type="text"
              name='body'
              placeholder="Enter Description"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer "  >
              Add
            </button>
          </div>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {
             data.map((curPost) =>{
              return <PostCard key={curPost.id}  post={curPost}   />
            } )
          }
        </div>
      </div>
    </div>
  );
};

export default PostsPage;