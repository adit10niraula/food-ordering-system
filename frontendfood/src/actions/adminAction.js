import api from "../store/api";
import axios from "axios";
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS,
    ADMIN_FOODITEM_FAIL, ADMIN_FOODITEM_REQUEST, ADMIN_FOODITEM_SUCCESS,
    ADMIN_LOGOUT,
    ADMIN_DETAIL_FAIL, ADMIN_DETAIL_REQUEST, ADMIN_DETAIL_SUCCESS, 
    ADMIN_DETAIL_DELETE_FAIL, ADMIN_DETAIL_DELETE_REQUEST, ADMIN_DETAIL_DELETE_SUCCESS, ADMIN_DETAIL_EDIT_FAIL, ADMIN_DETAIL_EDIT_REQUEST, ADMIN_DETAIL_EDIT_SUCCESS,
    ADMIN_ADDFOODITEM_REQUEST,
    ADMIN_ADDFOODITEM_SUCCESS,
    ADMIN_ADDFOODITEM_FAIL,
    ADMIN_USER_REQUEST,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_FAIL
 } from "../constants/adminConstants";


export const adminlogin = (email, password)=> async(dispatch)=>{
    dispatch({type:ADMIN_LOGIN_REQUEST, payload:{email, password}})

    try {
        console.log("tyring", email, password)
        const response = await axios.post('/api/v1/admin/login', { email, password });
        console.log("data action", response.data)
        dispatch({type:ADMIN_LOGIN_SUCCESS, payload:response.data.data.user})
        localStorage.setItem('admin' , JSON.stringify(response.data.data.user))
        localStorage.setItem('accessToken', response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)
        
    } catch (error) {
        console.log("error", error.response.data)
        dispatch({type:ADMIN_LOGIN_FAIL, payload:error.response && error.response.data.message? error.response.data.message : error.message})

        
    }
}

export const adminLogout = ()=> async(dispatch)=>{
    localStorage.removeItem('admin')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    dispatch({type:ADMIN_LOGOUT})
    document.location.href = '/adminlogin'

}


export const AdminFooditems = ()=> async(dispatch)=>{
    dispatch({type:ADMIN_FOODITEM_REQUEST})

    try {
       
        const {data}= await api.post('/api/v1/food/fooditems')
        dispatch({type:ADMIN_FOODITEM_SUCCESS, payload:data.data})
    
        

        
    } catch (error) {
        console.log("admin fooditem ", error?.response.data.message, error)
        dispatch({type:ADMIN_FOODITEM_FAIL, payload:error.response && error.response.data?.message ? error.response.data?.message : error.message})


        
    }
}


export const adminFoodDetail = (id)=> async(dispatch)=>{
    dispatch({type:ADMIN_DETAIL_REQUEST, payload:id})

    try {
        const {data} = await api.get(`/api/v1/food/detail/${id}`)

        dispatch({type:ADMIN_DETAIL_SUCCESS, payload:data.data})

        
    } catch (error) {
        dispatch({type:ADMIN_DETAIL_FAIL, payload:error.response && error.response.data.message? error.response.data.message : error.message})

        
    }
}

export const foodItemDetailDelete = (id) => async(dispatch)=>{
    dispatch({type:ADMIN_DETAIL_DELETE_REQUEST, payload:id})

    try {
        console.log("typing delteing", id)
        await api.delete(`/api/v1/food/delete/${id}`)
        dispatch({type:ADMIN_DETAIL_DELETE_SUCCESS, payload:id})
        
    } catch (error) {
        console.log("error", error.response)
        dispatch({type:ADMIN_DETAIL_DELETE_FAIL, payload:error.response && error.response?.data.message ? error.response.data.message: error.message})
        

        
    }
}

export const adminAddFoodItem = (title, description, price, category,image)=>async(dispatch)=>{
    dispatch({type:ADMIN_ADDFOODITEM_REQUEST})

    try {
        console.log("trying", image)
        const {data} = await api.post('/api/v1/food/add', {title, description, price, category,image},
           { headers: {
                'Content-Type': 'multipart/form-data',
            },}

        )
        dispatch({type:ADMIN_ADDFOODITEM_SUCCESS, payload:data.data})
        console.log("fooditem data", data.data)
        
    } catch (error) {
        console.log("error", error.response.data.message)
        dispatch({type:ADMIN_ADDFOODITEM_FAIL, payload:error.response && error.response.data.message?error.response.data.message: error.message })

        
    }
}


export const displayUser = ()=>async(dispatch)=>{
    dispatch({type:ADMIN_USER_REQUEST})

    try {
        const {data} = await api.get('/api/v1/user/getalluser')
        dispatch({type:ADMIN_USER_SUCCESS, payload:data.data})
    } catch (error) {
        console.log("error", error.response)
        dispatch({type:ADMIN_USER_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
        
        
    }
}

export const adminfooditemdetailedit = (id, updateData)=> async(dispatch)=>{
    dispatch({type:ADMIN_DETAIL_EDIT_REQUEST, payload:id})
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    try {
        const {data} = await api.patch(`/api/v1/food/update/${id}`, updateData, config)
        dispatch({type:ADMIN_DETAIL_EDIT_SUCCESS, payload:data.data})
        
    } catch (error) {
        dispatch({type:ADMIN_DETAIL_EDIT_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})
        

        
    }


}