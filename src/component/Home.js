import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import data from '../db.json'
import Post from './Post';
import {useSelector , useDispatch} from 'react-redux';
import {getPostById,getPosts} from '../redux/features/postSlice';
import Header from './Navbar';


function Home(){
 const [id,setId]=useState('');

 const {loading,post} = useSelector((state)=>({...state.app}));
//  console.log(post);

 const dispatch = useDispatch()

 const fetchUserPost= ()=>{
     if(!id){
         window.alert("please enter id");
     }
     else{
         dispatch(getPostById({id}));
         setId('')
     }
 }

 const fetchAllPosts=()=>{
     console.log("YES");
   dispatch(getPosts({id:1}))
 }
const isEdit=false;
return(
<div>

        <Header />
        <div className='mgTop'>
       
          <h2>Fetch Post or  Create Post</h2>
          <input type="number" placeholder='Enter id Post' value={id} onChange={(e)=>setId(e.target.value)}></input>
          <div className='d-flex justify-content-center align-item-center mt-2'>
          <button className='btn btn-primary mx-1' onClick={fetchUserPost}>Fetch Post</button>
          <button className='btn btn-info mx-1' onClick={fetchAllPosts}>get All Posts</button>
          <Link to="/create"><button className='btn btn-danger'>Create Post</button></Link>
          </div>
           
          {
           loading ? <h1 className='text-info'>loading.....</h1> 
           :(
        <>
            {post.length >0 && post.map(item=>(
                
               <Post item={item} isEdit={isEdit}/>
            )
            )
            }
       </>
          )
           
          }


        </div>

        </div>
   
    )
}

export default Home;