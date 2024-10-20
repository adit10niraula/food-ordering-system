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
  GET_CATEGORY_REQUEST, GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS, ADDTO_FAVOURATE_FAIL, ADDTO_FAVOURATE_REQUEST,
   ADDTO_FAVOURATE_SUCCESS,GET_FAVOURATE_FAIL,GET_FAVOURATE_REQUEST,GET_FAVOURATE_SUCCESS, 
   REMOVE_FAVOURATE_FAIL,REMOVE_FAVOURATE_SUCCESS,RECOMMEND_FAVOURATE_FAIL,
   RECOMMEND_FAVOURATE_REQUEST, RECOMMEND_FAVOURATE_SUCCESS,
   FOODITEM_RATING_FAIL, FOODITEM_RATING_SUCCESS
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


export const addtofavourate = (id)=> async(dispatch)=>{
  dispatch({type:ADDTO_FAVOURATE_REQUEST})

  try{
    console.log("trying")
    const {data} = await api.post('/api/v1/food/fav',{id})
    dispatch({type:ADDTO_FAVOURATE_SUCCESS, payload:data})
    console.log("adding actionfav",data)

  }catch(error){
    console.log("error in fav", error?.response)
    dispatch({type:ADDTO_FAVOURATE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})

  }
}


export const getfavourate = ()=> async(dispatch)=>{
  dispatch({type:GET_FAVOURATE_REQUEST})

  try{
    console.log("trying get fav")
    const {data} = await api.get('/api/v1/food/getfav')
    dispatch({type:GET_FAVOURATE_SUCCESS, payload:data.data})
    

  }catch(error){
    console.log("error in gettingfav", error?.response)
    dispatch({type:GET_FAVOURATE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})

  }
}

export const removeFavourate = (id) => async (dispatch) => {
  console.log("trying",id)

  try {
    await api.delete(`/api/v1/food/remove/${id}`);
    dispatch({ type: REMOVE_FAVOURATE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: REMOVE_FAVOURATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};



export const recommendfavourate = ()=> async(dispatch)=>{
  dispatch({type:RECOMMEND_FAVOURATE_REQUEST})

  try{
    console.log("trying get fav")
    const {data} = await api.get('/api/v1/food/recommend')
    dispatch({type:RECOMMEND_FAVOURATE_SUCCESS, payload:data.data})
    console.log("recommmeddatataondlfjslfjs",data)

  }catch(error){
    console.log("error in gettingfav", error?.response)
    dispatch({type:RECOMMEND_FAVOURATE_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})

  }
}

export const rateFoodItem = (id, rating) => async(dispatch)=>{
  try{
    const {data} = await api.post(`/api/v1/food/rating/${id}`, {rating})
    dispatch({type:FOODITEM_RATING_SUCCESS, payload:data.data})
    console.log("rating success", data)

  }
  catch(error){
    console.log("error in rating fooditem", error?.response)
    dispatch({type:FOODITEM_RATING_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message})

  }
}
