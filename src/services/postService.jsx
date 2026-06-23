import axios from "axios";



const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL   
})


export const getData = () =>{
    return API.get('/posts')
}


export const deleteData = (id) =>{
    return API.delete(`/posts/${id}`)
}


export const addData = (post) =>{
    return API.post('/posts', post)
}