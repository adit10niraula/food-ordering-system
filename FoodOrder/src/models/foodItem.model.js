import mongoose, {Schema} from "mongoose";
import { Category } from "./category.model.js";
// import { User } from "./user.model.js";

const foodItemSchema = new Schema({
     
    title: {
        type: String,
        trim: true,
        required: true,

    },
    description: {
        type: String,
        trim: true,
        

    },
    price: {
        type: Number,
        required: true
        

    },
    image: {
        type: String,
        trim: true,
        

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: Category,

    },
    ingredients:{
        type:[String]
    },
    rating:[
        {user:{type:Schema.Types.ObjectId, ref:"User"},
    rating:{type:Number, min:1, max:5}}
    ]
    
},{timestamps: true})


export const FoodItem = mongoose.model("FoodItem", foodItemSchema)