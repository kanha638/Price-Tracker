import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import { auth } from "../middleware/auth";
import usersReducer from '../slices/userSlice';

export default configureStore({
    reducer:{
        user:usersReducer,
    }
});