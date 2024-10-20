import { act } from "react"
import { FOOD_ITEM_FAIL, FOOD_ITEM_REQUEST, FOOD_ITEM_SUCCESS
    ,FOOD_ITEM_DETAIL_FAIL, FOOD_ITEM_DETAIL_REQUEST, FOOD_ITEM_DETAIL_SUCCESS,
    FOOD_ITEM_SIMILAR_FAIL, FOOD_ITEM_SIMILAR_REQUEST, FOOD_ITEM_SIMILAR_SUCCESS,
     SPECIAL_FOOD_ITEM_FAIL, SPECIAL_FOOD_ITEM_REQUEST, SPECIAL_FOOD_ITEM_SUCCESS,
     GET_CATEGORY_FAIL, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS,ADDTO_FAVOURATE_FAIL,
     ADDTO_FAVOURATE_SUCCESS,ADDTO_FAVOURATE_REQUEST,GET_FAVOURATE_FAIL,
      GET_FAVOURATE_REQUEST,GET_FAVOURATE_SUCCESS,REMOVE_FAVOURATE_SUCCESS,
      RECOMMEND_FAVOURATE_FAIL,RECOMMEND_FAVOURATE_REQUEST, RECOMMEND_FAVOURATE_SUCCESS,FOODITEM_RATING_FAIL, FOODITEM_RATING_SUCCESS
} from "../constants/FooditemConstants"

const initialState = {
    fooditem: [],
    loading:false,
    error:null
}

export const fooditemsReducers = (state = initialState, action)=>{

    switch(action.type){
        case FOOD_ITEM_REQUEST:
            return {loading:true}

        case FOOD_ITEM_SUCCESS:
            return {loading:false, error:null, fooditem:action.payload.items}

        case FOOD_ITEM_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }

}

export const getallcategoryreducer = (state = {loading:false}, action)=>{
    switch(action.type){
        case GET_CATEGORY_REQUEST:
            return {loading:true}
        case GET_CATEGORY_SUCCESS:
            return {loading:false, category:action.payload}
        case GET_CATEGORY_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }   

}

export const specialFoodItemsReducer = (state = {loading:true}, action)=>{
    switch(action.type){
        case SPECIAL_FOOD_ITEM_REQUEST:
            return {loading:true}
        case SPECIAL_FOOD_ITEM_SUCCESS:
            return {loading:false, specialitem:action.payload}
        case SPECIAL_FOOD_ITEM_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}


export const fooditemDetailReducer = (state = {loading:true}, action)=>{

    switch(action.type){
        case FOOD_ITEM_DETAIL_REQUEST:
            return {loading:true}
        case FOOD_ITEM_DETAIL_SUCCESS:
            return {loading:false, fooditem:action.payload}
        case FOOD_ITEM_DETAIL_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

export const similarFooditemReducer = (state ={similarfooditem:[],loading:false}, action)=>{
    switch(action.type){
        case FOOD_ITEM_SIMILAR_REQUEST:
            return {loading:true}
        
        
        case FOOD_ITEM_SIMILAR_SUCCESS:
            
            return {loading:false, similarfooditem: action.payload }
        
        case FOOD_ITEM_SIMILAR_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }

}

export const addtofavourateReducer = (state= {}, action)=>{
    switch(action.type){
        case ADDTO_FAVOURATE_REQUEST:
            return {loading:true}
        case ADDTO_FAVOURATE_SUCCESS:
            return {loading:false, fav:action.payload}
        case ADDTO_FAVOURATE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }

}

export const getfavourateReducer = (state= {}, action)=>{
    switch(action.type){
        case GET_FAVOURATE_REQUEST:
            return {loading:true}
        case GET_FAVOURATE_SUCCESS:
            return {loading:false, getfav:action.payload}
        case GET_FAVOURATE_FAIL:
            return {loading:false, error:action.payload}
        case REMOVE_FAVOURATE_SUCCESS:
            return {
                ...state,
                getfav: {
                ...state.getfav,
                favourates: state.getfav.favourates.filter(fav => fav.fooditem._id !== action.payload)
                }
            };
        default:
            return state
    }

}


export const recommendFavReducer = (state= {}, action)=>{
    switch(action.type){
        case  RECOMMEND_FAVOURATE_REQUEST:
            return {loading:true}
        case RECOMMEND_FAVOURATE_SUCCESS:
            return {loading:false, recommendfav:action.payload}
        case RECOMMEND_FAVOURATE_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }

}

export const rateFooditemReducer = (state= {}, action)=>{
    switch(action.type){
        
        case FOODITEM_RATING_SUCCESS:
            return {loading:false, ratedfood:action.payload}
        case FOODITEM_RATING_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }

}