import mongoose, {Schema} from "mongoose";
import { FoodItem } from "./foodItem.model.js";
import { User } from "./user.model.js";


const cartSchema = new Schema({
    
    fooditem: {
        type:Schema.Types.ObjectId,
        ref:FoodItem
    },
    user: {
        type:Schema.Types.ObjectId,
        ref:User
    },
    quantity: {
        type:Number,
        default:1,


    }
}) 


export const Cart = mongoose.model("Cart", cartSchema)