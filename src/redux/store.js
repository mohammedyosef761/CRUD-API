import {configureStore} from '@reduxjs/toolkit';
import PostReucer from './features/postSlice'

export default configureStore({
    reducer:{
        app:PostReucer,
    }
})






