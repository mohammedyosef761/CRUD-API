import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'







export const getPostById = createAsyncThunk("post/getPost",async ({id})=>{
    return fetch(`http://localhost:3004/posts/${id}`)
    .then((res)=>res.json());
});
// getBooks
export const getPosts = createAsyncThunk(
    'book/getBooks', 
    async(_,thunkApi)=>{
    try{
         const res = await fetch ("http://localhost:3004/posts");
         const data = await res.json();
         return data;
    }
    catch(error){
        console.log(error);
        return thunkApi.rejectWithValue(error.message)
    }
})

//insertBooks

export const insertPost = createAsyncThunk('book/insertBook', async(bookData,thunkApi)=>{
    // const {getState} = thunkApi;
    try{
        // console.log(getState().auth.name)
        // bookData.userName=getState().auth.name;
        const res = await fetch('http://localhost:3004/posts',{
            method:'POST',
            body:JSON.stringify(bookData),
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            }
        });
        const data = await res.json();
        return data;
        //return as action.payload
    }
    catch(error){
        return thunkApi.rejectWithValue(error.message)//return as action.payload

    }

})

export const deletePost = createAsyncThunk('books/deletepost',async (item,thunkApi)=>{

    try{
           await fetch(`http://localhost:3004/posts/${item.id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            }
        });
      
        return item;
        //return as action.payload
    }
    catch(error){
        return thunkApi.rejectWithValue(error.message)//return as action.payload

    }

})


const postSlice = createSlice({
    name:"post",
    initialState:{
        post:[],
        loading:false,
        error:null,
        edit:false,
        body:{}
    },
    reducers:{
        setEdit:(state,action)=>{
            console.log(action.payload);
             state.body=action.payload;
             state.edit=true;
        }
    },
    extraReducers:{
        [getPostById.pending]:(state,action)=>{
            state.loading=true;
        },
        [getPostById.fulfilled]:(state,action)=>{
            state.loading = false;
            state.post=[action.payload];
        },
        [getPostById.rejected]:(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        },

        [getPosts.pending]: (state,action)=>{
            state.loading =true;
            state.error=null;
        },
        [getPosts.fulfilled]: (state,action)=>{
            state.loading = false;
            console.log(action);
            state.post = action.payload;
        },
        [getPosts.rejected]:  (state,action)=>{
            console.log(action);
            state.loading=false;
            state.error=action.payload;
        },

        
//insert Books
[insertPost.pending]:(state,action)=>{
    state.loading =true;
    state.error=null;
},
[insertPost.fulfilled]:(state,action)=>{   
    state.loading = false;
    state.post.push(action.payload);
   
},
[insertPost.rejected]:(state,action)=>{
    state.loading =false;
    state.error=action.payload;
},

[deletePost.pending]:(state,action)=>{
    state.loading =true;
    state.error=null;
},
[deletePost.fulfilled]:(state,action)=>{   
    state.loading = false;
    // state.books.push(action.payload)
    state.post = state.post.filter(item =>item.id !==action.payload.id)
    console.log(action.payload);
},
[deletePost.rejected]:(state,action)=>{
    state.loading =false;
    state.error=action.payload;
},

    }
})
export  const {setEdit} = postSlice.actions;
export default postSlice.reducer;







