import { ADD_CART_FAIL,ADD_CART_REQUEST,ADD_CART_SUCCESS,
    DELETE_CART_FAIL,
    DELETE_CART_REQUEST,
    DELETE_CART_SUCCESS,
    GET_CART_FAIL,GET_CART_REQUEST,GET_CART_SUCCESS,
    GET_PAYMENT_FAIL, GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS,
    ORDER_PAYMENT_FAIL,ORDER_PAYMENT_REQUEST,ORDER_PAYMENT_SUCCESS
 } from "../constants/cartConstants";

const initialState = {
    cartitems: [],
    loading:false,
    error:null
}

 export const addToCartReducer = (state ={loading:false}, action)=>{
    switch(action.type){
        case ADD_CART_REQUEST:
            return {loading:true}
        case ADD_CART_SUCCESS:
          
            return {loading:false, cartitems:action.payload}
        
        case ADD_CART_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }

}

export const getCartItemsReducer = (state={initialState}, action)=>{
    switch(action.type){
        case GET_CART_REQUEST:
            return {loading:true}
        case GET_CART_SUCCESS:
            return {loading:false, cartitems:action.payload}
        case GET_CART_FAIL:
            return {loading:false, error:action.payload}
        case DELETE_CART_SUCCESS:
            const updatedCartItems = state.cartitems.cartitems.filter(
                (item) => item._id !== action.payload
            );

            // Recalculate the total price and total quantity
            const updatedTotalPrice = updatedCartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            const updatedTotalQuantity = updatedCartItems.reduce(
                (acc, item) => acc + item.quantity,
                0
            );

            return {
                ...state,
                cartitems: {
                    ...state.cartitems,
                    cartitems: updatedCartItems,
                    results: {
                        totalPrice: updatedTotalPrice,
                        totalQuantity: updatedTotalQuantity,
                    },
                },
            };
        
            default:
            return state

    }
}

export const addOrderPaymentReducer = (state ={loading:false}, action)=>{
    switch(action.type){
        case GET_PAYMENT_REQUEST:
            return {loading:true}
        case GET_PAYMENT_SUCCESS:
            return {loading:false, paymentdetail:action.payload}
        case GET_PAYMENT_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}


export const createorderReducer = (state={loading:false}, action)=>{
        switch(action.type){
            case ORDER_PAYMENT_REQUEST:
                return {loading:true}
            
            case ORDER_PAYMENT_SUCCESS:
                return {loading:false, orderData:action.payload}
            case ORDER_PAYMENT_FAIL:
                return {loading:false, error:action.payload}
            default:
                return state
        }
}


export const deleteCartReducer = (state = {loading:false}, action)=>{
    switch(action.type){
        case DELETE_CART_REQUEST:
            return {loading:true}
        // case DELETE_CART_SUCCESS:
        //     return {loading:false}
        case DELETE_CART_FAIL:
            return {loading:false, error:action.payload}
    }
}