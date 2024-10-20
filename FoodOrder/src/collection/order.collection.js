import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ErrorHandler.js";
import { ApiResponse } from "../utils/ResponseHandler.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import atob from "atob";
import { User } from "../models/user.model.js";
import { compareSync } from "bcrypt"

const getAllOrder = AsyncHandler(async (req, res) => {
  try {
    const user = req.user._id;
    

    if (!user) {
      throw new ApiError(400, "user must be logged in");
    }

    const userObjectId = new mongoose.Types.ObjectId(user);

    const result = await Cart.aggregate([
      {
        $match: {
          user: userObjectId,
        },
      },
      {
        $lookup: {
          from: "fooditems", // Collection name in MongoDB
          localField: "fooditem",
          foreignField: "_id",
          as: "foodDetails",
        },
      },
      { $unwind: "$foodDetails" },
      {
        $project: {
          _id: 0,
          price: { $multiply: ["$quantity", "$foodDetails.price"] },
          quantity: "$quantity",
        },
      },

      // Group by null to calculate the overall total price and quantity
      {
        $group: {
          _id: userObjectId,
          totalPrice: { $sum: "$price" },
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);
    const results =
      result.length > 0 ? result[0] : { totalPrice: 0, totalQuantity: 0 };

    const cartitem = await Cart.find({ user: user }).populate("fooditem");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { cartitem, results },
          "all cart items are obtained success"
        )
      );
  } catch (error) {
    console.error("Error in getAllOrder:", error);
    next(new ApiError(500, "Internal Server Error ...."));
  }
});

const addPaymentmethod = AsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(400, "error userId");
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const cart = await Cart.findOne({user:userId})
    const totalPrice = cart.totalPrice
    
 
    const uuid = uuidv4();
   

    const message = `total_amount=${totalPrice},transaction_uuid=${uuid},product_code=EPAYTEST`;

    const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET);

    const hashinBase64 = CryptoJS.enc.Base64.stringify(hash);

    

    const output = {
      totalPrice:totalPrice,
      signature: hashinBase64,
      uuid: uuid,
      userId: userObjectId,
    };

    return res.status(200).json(new ApiResponse(200, output, "success"));
  } catch (error) {
    console.error("Error calculating cart totals: ", error);
    throw new Error("Failed to calculate cart totals");
  }
});

// const createOrder = AsyncHandler(async (req, res) => {
//   try {

//     const user = req.user;
    
//     if (!user) {
//       throw new ApiError(400, "user is not logged in");
//     }

//     const cartitem = await Cart.find({user:user._id})
    
//     const userId = new mongoose.Types.ObjectId(user._id);
   
//     const data = req.query.data;

//     if (!data) {
//       return res
//         .status(400)
//         .json({ message: "Data query parameter is required" });
//     }
//     const decodeString = Buffer.from(data, "base64").toString("utf-8");

//     try {
//       const parsedata = JSON.parse(decodeString);
     

//       const cart = await Cart.find({ user: user._id })
      
//       const { address } = await User.findById(user._id);
//       if(!address){
//         throw new ApiError(400, "no address")
//       }

      
//       if (cart.length === 0 ) {
//         throw new ApiError(400, "cart is empty");
//       }

//       try {
//         const order = await Order.create({
//           cartitem: cart?.map((item) => item._id),
//           user: user._id,
//           totalprice: parsedata.total_amount,
//           address: address,
//           paymentStatus: "Paid",
//           transactionCode: parsedata.transaction_code,
//         });

//         const getorder = await Order.findById(order._id);
//         if (!getorder) {
//           throw new ApiError(400, "order is not created");
//         }

//         await Cart.deleteMany({ user: user._id });

//         return res
//           .status(200)
//           .json(
//             new ApiResponse(
//               200,
//               { parsedata, order, getorder },
//               "Order added to cart successfully"
//             )
//           );
//       } catch (modelerror) {
//         throw new ApiError(400, "invalid model");
//       }
//     } catch (jsonerror) {
//       throw new ApiError(400, "invalid json");
//     }
//   } catch (error) {
//     console.error("Error decoding data:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });


// const createOrder = AsyncHandler(async (req, res) => {
//   try {
//     const user = req.user;

//     if (!user) {
//       throw new ApiError(400, "User is not logged in");
//     }

//     // Retrieve cart items for the user
//     const cart = await Cart.findOne({ user: user._id }).populate('fooditem.items');

//     if (!cart || cart.fooditem.length === 0) {
//       throw new ApiError(400, "Cart is empty");
//     }

//     // Ensure user has an address
//     const { address } = await User.findById(user._id);
//     if (!address) {
//       throw new ApiError(400, "No address found for user");
//     }

//     // Decode data from the query parameter
//     const data = req.query.data;
//     if (!data) {
//       return res.status(400).json({ message: "Data query parameter is required" });
//     }
//     const decodeString = Buffer.from(data, "base64").toString("utf-8");

//     try {
//       // Parse decoded data
//       const parsedata = JSON.parse(decodeString);

//       // Create a new order
//       const order = await Order.create({
//         cartitem: cart.fooditem.map((item) => ({
//           fooditem: item.items,
//           quantity: item.quantity,
//         })),
//         user: user._id,
//         totalprice: parsedata.total_amount,
//         address: address,
//         paymentStatus: "Paid",
//         transactionCode: parsedata.transaction_code,
//       });

//       // Populate the order with food item details
//       const getOrder = await Order.findById(order._id).populate('cartitem.fooditem');
//       if (!getOrder) {
//         throw new ApiError(400, "Order was not created");
//       }

//       // Delete user's cart items
//       await Cart.deleteMany({ user: user._id });

//       // Respond with the created order including food item details
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { order: getOrder },
//             "Order created successfully"
//           )
//         );

//     } catch (jsonError) {
//       throw new ApiError(400, "Invalid JSON data");
//     }
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

const createOrder = AsyncHandler(async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiError(400, "User is not logged in");
    }

    // Retrieve cart items for the user
    const cart = await Cart.findOne({ user: user._id }).populate('fooditem.items');

    if (!cart || cart.fooditem.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }

    // Ensure user has an address
    const { address } = await User.findById(user._id);
    if (!address) {
      throw new ApiError(400, "No address found for user");
    }

    // Decode data from the query parameter
    const data = req.query.data;
    if (!data) {
      return res.status(400).json({ message: "Data query parameter is required" });
    }
    const decodeString = Buffer.from(data, "base64").toString("utf-8");

    try {
      // Parse decoded data
      const parsedata = JSON.parse(decodeString);

      // Create a new order
      const order = await Order.create({
        cartitem: cart.fooditem.map((item) => ({
          fooditem: item.items,
          quantity: item.quantity,
        })),
        user: user._id,
        totalprice: parsedata.total_amount,
        address: address,
        paymentStatus: "Paid",
        transactionCode: parsedata.transaction_code,
      });

      // Populate the nested path to get the full details of food items
      const getOrder = await Order.findById(order._id).populate({
        path: 'cartitem.fooditem', // Populate `fooditem` in `cartitem`
        model: 'FoodItem',         // Specify the model for better accuracy
      });

      if (!getOrder) {
        throw new ApiError(400, "Order was not created");
      }

      // Delete user's cart items
      await Cart.deleteMany({ user: user._id });

      // Respond with the created order including food item details
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { order: getOrder },
            "Order created successfully"
          )
        );

    } catch (jsonError) {
      throw new ApiError(400, "Invalid JSON data");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



// const getAdminOrder = AsyncHandler(async (req, res) => {
//   const admin = req.user;
 

//   const orders = await Order.find().populate("user").sort({ createdAt: -1 });

//   return res
//     .status(200)
//     .json(new ApiResponse(200, orders, "got all order success"));
// });

const getAdminOrder = AsyncHandler(async (req, res) => {
  const admin = req.user;

  const orders = await Order.find()
    .populate("user")
    .populate({
      path: "cartitem.fooditem",
      model: "FoodItem"
    })
    .sort({ createdAt: -1 });



 

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "got all orders successfully"));
});


const deleteOrder = AsyncHandler(async(req, res)=>{
  const {id} = req.params

  if(!id){
    throw new ApiError(400, "id value is empty")
  }

  const admin = req.user
  if(!admin){
      throw new ApiError(400, "admin must be logged in")
  }

  try {
    
    
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      console.error("order not found with ID:", id);
      throw new ApiError(404, "order not found");
    }
    
    return res.status(200).json(new ApiResponse(200, {}, "order deleted successfully"));
  } catch (error) {
    console.error("Error deleting order:", error.message);
    throw new ApiError(500, "Internal Server Error");
  }

})

const UserOrder = AsyncHandler(async(req, res)=>{
  const user = req.user
 

  if(!user){
    throw new ApiError(400, "user not logged in")
  }

  const order = await Order.find({user:user._id}).populate({path:"cartitem.fooditem", model:"FoodItem"}).sort({createdAt: -1})

  
  if(!order){
    return res.status(200).json(200, {}, "no order found")
  }
  return res.status(200).json(new ApiResponse(200, order, "order fetch success"))
})




const updateOrderStatus = AsyncHandler(async (req, res) => {
  const { status } = req.body;
  console.log("req status 44444444444444444",status)
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;
    await order.save();
    res.json({ message: 'Order status updated successfully' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});




export { getAllOrder, addPaymentmethod, createOrder, getAdminOrder,deleteOrder, UserOrder,updateOrderStatus };
