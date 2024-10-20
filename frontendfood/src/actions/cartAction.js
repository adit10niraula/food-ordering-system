import api from "../store/api";
import axios from "axios";
import { Buffer } from 'buffer';

import { ADD_CART_FAIL, ADD_CART_SUCCESS, ADD_CART_REQUEST,
    GET_CART_FAIL, GET_CART_REQUEST, GET_CART_SUCCESS,
    GET_PAYMENT_FAIL, GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS,
    ORDER_PAYMENT_FAIL,ORDER_PAYMENT_REQUEST,ORDER_PAYMENT_SUCCESS,
    DELETE_CART_FAIL, DELETE_CART_SUCCESS, DELETE_CART_REQUEST
 } from "../constants/cartConstants";


export const addToCart = (id)=> async(dispatch)=>{
    dispatch({type:ADD_CART_REQUEST, payload:id})

    try {
        const {data} = await api.post('/api/v1/cart/add', {id})

        dispatch({type:ADD_CART_SUCCESS, payload:data.data})
        
        
    } catch (error) {
        dispatch({type:ADD_CART_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})

        
    }
    

}

export const deleteCartItem = (id)=>async(dispatch)=>{
    dispatch({type:DELETE_CART_REQUEST, payload:id})
    

    try {
        await api.post(`/api/v1/cart/delete`, {id})
        dispatch({type:DELETE_CART_SUCCESS, payload:id})

       


        
    } catch (error) {
        console.log("error", error.response?.data.message)
        dispatch({type:DELETE_CART_FAIL , payload:error.response && error.response?.data.message ? error.response?.data.message : error.message})

        
    }
}

export const getCartItem = ()=>async (dispatch)=>{
    dispatch({type:GET_CART_REQUEST})

    try {
        const {data} = await api.get('/api/v1/cart/get')
        console.log("data", data.data)
        dispatch({type:GET_CART_SUCCESS, payload:data.data})
        
    } catch (error) {
        console.log("error", error.response.data.message)
        dispatch({type:GET_CART_FAIL, payload:error.response && error.response.data.message ? error.response.data.message: error.message})

        
    }
}


export const addOrderPayment = ()=> async(dispatch)=>{
    dispatch({type:GET_PAYMENT_REQUEST})
    
    try {
        
        const {data} = await api.post('/api/v1/order/payment')
        dispatch({type:GET_PAYMENT_SUCCESS, payload:data.data})
        
    } catch (error) {
        console.log("payment error: ", error.response.data.message)
        dispatch({type:GET_PAYMENT_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})

        
    }

}


export const createOrder = (Orderdata) => async(dispatch)=>{
    dispatch({type:ORDER_PAYMENT_REQUEST, payload:Orderdata})

    try {
     
        // const encodedData = Buffer.from(JSON.stringify(Orderdata)).toString('base64');

        const response = await api.post(`/api/v1/order/create?data=${Orderdata}`, {});
        
        if (!response || !response.data) {
            console.log("Invalid response from the server");
        }

        console.log("response data", response.data);
     
    } catch (error) {
        console.log("error: ", error.response.data.message)
        dispatch({type:ORDER_PAYMENT_FAIL, package:error.response && error.response?.data.message ? error.response?.data.message : error.message})

        
    }
}