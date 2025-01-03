import { AsyncHandler } from "../utils/AsyncHandler.js";
import { FoodItem } from "../models/foodItem.model.js";
import { ApiResponse } from "../utils/ResponseHandler.js";
import { ApiError } from "../utils/ErrorHandler.js";
import { isValidObjectId } from "mongoose";
import { uploadToCoudinary } from "../utils/CloudinaryUpload.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";

const addFoodItem = AsyncHandler(async (req, res) => {
  const { title, description, cusine, price, category } = req.body;
  console.log("reqbod", req.body);
  console.log("localimage", req.file);

  const admin = req.user;
  if (!admin) {
    throw new ApiError(400, "admin is not logged in");
  }
  if (price <= 0) {
    throw new ApiError(400, "price must be greater 0");
  }

  if (!title || !description || !price || !category || !cusine) {
    throw new ApiError(400, " all fields are required");
  }
  if (title.length < 3 || description.length < 3 || category.length < 3) {
    throw new ApiError(
      400,
      "all fields length should be more than 3 character"
    );
  }

  const nameRegex = /^[A-Za-z\s]+$/;

  if (
    !nameRegex.test(title) ||
    !nameRegex.test(description) ||
    !nameRegex.test(category)
  ) {
    throw new ApiError(400, "fields should contain only letters");
  }

  const categoryname = await Category.findOne({ name: category });
  if (!categoryname) {
    throw new ApiError(400, "category name is not present ");
  }

  const localImage = req.file.path;

  if (!localImage) {
    throw new ApiError(400, "local image path is not set");
  }

  const image = await uploadToCoudinary(localImage);
  if (!image.url) {
    throw new ApiError(400, "image url is not found in cloudinary");
  }

  const uploadfooditem = await FoodItem.create({
    title,
    description,
    cusine,
    price,
    category: categoryname._id,
    image: image.url,
  });

  const uploadedfooditem = await FoodItem.findById(uploadfooditem._id);
  if (!uploadedfooditem) {
    throw new ApiError(400, "file is not uploadted");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, uploadedfooditem, "success adding data"));
});
const gettimeFooditem = AsyncHandler(async (req, res) => {
  const currentTime = new Date().getHours(); // Get the current hour (0-23)
  console.log("current time", currentTime);

  let categoryId;

  // Define time ranges for different meals
  if (currentTime >= 5 && currentTime < 11) {
    // Morning (5 AM to 11 AM) -> Breakfast
    const category = await Category.findOne({ name: "breakfast" });
    console.log("category", category);
    categoryId = category ? category._id : null;
  } else if (currentTime >= 11 && currentTime < 17) {
    // Afternoon (11 AM to 5 PM) -> Lunch
    const category = await Category.findOne({ name: "lunch" });
    categoryId = category ? category._id : null;
  } else if (currentTime >= 17 && currentTime < 24) {
    // Evening (5 PM to 12 AM) -> Dinner
    const category = await Category.findOne({ name: "dinner" });
    categoryId = category ? category._id : null;
  } else {
    // Late Night / Early Morning (12 AM to 5 AM)
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { items: [], category: [] },
          "No meals available at this time"
        )
      );
  }

  console.log("idhaha", categoryId);
  let items = [];
  if (categoryId) {
    items = await FoodItem.find({ category: categoryId }).populate("category");
  } else {
    return res
      .status(400)
      .json(new ApiError(400, "No category found for the current time"));
  }

  // Fetch all categories to include in the response if needed
  const categories = await Category.find();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { items }, "Filtered food items by time of day")
    );
});

const getFoodItems = AsyncHandler(async (req, res) => {
  // const user = req.user
  // if(!user){
  //     throw new ApiError(400, "user not found")
  // }

  const { id } = req.body;

  let items;
  if (id) {
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(400, "cannot found category item with given id");
    }

    items = await FoodItem.find({ category: category._id }).populate(
      "category"
    );
  } else {
    items = await FoodItem.find().populate("category");
  }

  const category = await Category.find();
  // const foodItems = await FoodItem.find().populate('category')

  return res
    .status(200)
    .json(new ApiResponse(200, { items, category }, "getting all data"));
});

const getSingleItem = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "provided id is  not a vlaid object is");
  }

  const fooditem = await FoodItem.findById(id).populate("category");

  return res
    .status(200)
    .json(new ApiResponse(200, fooditem, "getting single data"));
});

const updateFoodItems = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description,cusine, price, category } = req.body;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "given id is not a valid object is");
  }
  if (price < 0) {
    throw new ApiError(400, "price must be greater then 0");
  }
  const admin = req.user;
  if (!admin) {
    throw new ApiError(400, "admin must be logged in");
  }
  const fooditems = await FoodItem.findById(id);
  if (!fooditems) {
    throw new ApiError(400, "food item not available");
  }

  let categoryname;
  if (category) {
    categoryname = await Category.findOne({ name: category });
    if (!categoryname) {
      throw new ApiError(400, "category name is not present");
    }
  }

  const localImage = req.file?.path;
  let image;

  if (localImage) {
    image = await uploadToCoudinary(localImage);
  }

  const updatedfooditem = await FoodItem.findByIdAndUpdate(
    id,
    {
      $set: {
        title: title || fooditems.title,
        description: description || fooditems.description,
        cusine: cusine || fooditems.cusine,
        price: price || fooditems.price,
        category: categoryname?._id || fooditems?.category,
        image: image?.url || fooditems.image,
      },
    },
    { new: true }
  );

  const getupdatedfooditem = await FoodItem.findById(updatedfooditem._id);
  if (!getupdatedfooditem) {
    throw new ApiError(400, " cannont get the value may be it is not updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, getupdatedfooditem, "food item updated success")
    );
});

const deleteFoodItems = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "provided id is not a valid object id");
  }

  const admin = req.user;

  if (!admin) {
    throw new ApiError(
      400,
      "admin must be logged in to perform delete operations"
    );
  }

  await FoodItem.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "fooditems deleted succes"));
});

const showSmilarProducts = AsyncHandler(async (req, res) => {
  // const user = req.user
  // if(!user){
  //   throw new ApiError(400, "user must be logged in")
  // }
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "given id is not a valid id");
  }

  const fooditem = await FoodItem.findById(id);

  if (!fooditem) {
    throw new ApiError(400, "cannot find food item with given id");
  }

  const category = fooditem.category;

  const similarFood = await FoodItem.find({
    category: category,
    _id: { $ne: id },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, similarFood, "success similar products"));
});

const adminGetall = AsyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "admin must be logged in");
  }

  const items = await FoodItem.find().populate("category");

  return res.status(200).json(new ApiResponse(200, items, "items get succes"));
});




const addtofavourate = AsyncHandler(async (req, res) => {
    const { id } = req.body;
    const user = req.user._id;
  
    if (!user) {
      throw new ApiError(400, "User must be logged in");
    }
  
    if (!id) {
      throw new ApiError(400, "Food item ID must be provided");
    }
  
    const fooditem = await FoodItem.findById(id);
    if (!fooditem) {
      throw new ApiError(400, "Food item not found");
    }
  
    
  
    // Add to favourites, avoiding duplicates
    const userFav = await User.findByIdAndUpdate(
      user,
      {
        $addToSet: {
          favourates: { fooditem: fooditem._id, addedAt: new Date() },
        },
      },
      { new: true }
    );
  
    if (!userFav) {
      throw new ApiError(404, "User not found");
    }
  
    // Fetch the updated user document with populated favourites
    const updatedUserFav = await User.findById(userFav._id).populate(
      "favourates.fooditem"
    );
  
    return res
      .status(200)
      .json(new ApiResponse(200, updatedUserFav, "Item added to favourites successfully"));
  });

const getFavourate = AsyncHandler(async (req, res) => {
    try {
      const user = req.user._id;
  
      if (!user) {
        throw new ApiError(400, "User must be logged in");
      }
  
      const userWithFavourites = await User.findById(user)
        .populate({
          path: "favourates.fooditem",
          model: "FoodItem"
        });

       
  
      if (!userWithFavourites) {
        throw new ApiError(404, "User not found");
      }
  
      // Sort favourites by 'addedAt' in descending order
      userWithFavourites.favourates.sort((a, b) => {
        return new Date(b.addedAt) - new Date(a.addedAt);
      });
  
      // Filter sensitive fields
      const { password, refreshToken, ...userData } = userWithFavourites.toObject();
      
      return res
        .status(200)
        .json(new ApiResponse(200, userData, "Favourite food items fetched successfully"));
    } catch (error) {
      console.error("Error fetching favourites:", error);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal Server Error"));
    }
  });


  const removeFavourate = AsyncHandler(async (req, res) => {
    const { id } = req.params; // The ID of the food item to remove
    const user = req.user._id;


    console.log("delete id", id)
  
    if (!user) {
      throw new ApiError(400, "User must be logged in");
    }
  
    const userFav = await User.findByIdAndUpdate(
      user,
      {
        $pull: { favourates: { fooditem: id } },
      },
      { new: true }
    );
  
    if (!userFav) {
      throw new ApiError(404, "User not found");
    }
  
    return res.status(200).json(new ApiResponse(200, userFav, "Item removed from favourites successfully"));
  });
  

// const recommendFav = AsyncHandler(async(req, res)=>{
//   try {
//     const user = req.user._id;

//     if (!user) {
//       throw new ApiError(400, "User must be logged in");
//     }

//     // Fetch user with favorites
//     const userWithFavourites = await User.findById(user)
//       .populate({
//         path: "favourates.fooditem",
//         model: "FoodItem"
//       });

//     if (!userWithFavourites) {
//       throw new ApiError(404, "User not found");
//     }

//     // Sort favorites by 'addedAt' in descending order to get the most recent one
//     userWithFavourites.favourates.sort((a, b) => {
//       return new Date(b.addedAt) - new Date(a.addedAt);
//     });

//     // Extract the most recent favorite food item
//     const mostRecentFavourite = userWithFavourites.favourates[0]?.fooditem;

//     if (!mostRecentFavourite) {
//       return res.status(200).json(new ApiResponse(200, [], "No favourites found"));
//     }

//     // Recommend similar food items based on the category of the most recent favorite
//     const recommendedFoodItems = await FoodItem.find({
//       _id: { $ne: mostRecentFavourite._id }, // Exclude the most recent favourite from recommendations
//       category: mostRecentFavourite.category, // Match food items with the same category
//     }).limit(5); // Limit to 5 recommended items (you can change this as needed)

//     // Filter sensitive fields
//     const { password, refreshToken, ...userData } = userWithFavourites.toObject();

//     return res.status(200).json(new ApiResponse(200, 
//     //   {
//     //   favourites: userData.favourates,
//     //   mostRecentFavourite,
//     //   recommendedFoodItems,
//     // }
//     recommendedFoodItems
//     , "Favourite food items fetched successfully with recommendations"));
    
//   } catch (error) {
//     console.error("Error fetching favourites:", error);
//     return res
//       .status(500)
//       .json(new ApiResponse(500, null, "Internal Server Error"));
//   }
// })

const recommendFav = AsyncHandler(async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      throw new ApiError(400, "User must be logged in");
    }

    // Fetch user with favorites
    const userWithFavourites = await User.findById(user)
      .populate({
        path: "favourates.fooditem",
        model: "FoodItem"
      });

    if (!userWithFavourites) {
      throw new ApiError(404, "User not found");
    }

    // Sort favorites by 'addedAt' in descending order to get the most recent one
    userWithFavourites.favourates.sort((a, b) => {
      return new Date(b.addedAt) - new Date(a.addedAt);
    });

    // Extract the most recent favorite food item
    const mostRecentFavourite = userWithFavourites.favourates[0]?.fooditem;

    if (!mostRecentFavourite) {
      return res.status(200).json(new ApiResponse(200, [], "No favourites found"));
    }

    // Recommend similar food items based on the cuisine of the most recent favorite
    const recommendedFoodItems = await FoodItem.find({
      _id: { $ne: mostRecentFavourite._id }, // Exclude the most recent favourite from recommendations
      cusine: mostRecentFavourite.cusine, // Match food items with the same cuisine
    }).limit(5); // Limit to 5 recommended items (you can change this as needed)

    // Filter sensitive fields
    const { password, refreshToken, ...userData } = userWithFavourites.toObject();

    return res.status(200).json(new ApiResponse(200,
      recommendedFoodItems,
      "Favourite food items fetched successfully with recommendations"
    ));

  } catch (error) {
    console.error("Error fetching favourites:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
});



const addRating = AsyncHandler(async(req, res)=>{
  const {id} = req.params
  const {rating} = req.body
  const userId = req.user._id

  if(!userId){
    throw new ApiError(400, "user not logged in to rate item")
  }

 try {
   const fooditem = await FoodItem.findById(id)
   if(!fooditem){
     throw new ApiError(400, "food item is not valid")
   }
 
   const existanceRating = fooditem.rating.find(r=>r.user.toString() === userId.toString())
 
   if(existanceRating){
     existanceRating.rating = rating
   }
   else{
     fooditem.rating.push({user:userId, rating})
   }
 
   await fooditem.save()

   const userrating = fooditem.rating.find(r=>r.user.toString() === userId.toString())

 
 
   return res
         .status(200)
         .json(new ApiResponse(200, {fooditem ,userrating}, "rating added success successfully"));
 } catch (error) {

  throw new ApiError(400, "cannot add the rating")

  
 }


})
  

export {
  addFoodItem,
  getFoodItems,
  updateFoodItems,
  deleteFoodItems,
  getSingleItem,
  showSmilarProducts,
  getFavourate,
  adminGetall,
  gettimeFooditem,
  addtofavourate,
  removeFavourate,
  recommendFav,
  addRating
};
