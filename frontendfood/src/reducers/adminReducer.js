import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS,
    ADMIN_FOODITEM_FAIL, ADMIN_FOODITEM_REQUEST, ADMIN_FOODITEM_SUCCESS, 
    ADMIN_DETAIL_FAIL, ADMIN_DETAIL_REQUEST, ADMIN_DETAIL_SUCCESS,
    ADMIN_DETAIL_DELETE_REQUEST,
    ADMIN_DETAIL_DELETE_SUCCESS,
    ADMIN_DETAIL_DELETE_FAIL,
    ADMIN_ADDFOODITEM_REQUEST,
    ADMIN_ADDFOODITEM_SUCCESS,
    ADMIN_ADDFOODITEM_FAIL,
    ADMIN_USER_REQUEST,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_FAIL,
    ADMIN_DETAIL_EDIT_REQUEST,
    ADMIN_DETAIL_EDIT_SUCCESS,
    ADMIN_DETAIL_EDIT_FAIL, ADMIN_ORDER_FAIL, ADMIN_ORDER_SUCCESS, ADMIN_ORDER_REQUEST,
    ADD_CATEGORY_REQUEST, ADD_CATEGORY_FAIL, ADD_CATEGORY_SUCCESS,
    DELETE_ORDER_FAIL, DELETE_ORDER_SUCCESS, DELETE_ORDER_REQUEST
 } from "../constants/adminConstants";


 const data = localStorage.getItem('admin')
 const admininfo = data ? JSON.parse(data) : null


const initialState = {
    loading: false,
    adminData: admininfo,
    error: null,
  };

export const adminLoginReducer = (state =initialState, action)=>{
    switch(action.type){
        case ADMIN_LOGIN_REQUEST:
            return {loading:true}
        case ADMIN_LOGIN_SUCCESS:
            return {loading:false, adminData:action.payload}
        case ADMIN_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

export const adminfooditemreducer = (state={loading:false, adminfood:[]}, action)=>{
    switch(action.type){
        case ADMIN_FOODITEM_REQUEST:
            return {loading:true}
        case ADMIN_FOODITEM_SUCCESS:
            return {loading:false, adminfood:action.payload}
        case ADMIN_FOODITEM_FAIL:
            return{loading:false, error:action.payload}
         default:
            return state
    }
}

export const adminorderReducer = (state= {loading:false}, action)=>{
    switch(action.type){
        case ADMIN_ORDER_REQUEST:
            return {loading:true}
        case ADMIN_ORDER_SUCCESS:
            return {loading:false, order:action.payload}
        case ADMIN_ORDER_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const adminFoodItemDetailReducer = (state = {loading:false}, action)=>{
    switch(action.type){
        case ADMIN_DETAIL_REQUEST:
            return {loading:true}
        case ADMIN_DETAIL_SUCCESS:
            return {loading:false, admindetail:action.payload}
        case ADMIN_DETAIL_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const FoodItemDetailDeleteReducer = (state ={}, action)=>{

    switch(action.type){
        case ADMIN_DETAIL_DELETE_REQUEST:
            return {loading:true}
        case ADMIN_DETAIL_DELETE_SUCCESS:
            return {...state, loading:false, success: true}
        case ADMIN_DETAIL_DELETE_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            return state

    }

}


export const adminaddfooditemReducer = (state= {}, action)=>{
    switch(action.type){
        case ADMIN_ADDFOODITEM_REQUEST:
            return {loading:true}
        case ADMIN_ADDFOODITEM_SUCCESS:
            return {...state, loading:false, fooddata: action.payload}
        case ADMIN_ADDFOODITEM_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            return state

    }
}

export const DisplayUserReducer = (state = {loading:false}, action)=>{
    switch(action.type){
        case ADMIN_USER_REQUEST:
            return {loading:true}
        case ADMIN_USER_SUCCESS:
            return {loading:false, UserData:action.payload}
        case ADMIN_USER_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const editfooditemsReducer = (state = {}, action)=>{
    switch(action.type){
        case ADMIN_DETAIL_EDIT_REQUEST:
            return {loading:true}
        case ADMIN_DETAIL_EDIT_SUCCESS:
            return {...state, loading:false, editdata: action.payload}
        case ADMIN_DETAIL_EDIT_FAIL:
            return {...state, loading:false, error:action.payload}
        default:
            return state

    }
}


export const DeleteOrderReducer = (state= {}, action)=>{
    switch(action.type){
        case DELETE_ORDER_REQUEST:
            return {loading: true}
        case DELETE_ORDER_SUCCESS:
            return {...state, loading:false, deleteorder:action.payload}
        case DELETE_ORDER_FAIL:
            return {...state, loading:false, error: action.payload}
        
        default:
            return state
    }
 }
