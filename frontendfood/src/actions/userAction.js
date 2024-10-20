import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  GET_CURRENT_USER_FAIL, GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_SUCCESS,
  DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, CLEAR_DELETE_USER,USER_ORDER_FAIL, USER_ORDER_SUCCESS, USER_ORDER_REQUEST
} from "../constants/userConstants";
import api from "../store/api";



export const register = (names, email, password, address, contact, profile) => async(dispatch) =>{
    dispatch({type: USER_REGISTER_REQUEST, payload:{email, password}})

    try {
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/v1/user/register', {
            name:names, email, password, address,   contact,profile
        }, config)

        dispatch({type:USER_REGISTER_SUCCESS, payload:data})
        // localStorage.setItem('userinfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message :error.message})
        
    }
}



export const login = (email, password) => async(dispatch)=>{
    dispatch({type:USER_LOGIN_REQUEST, payload:{email, password}})

    try {
        const {data} = await axios.post('/api/v1/user/login', {email, password})

        
        dispatch({type:USER_LOGIN_SUCCESS, payload:data.data})
        
        localStorage.setItem('userInfo', JSON.stringify(data.data.user));
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);

    localStorage.setItem("name", "rajkumar")
        
        
    } catch (error) {

        dispatch({type:USER_LOGIN_FAIL, payload: error.response && error.response.data.message? error.response.data.message : error.message})
        
    }
}


export const logout = ()=> (dispatch)=>{

    localStorage.removeItem('userInfo')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    
    dispatch({type:USER_LOGOUT})
    document.location.href ='/login';
}


export const getCurrentUser = ()=>async(dispatch)=>{
    dispatch({type: GET_CURRENT_USER_REQUEST})

    try{
        const {data} = await api.get('/api/v1/user/user')
        dispatch({type: GET_CURRENT_USER_SUCCESS, payload:data.data})
        console.log("user dta fav", data)
        
    }catch(error){
        dispatch({type:GET_CURRENT_USER_FAIL, payload:error.response && error.response.data.message? error.response.data.message : error.message})
    }
}

export const deleteUser = (id)=>async(dispatch)=>{
    dispatch({type:DELETE_USER_REQUEST})
   

    try{
       
        const {data} = await api.delete(`/api/v1/user/deleteuser/${id}`)
        dispatch({type: DELETE_USER_SUCCESS, payload:data.data})
        
    }
    catch(error){
        console.log("error", error.response.data)
        dispatch({type:DELETE_USER_FAIL, payload:error.response && error.response.data.message? error.response.data.message : error.message})


    }
}

export const userOrder = ()=> async(dispatch)=>{
    dispatch({type:USER_ORDER_REQUEST})

    try{
        console.log("getting orders")
        const {data} = await api.get('/api/v1/order/userorder')
        console.log('data', data)
        dispatch({type:USER_ORDER_SUCCESS, payload:data.data})
        console.log("userorder data", data)
    }catch(error){
        console.log("error", error.response.data)
        dispatch({type:USER_ORDER_FAIL, payload:error.response && error.response.data.message? error.response.data.message : error.message})


        

    }
}


export const clearDeleteState = () => ({ type: 'CLEAR_DELETE_USER' });
