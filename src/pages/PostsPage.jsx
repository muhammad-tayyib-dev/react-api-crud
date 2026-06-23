import { useEffect, useState } from 'react'
import {  addData, deleteData, getData, updateData } from '../services/postService'
import PostCard from '../components/PostCard';
import { Atom } from 'react-loading-indicators';





const PostsPage = () => {


  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [Input, setInput] = useState({
    title : '',
    body: '',
  });
  const [EditedPost, setEditedPost] = useState(null)

  



  // < ----------------------------------- DataGet Functionality -------------------------------------->
  
  const getPostData = async () =>{
    
    try {
      const res = await getData();

      setData(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
    finally{
    setLoading(false);
    }
    
    }

    useEffect(() => {
        getPostData()
    }, [])


// < ----------------------------------- Delete Functionality -------------------------------------->

    const DeletePostData = async (id) =>{

        const confirmDelete = window.confirm("Are you sure you want to delete?");

        if(!confirmDelete) return;

    
        try {

            const res = await deleteData(id);

            if (res.status === 200 ) {
                const updatedData = data.filter((CurElem) => {
                return CurElem.id != id;
                })

                setData(updatedData);
            }

            
        } catch (error) {

            console.log(error);
            
        }
    
    }



  // < ----------------------------------- Add- Data Functionality -------------------------------------->


    const handleOnChange = (e) =>{
        const {name , value } = e.target;
        setInput({...Input , [name] : value})

    }

    

    const AddPostData = async () =>{
        
        try {

            const res = await addData(Input);

            if (res.status === 201) {
                setData([  ...data , res.data ])
                setInput({
                title: '',
                body :'',
                })
            }

            
        } catch (error) {

            console.log(error);
        }
        
    }


  // < ----------------------------------- Add Edit Mode For Post -------------------------------------->


    const EditPost = (post) =>{

        setEditedPost(post)

        setInput({
            title: post.title,
            body : post.body
        })
        
        
    }



  // < ----------------------------------- Added Update Post functionality  -------------------------------------->




    const UpdatePostData = async () =>{

        try {

            const res = await updateData( EditedPost.id , Input);

            if (res.status === 200 ) {

                const UpdatedPost =  data.map((curPost) => {
                    if (curPost.id == EditedPost.id) {
                    return res.data;
                    } else {
                    return curPost ;
                    }
                })

                setData(UpdatedPost)
            }

                setInput({
                    title: '',
                    body :'',
                    })
                setEditedPost("")

            
        } catch (error) {

            console.log(error);
        }
        

    }






    const handleAddBtn = () => {
         if (!Input.title.trim() || !Input.body.trim()) {
            alert("Please fill all fields");
            return; 
        }

        EditedPost ? UpdatePostData() : AddPostData()
    }







if (Loading) {
   return <div className='w-full h-lvh flex justify-center items-center ' >
        <Atom color="#32cd32" size="large" text="Loading ....." textColor="" />
   </div>
}




  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
       
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Task Manager
          </h1>
          <p className="text-slate-500 mt-2">
            Organize and manage your tasks efficiently
          </p>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            
            <input
              type="text"
              name='title'
              placeholder="Enter Title"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={Input.title}
              onChange={handleOnChange}
            />

            <input
              type="text"
              name='body'
              placeholder="Enter Description"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={Input.body}
              onChange={handleOnChange}
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer "
                onClick={handleAddBtn}
            >
              { EditedPost ? 'Update':'Add' }
            </button>
          </div>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {
             data.map((curPost) =>{
              return <PostCard key={curPost.id}  post={curPost} handleDeleteBtn = {DeletePostData} handleEditBtn={EditPost}   />
            } )
          }
        </div>
      </div>
    </div>
  );
};

export default PostsPage;