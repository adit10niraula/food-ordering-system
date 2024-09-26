import { isValidObjectId } from "mongoose";
import { Category } from "../models/category.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ErrorHandler.js";
import { ApiResponse } from "../utils/ResponseHandler.js";


const addCategory = AsyncHandler(async(req, res)=>{
    const {name} = req.body
    if(!name){
        throw new ApiError(400, "name is required")
    }
    // const admin = req.user
    // if(!admin){
    //     throw new ApiError(400, "admin is not logged in")
    // }
    const getcategory = await Category.find({name:name})
    console.log("get category", getcategory)
    if(getcategory.length > 0){
        throw new ApiError(400, "category already exist")
    }

    const create = await Category.create({
        name
    })

    const category = await Category.findById(create._id)
    if(!category){
        throw new ApiError(400, "category is not created")
    }


    return res.status(200).json(new ApiResponse(200, category, "category added success"))
})

const displayCategory = AsyncHandler(async(req, res)=>{

    const category = await Category.find()

    return res.status(200).json(new ApiResponse(200, category, "success display category"))
})

const updateCategory = AsyncHandler(async(req, res)=>{
    const {id} = req.params
    const {name} = req.body
    const admin = req.user
    if(!admin){
        throw new ApiError(400, "admin must be logged in")
    }
    const existance = await Category.findById(id)
    if(!existance){
        throw new ApiError(400, "id is not present in category")
    }
    const getcategory = await Category.find({name:name})

    if(getcategory.length > 0){
        throw new ApiError(400, "category already exist")
    }

    const categoryname = await Category.findByIdAndUpdate(id,{
        $set: {
            name: name || existance.name
        }
    }, {new:true})
    const category = await Category.findById(categoryname._id)

    return res.status(200).json(new ApiResponse(200,category, "category updated success" ))
})

const deleteCategory = AsyncHandler(async(req, res)=>{
    const {id} = req.params
    if(!isValidObjectId(id)){
        throw new ApiError(400 , "provided id is not a valid object id")
    }
    const admin = req.user
    if(!admin){
        throw new ApiError(400, "admin must be logged in to delete request")
    }

    await Category.findByIdAndDelete(id)

    return res.status(200).json(new ApiResponse(200, {}, "category deleted success "))

    
})

export {addCategory, displayCategory, updateCategory,deleteCategory}