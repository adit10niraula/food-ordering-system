import mongoose, {Schema} from "mongoose";
import { Cart } from "./cart.model.js";
import { User } from "./user.model.js";


const orderSchema = new Schema({

    cartitem:[{
        type:Schema.Types.ObjectId,
        ref:Cart

    }],


    user:{
        type:Schema.Types.ObjectId,
        ref:User

    },
    totalprice:{
        type:Number,
        default:0

    },
   
    address: {
        type: String,
        required: true,
        trim: true,
    },
    
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    transactionCode:{
        type:String
    }
    
}, {timestamps:true})


export const Order = mongoose.model('Order', orderSchema)