import React from "react";
import {useSelector , useDispatch} from 'react-redux';
import {deletePost, setEdit} from '../redux/features/postSlice';
function Post({item,isEdit}){
    // const {post} = useSelector((state)=>({...state.app}));
    const dispatch = useDispatch();

    const handleEdit =(item)=>{
        dispatch(setEdit(item));
        dispatch(deletePost(item));
    }
    return (
        <div >
             <div className='post'>
          <div className='name'>
          <h1 className="text-info">{item.name}</h1>
          </div>
           <h3>id:{item.id}</h3>
           <h4>{item.price}</h4>
           <h3 className="m-auto">{item.desc}</h3>
           {
               isEdit&&<div className='post_btn'>
               <button className='btn btn-danger' onClick={()=>dispatch(deletePost(item))} >Delete</button>
               <button className='btn btn-success' onClick={()=>handleEdit(item)}>Edit</button>
           </div>
           }
        </div>
        </div>
    )
}
export default Post;