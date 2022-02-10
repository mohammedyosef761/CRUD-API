import React,{useRef} from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import {useSelector , useDispatch} from 'react-redux';
import {insertPost} from '../redux/features/postSlice';
import Header from './Navbar';

function Create(){
  
  const {loading,post,edit,body} = useSelector((state)=>({...state.app}));

  const dispatch = useDispatch();

    const name=useRef('');
    const id=useRef('');
    const price=useRef('')
    const desc=useRef('');


    const handleSubmit=(e)=>{
        e.preventDefault();
       const data={
           name:name.current.value,
           id:id.current.value,
           price:price.current.value,
           desc:desc.current.value
       }

       dispatch(insertPost(data));

       name.current.value='';
       id.current.value="";
       price.current.value="";
       desc.current.value='';

    }

const update = ()=>{
      console.log("EDDDDIIIIT");
      if(edit){
      name.current.value=body.name;
      id.current.value=body.id;
      price.current.value=body.price;
      desc.current.value=body.desc;
      }else{
        name.current.value='';
        id.current.value="";
        price.current.value="";
        desc.current.value='';
      }
  }

   const isEdit=true;
  
    return(
      <div>
        <Header />

        
     
        <div className='mgTop'>
        <form  className="" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label  className="form-label">name:</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" ref={name} required />
        </div>
        <div className="mb-3 mt-3">
          <label  className="form-label">id:</label>
          <input type="number" className="form-control" id="name" placeholder="Enter id" name="name" ref={id} required />
        </div>

        <div className="mb-3 mt-3">
          <label  className="form-label">name:</label>
          <input type="number" className="form-control" id="name" placeholder="Enter price" name="name" ref={price} required />
        </div>

        <div className="mb-3">
        <label for="comment">desc</label>
        <textarea className="form-control" rows="5" id="desc" name="text" ref={desc}></textarea>
        </div>
        
        <div >
      <Link to='/'>  <button className="btn btn-danger mx-2">Go Back</button>  </Link>
        <button type="submit" className="btn btn-primary " >Submit</button>
        </div>
        
        
      </form>

     {post.length>0 ?<button  className="btn btn-info mgTop w-25" onClick={update}>click here to Edit</button> :<h1>There is no items</h1>}
     
      {
           loading ? <h1>loading.....</h1> 
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

export default Create;