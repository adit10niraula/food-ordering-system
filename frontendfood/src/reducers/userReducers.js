 import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS,GET_CURRENT_USER_FAIL, GET_CURRENT_USER_REQUEST,GET_CURRENT_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST
     ,DELETE_USER_SUCCESS,CLEAR_DELETE_USER, USER_ORDER_FAIL, USER_ORDER_SUCCESS, USER_ORDER_REQUEST
     } from "../constants/userConstants";

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

 export const getCurrenUserReducer = (state={loading:false}, action)=>{
    switch(action.type){
        case GET_CURRENT_USER_REQUEST:
            return {loading:false}
        case GET_CURRENT_USER_SUCCESS:
            return {loading:false, user:action.payload}
        case GET_CURRENT_USER_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

 }



 export const DeleteUserReducer = (state= {}, action)=>{
    switch(action.type){
        case DELETE_USER_REQUEST:
            return {loading: true}
        case DELETE_USER_SUCCESS:
            return {...state, loading:false, deleteuser:action.payload}
        case DELETE_USER_FAIL:
            return {...state, loading:false, error: action.payload}
        case CLEAR_DELETE_USER:
            return {...state, loading:false, deleteuser:null, error:null}
        default:
            return state
    }
 }

 export const UserOrderReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_ORDER_REQUEST:
            return {loading:true}
        case USER_ORDER_SUCCESS:
            return {loading:false, userorder:action.payload}
        case USER_ORDER_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state

    }
 }