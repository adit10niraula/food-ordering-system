import { FoodItem } from "../models/foodItem.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ErrorHandler.js";
import { ApiResponse } from "../utils/ResponseHandler.js";
import { Cart } from "../models/cart.model.js";
import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";


// const addToCart = AsyncHandler(async(req, res)=>{
    
//     const {id, quantity=1} = req.body

//     const user = req.user
//     console.log("cart user", user)
//     if(!user){
//         throw new ApiError(400, "user must be logged in to add to car")
//     }
//     if(!id){
//         throw new ApiError(400,"fooditem not found")
//     }
//     console.log(id)

//     let cart = await Cart.findOne({user:user})

//     const food = await FoodItem.findById(id)
//     if(!food){
//         throw new ApiError(400, "invalid food item")
//     }
//     console.log(food)
//     let createCartItem
//     const cartItem =  await Cart.findOne({fooditem:food._id, user:user._id})
//     console.log("cart items",cartItem)
//     if(cartItem){
//         cartItem.quantity += quantity
//         await cartItem.save()
//     }else{
//         createCartItem = await Cart.create({
//             fooditem:food._id,
//             user:user._id,
//             quantity

//         })
//     }

//     const newcartitem = createCartItem? await Cart.findById(createCartItem?._id).populate('fooditem').populate('user'):
//         await Cart.findById(cartItem?._id).populate('fooditem').populate('user')
//     if(!newcartitem){
//         throw new ApiError(400, "cart item is not created")
//     }



//     return res.status(200).json(new ApiResponse(200, newcartitem, "added to cart success"))
// })

const addToCart = async (req, res) => {
  try {
      const { id, quantity } = req.body;

      const userId = req.user
      // Find or create a cart for the user
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
          cart = new Cart({ user: userId, fooditem: [] });
      }

      // Check if food item already exists in the cart
      const itemIndex = cart.fooditem.findIndex(item => item.items.toString() === id);

      if (itemIndex > -1) {
          // Update quantity
          cart.fooditem[itemIndex].quantity += quantity;
      } else {
          // Add new item to cart
          cart.fooditem.push({ items: id, quantity });
      }

      // Calculate total price
      let totalPrice = 0;
      for (let item of cart.fooditem) {
          const foodItem = await FoodItem.findById(item.items);
          totalPrice += foodItem.price * item.quantity;
      }
      cart.totalPrice = totalPrice;

      // Save updated cart
      await cart.save();

      res.status(200).json(cart);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

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


// const deleteFromCart = AsyncHandler(async(req, res)=>{

//     try {
//       const {id }= req.body
//       console.log("idd", id)
//       if(!id){
//           throw new ApiError(400, "empty id value")
//       }
//       console.log("id",id)
//       const user = req.user 
//       if(!user){
//           throw new ApiError(400, "user is not logged in")
  
//       }
//       const deleteitem = await Cart.findByIdAndDelete(id)
//       if(!deleteitem){
//         throw new ApiError(400, "item not found")
//       }
  
    
  
//       return res.status(200).json(new ApiResponse(200, {}, "cart deleted success"))
//     } catch (error) {
//       console.log("error", error)
//       throw new ApiError(400, "erro fetching ")
      
//     }

// })

const deleteFromCart = AsyncHandler(async (req, res) => {
  try {
      const { id } = req.body; // Assuming you are sending foodItemId in the request body
     

      if (!id) {
          throw new ApiError(400, "Empty food item ID value");
      }

      const user = req.user;
      if (!user) {
          throw new ApiError(400, "User is not logged in");
      }

      // Find the cart for the user and remove the specified food item
      const updatedCart = await Cart.findOneAndUpdate(
          { user: user._id },
          { $pull: { fooditem: { items: id } } },
          { new: true } // Return the updated cart
      ).populate('fooditem.items');

      if (!updatedCart) {
          throw new ApiError(404, "Cart not found or food item does not exist");
      }

      // Recalculate the total price
      const totalPrice = updatedCart.fooditem.reduce((total, cartItem) => {
          const foodItemPrice = cartItem.items.price || 0; // Get the price of the food item
          return total + foodItemPrice * cartItem.quantity; // Update the total price
      }, 0);

      // Update the total price in the cart
      updatedCart.totalPrice = totalPrice;
      await updatedCart.save(); // Save the updated cart

      return res.status(200).json(new ApiResponse(200, updatedCart, "Food item removed from cart and total price updated"));
  } catch (error) {
      console.error("Error deleting food item from cart:", error);
      throw new ApiError(500, "Error fetching cart");
  }
});


// const getCartItem = AsyncHandler(async (req, res) => {
//     try {
//       console.log("req.user", req.user)
//       const userId = req.user._id;
      
//       if (!userId) {
//         throw new ApiError(400, "error userId");
//       }
//       console.log(userId)
      
//       // Convert userId to ObjectId correctly
//       // const userObjectId = new mongoose.Types.ObjectId(userId);

  
     
  
//       // Return the result
      
//       const cartitems = await Cart.find({user:userId})
  
//       return res.status(200).json(new ApiResponse(200, cartitems, "success"));
  
//     } catch (error) {
//       console.error("Error calculating cart totals: ", error);
//       throw new Error("Failed to calculate cart totals");
//     }
//   });


const getCartItem = AsyncHandler(async (req, res) => {
  try {
      
      const userId = req.user._id;

      if (!userId) {
          throw new ApiError(400, "error userId");
      }
     

      // Find cart items and populate the fooditem details
      const cartItems = await Cart.find({ user: userId })
          .populate({
              path: 'fooditem.items', // The path to the items array in your schema
              model: 'FoodItem' // The model to populate from
          });

      return res.status(200).json(new ApiResponse(200, cartItems, "success"));
  } catch (error) {
      console.error("Error fetching cart items: ", error);
      throw new Error("Failed to fetch cart items");
  }
});



export {addToCart, deleteFromCart, getAllCartItem, getCartItem}