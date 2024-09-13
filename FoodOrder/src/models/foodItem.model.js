import mongoose, {Schema} from "mongoose";
import { Category } from "./category.model.js";

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

    }
    
},{timestamps: true})


export const FoodItem = mongoose.model("FoodItem", foodItemSchema)