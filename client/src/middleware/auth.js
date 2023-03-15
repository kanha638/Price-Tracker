import { AuthError, AuthStart,AuthSuccess, MeError, MeStart, MeSuccess, SignOutError, SignOutStart, SignOutSuccess } from "../slices/userSlice"
import axios from 'axios';

export const signUp= async (data, dispatch,navigate)=>{
    dispatch(AuthStart())
    try{
        const response=await axios.post('http://localhost:8000/api/auth/sign-up',data,{withCredentials : true});
        dispatch(AuthSuccess(response.data));
        navigate('/')
    }
    catch(error){
        dispatch(AuthError(error.response))
        console.log(error);
    }
}
export const signIn= async (data,dispatch,navigate)=>{
    dispatch(AuthStart());
    try{
        const response=await axios.post('http://localhost:8000/api/auth/sign-in',data,{withCredentials:true});
        dispatch(AuthSuccess(response.data));
        navigate('/')
    }
    catch(error){
        dispatch(AuthError(error.response))
        console.log(error);
    }
}

export const signOut = async (dispatch,navigate)=>{
    dispatch(SignOutStart())
    try {
        const response = await axios.get("http://localhost:8000/api/auth/sign-out",{withCredentials : true})
        dispatch(SignOutSuccess());
        navigate("/sign-in")
    } catch (error) {
        dispatch(SignOutError(error.response))
        console.log(error);
    }
}


export const Me = async (dispatch)=>{
    dispatch(MeStart());
    try {
        const response = await axios.get("http://localhost:8000/api/auth/me",{withCredentials:true});
        dispatch(MeSuccess(response.data))
    } catch (error) {
        console.log(error)
        dispatch(MeError(error.response))
    }
}
