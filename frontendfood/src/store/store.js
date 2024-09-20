import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { userRegisterReducer, userLoginReducer,getCurrenUserReducer } from "../reducers/userReducers";
import { fooditemsReducers, fooditemDetailReducer, similarFooditemReducer,specialFoodItemsReducer, getallcategoryreducer } from "../reducers/fooditemReducers";
import { addToCartReducer, getCartItemsReducer, addOrderPaymentReducer, createorderReducer } from "../reducers/cartReducers";
import { adminLoginReducer, adminfooditemreducer, adminFoodItemDetailReducer,
    FoodItemDetailDeleteReducer, adminaddfooditemReducer, DisplayUserReducer,editfooditemsReducer, adminorderReducer
 } from "../reducers/adminReducer";



const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    getcurrentuser: getCurrenUserReducer,

    fooditems: fooditemsReducers,
    fooditemDetail: fooditemDetailReducer,
    similarFooditems: similarFooditemReducer,
    specialfooditem:specialFoodItemsReducer,
    getallcategory:getallcategoryreducer,

    addtocart:addToCartReducer,
    getCartItems:getCartItemsReducer,
    addorderpayment:addOrderPaymentReducer,
    createorder:createorderReducer,

    adminLogin:adminLoginReducer,
    adminfooditem:adminfooditemreducer,
    adminfooditemdetail:adminFoodItemDetailReducer,
    FoodItemDetailDelete:FoodItemDetailDeleteReducer,
    adminaddfooditem:adminaddfooditemReducer,
    DisplayUser:DisplayUserReducer,
    editfooditem:editfooditemsReducer,
    AdminOrder: adminorderReducer

    
})


const store = configureStore({
    reducer: rootReducer
})


export default store