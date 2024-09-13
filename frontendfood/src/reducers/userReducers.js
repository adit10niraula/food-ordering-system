 import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants";

 const data = localStorage.getItem('userInfo');
 console.log('Data from storage:',  data);
 const userInfoFromLocalstore = data ? JSON.parse(data) : null;
 
const initialState = {userInfo: userInfoFromLocalstore}

 export const userRegisterReducer = (state = initialState, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true}
        
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo:action.payload}
        
        case USER_REGISTER_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }

 }


 export const userLoginReducer = (state= initialState, action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}
        
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo:action.payload}

        case USER_LOGIN_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
 }