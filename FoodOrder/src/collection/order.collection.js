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

    const result = await Cart.aggregate([
      { $match: { user: userObjectId } },

      {
        $lookup: {
          from: "fooditems", // Collection name in MongoDB
          localField: "fooditem",
          foreignField: "_id",
          as: "foodDetails",
        },
      },

      // Unwind the foodDetails array to work with individual objects
      { $unwind: "$foodDetails" },

      // Project the necessary fields and calculate total price for each item
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

    // Return the result
    const results =
      result.length > 0 ? result[0] : { totalPrice: 0, totalQuantity: 0 };
  

    if (results.totalPrice <= 0) {
      throw new ApiError(400, "please add to cart some item");
    }

    const uuid = uuidv4();
   

    const message = `total_amount=${results.totalPrice},transaction_uuid=${uuid},product_code=EPAYTEST`;

    const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET);

    const hashinBase64 = CryptoJS.enc.Base64.stringify(hash);

    

    const output = {
      results: results,
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

const createOrder = AsyncHandler(async (req, res) => {
  try {

    const user = req.user;
    
    if (!user) {
      throw new ApiError(400, "user is not logged in");
    }

    const cartitem = await Cart.find({user:user._id})
    
    const userId = new mongoose.Types.ObjectId(user._id);
   
    const data = req.query.data;

    if (!data) {
      return res
        .status(400)
        .json({ message: "Data query parameter is required" });
    }
    const decodeString = Buffer.from(data, "base64").toString("utf-8");

    try {
      const parsedata = JSON.parse(decodeString);
     

      const cart = await Cart.find({ user: user._id })
      
      const { address } = await User.findById(user._id);
      if(!address){
        throw new ApiError(400, "no address")
      }

      
      if (cart.length === 0 ) {
        throw new ApiError(400, "cart is empty");
      }

      try {
        const order = await Order.create({
          cartitem: cart?.map((item) => item._id),
          user: user._id,
          totalprice: parsedata.total_amount,
          address: address,
          paymentStatus: "Paid",
          transactionCode: parsedata.transaction_code,
        });

        const getorder = await Order.findById(order._id);
        if (!getorder) {
          throw new ApiError(400, "order is not created");
        }

        await Cart.deleteMany({ user: user._id });

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { parsedata, order, getorder },
              "Order added to cart successfully"
            )
          );
      } catch (modelerror) {
        throw new ApiError(400, "invalid model");
      }
    } catch (jsonerror) {
      throw new ApiError(400, "invalid json");
    }
  } catch (error) {
    console.error("Error decoding data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAdminOrder = AsyncHandler(async (req, res) => {
  const user = req.user;
 
  // if (!user) {
  //   throw new ApiError(400, "admin must be logged in to contiue");
  // }

  // let orders
  // try {
  //   orders = await Order.aggregate([
  //     {
  //       $match: {
  //         _id: new mongoose.Types.ObjectId("66bb789a9dbdf96e7ed4567a"), // Replace with your order ID
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "carts", // Name of the Cart collection
  //         localField: "cartitem",
  //         foreignField: "_id",
  //         as: "allcartitems",
  //       },
  //     },
  // {
  //   $unwind: "$allcartitems",
  // },
  // {
  //   $lookup: {
  //     from: "fooditems", // Name of the FoodItem collection
  //     localField: "allcartitems.fooditem",
  //     foreignField: "_id",
  //     as: "fooddetails",
  //   },
  // },
  // {
  //   $unwind: "$fooddetails",
  // },
  // {
  //   $group: {
  //     _id: "$_id",
  //     cartitem: { $push: "$allcartitems" },
  //     fooddetails: { $push: "$fooddetails" },
  //     user: { $first: "$user" },
  //     totalprice: { $first: "$totalprice" },
  //     address: { $first: "$address" },
  //     paymentStatus: { $first: "$paymentStatus" },
  //     transactionCode: { $first: "$transactionCode" },
  //     createdAt: { $first: "$createdAt" },
  //     updatedAt: { $first: "$updatedAt" },
  //   },
  // },
  // ]);

  // } catch (error) {
  //   console.log("Error finding aggregation:", error);
  //   throw new ApiError(400, "Error finding aggregation");
  // }

  const orders = await Order.find().populate("user");

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "got all order success"));
});

export { getAllOrder, addPaymentmethod, createOrder, getAdminOrder };
