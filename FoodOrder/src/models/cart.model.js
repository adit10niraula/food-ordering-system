import mongoose, {Schema} from "mongoose";
import { FoodItem } from "./foodItem.model.js";
import { User } from "./user.model.js";


const cartSchema = new Schema({
    
    fooditem: [{
        items:{type:Schema.Types.ObjectId,
        ref:FoodItem},
        quantity:{type:Number, default:1}
    },
   ],
    user: {
        type:Schema.Types.ObjectId,
        ref:User
    },
    totalPrice: {
        type:Number,
       


    }
    
},{
    timestamps:true
}) 


export const Cart = mongoose.model("Cart", cartSchema)