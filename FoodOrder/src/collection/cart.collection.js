import { FoodItem } from "../models/foodItem.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ErrorHandler.js";
import { ApiResponse } from "../utils/ResponseHandler.js";
import { Cart } from "../models/cart.model.js";
import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";


const addToCart = AsyncHandler(async(req, res)=>{
    
    const {id, quantity=1} = req.body

    const user = req.user
    if(!user){
        throw new ApiError(400, "user must be logged in to add to car")
    }
    if(!id){
        throw new ApiError(400,"fooditem not found")
    }
    console.log(id)

    const food = await FoodItem.findById(id)
    if(!food){
        throw new ApiError(400, "invalid food item")
    }
    console.log(food)
    let createCartItem
    const cartItem =  await Cart.findOne({fooditem:food._id, user:user._id})
    console.log("cart items",cartItem)
    if(cartItem){
        cartItem.quantity += quantity
        await cartItem.save()
    }else{
        createCartItem = await Cart.create({
            fooditem:food._id,
            user:user._id,
            quantity

        })
    }

    const newcartitem = createCartItem? await Cart.findById(createCartItem?._id).populate('fooditem').populate('user'):
        await Cart.findById(cartItem?._id).populate('fooditem').populate('user')
    if(!newcartitem){
        throw new ApiError(400, "cart item is not created")
    }



    return res.status(200).json(new ApiResponse(200, newcartitem, "added to cart success"))
})

const getAllCartItem = AsyncHandler(async(req, res)=>{

    const user = req.user
    if(!user){
        throw new ApiError(400, "user must be logged in")
    }
    
    const cart = await Cart.find({user:user._id}).populate('fooditem').populate({
        path:'user',
        select:"-password -refreshToken"
    })

    if(cart.length === 0){
        return res.status(200).json(new ApiResponse(200, {}, "cart is empty"))
    }
    
    return res.status(200).json(new ApiResponse(200, cart, "displaying all cart item "))
})


const deleteFromCart = AsyncHandler(async(req, res)=>{

    try {
      const {id }= req.body
      console.log("idd", id)
      if(!id){
          throw new ApiError(400, "empty id value")
      }
      console.log("id",id)
      const user = req.user 
      if(!user){
          throw new ApiError(400, "user is not logged in")
  
      }
      const deleteitem = await Cart.findByIdAndDelete(id)
      if(!deleteitem){
        throw new ApiError(400, "item not found")
      }
  
    
  
      return res.status(200).json(new ApiResponse(200, {}, "cart deleted success"))
    } catch (error) {
      console.log("error", error)
      throw new ApiError(400, "erro fetching ")
      
    }

})

const getCartItem = AsyncHandler(async (req, res) => {
    try {
      console.log("req.user", req.user)
      const userId = req.user._id;
      
      if (!userId) {
        throw new ApiError(400, "error userId");
      }
      console.log(userId)
      
      // Convert userId to ObjectId correctly
      const userObjectId = new mongoose.Types.ObjectId(userId);

  
      const result = await Cart.aggregate([
        // Match the cart items for the specific user
        { $match: { user: userObjectId } },
  
        // Lookup to join FoodItem details with cart items
        {
          $lookup: {
            from: "fooditems", // Collection name in MongoDB
            localField: "fooditem",
            foreignField: "_id",
            as: "foodDetails"
          }
        },
  
        // Unwind the foodDetails array to work with individual objects
        { $unwind: "$foodDetails" },
  
        // Project the necessary fields and calculate total price for each item
        {
          $project: {
            _id: 0,
            price: { $multiply: ["$quantity", "$foodDetails.price"] },
            quantity: "$quantity"
          }
        },
  
        // Group by null to calculate the overall total price and quantity
        {
          $group: {
            _id: userObjectId,
            totalPrice: { $sum: "$price" },
            totalQuantity: { $sum: "$quantity" }
          }
        }
      ]);
  
      // Return the result
      const results = result.length > 0 ? result[0] : { totalPrice: 0, totalQuantity: 0 };
      const cartitems = await Cart.find({user:userId}).populate('fooditem').populate({
        path:'user',
        select: '-password -refreshtoken'
        
      })
  
      return res.status(200).json(new ApiResponse(200, {results, cartitems}, "success"));
  
    } catch (error) {
      console.error("Error calculating cart totals: ", error);
      throw new Error("Failed to calculate cart totals");
    }
  });




export {addToCart, deleteFromCart, getAllCartItem, getCartItem}