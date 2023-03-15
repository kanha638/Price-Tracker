import {createSlice} from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userInfo: null,
        isLoggedIn: false,
        isPending: false,
        isErrors : false,
        errorMessage:{
            authForms:"",
        },
    },
    reducers:{
        AuthStart:(state)=>{
            state.isPending = true;
        },
        AuthSuccess:(state,action)=>{
            state.isPending = false;
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        },
        AuthError:(state,action)=>{
            state.isErrors=true;
            state.isPending=false;
            state.errorMessage.authForms = action.payload.data.message;
        },
        SignOutStart:(state)=>{
            state.isErrors = false;
            state.isPending = true;
        },
        SignOutSuccess : (state,action)=>{
            state.isErrors = false;
            state.isPending = false;
            state.userInfo = null;
            state.isLoggedIn = false;
        },
        SignOutError : (state)=>{
            state.isErrors  = true;
            state.isPending = false;
        },
        MeStart :(state)=>{
            state.isPending = true;
        }
        ,
        MeSuccess: (state,action)=>{
            state.isPending = false;
            state.isLoggedIn = true;
            state.isErrors = false
            state.userInfo = action.payload
        },
        MeError : (state,action)=>{
            state.userInfo = null
            state.isLoggedIn = false;
        }
       
        
    }
})

export const {AuthStart,AuthSuccess,AuthError,SignOutError,SignOutStart,SignOutSuccess,MeStart,MeSuccess,MeError}=userSlice.actions;
export const selectUser = (state) => state.user.userInfo;
export const UserState = (state) => state.user;

export default userSlice.reducer;
