import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";


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
        console.log("data", data.data.user)
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