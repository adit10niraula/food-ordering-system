import axios from "axios";
import api from "../store/api";
import {
  FOOD_ITEM_REQUEST,
  FOOD_ITEM_SUCCESS,
  FOOD_ITEM_FAIL,
  FOOD_ITEM_DETAIL_REQUEST,
  FOOD_ITEM_DETAIL_SUCCESS,
  FOOD_ITEM_DETAIL_FAIL,
  FOOD_ITEM_SIMILAR_FAIL,
  FOOD_ITEM_SIMILAR_REQUEST,
  FOOD_ITEM_SIMILAR_SUCCESS, SPECIAL_FOOD_ITEM_FAIL, SPECIAL_FOOD_ITEM_REQUEST,SPECIAL_FOOD_ITEM_SUCCESS,
  GET_CATEGORY_REQUEST, GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS
} from "../constants/FooditemConstants";

export const allFooditems = () => async (dispatch) => {
  dispatch({ type: FOOD_ITEM_REQUEST });

  try {
    const { data } = await axios.post("/api/v1/food/fooditems");
    
    dispatch({ type: FOOD_ITEM_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: FOOD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllCategory = ()=>async(dispatch)=>{
  dispatch({type:GET_CATEGORY_REQUEST})

  try{
    const {data} = await axios.get('/api/v1/category/display')
    console.log("datacategory", data)

    dispatch({type: GET_CATEGORY_SUCCESS, payload:data.data})

  }
  catch(error){
    console.log("error", error.response.data)
    dispatch({type: GET_CATEGORY_FAIL, payload:error.response && error.response.data.message ?
       error.response.data.message : error.message})

  }
  
}

export const specialFoodItems = ()=>async(dispatch)=>{
  dispatch({type: SPECIAL_FOOD_ITEM_REQUEST})
  try{
    const {data} = await axios.get('/api/v1/food/time');
    console.log("data", data)
    dispatch({type:SPECIAL_FOOD_ITEM_SUCCESS, payload:data.data});

  } 
  catch(error){
    console.log("error", error.response.data)
    dispatch({type:SPECIAL_FOOD_ITEM_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message })

  }
}

export const fooditemdetail = (id)=> async(dispatch)=>{
    dispatch({type:FOOD_ITEM_DETAIL_REQUEST, payload:id})

    try {
        const {data} = await axios.get(`/api/v1/food/detail/${id}`)

       

        dispatch({type:FOOD_ITEM_DETAIL_SUCCESS, payload:data.data})
        
    } catch (error) {
        dispatch({type:FOOD_ITEM_DETAIL_FAIL, payload:error?.response && error?.response.data.message ? error.response.data.message : error.message})

    }

}


export const fooditemSimilar = (id)=> async(dispatch)=>{
   
    dispatch({type:FOOD_ITEM_SIMILAR_REQUEST, payload:id})

    try {
        
        const {data} = await api.get(`/api/v1/food/show/${id}`)
        console.log("data")

        

        dispatch({type:FOOD_ITEM_SIMILAR_SUCCESS, payload:data.data})
        
        
    } catch (error) {
      console.log("error", error.response.data)
          
        dispatch({type:FOOD_ITEM_SIMILAR_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})

        
    }
}
