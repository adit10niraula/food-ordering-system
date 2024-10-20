    import mongoose, {Schema} from "mongoose";
    import { Cart } from "./cart.model.js";
    import { User } from "./user.model.js";
    import { FoodItem } from "./foodItem.model.js";


    const orderSchema = new Schema({

        cartitem:[{
            fooditem:{type:Schema.Types.ObjectId,
            ref:FoodItem},
            quantity:{type:Number}

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
        },
        status:{ type:String,
            enum:["pending", "in Kitchen", "ready"],
            default:"pending"


        }
        
    }, {timestamps:true})


    export const Order = mongoose.model('Order', orderSchema)