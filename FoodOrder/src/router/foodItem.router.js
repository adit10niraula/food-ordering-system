
import { adminjwt } from '../middleware/authadmin.middleware.js'
import express from 'express'
import { upload } from '../middleware/multer.middleware.js'
import { authjwt } from '../middleware/auth.middleware.js'
import { addFoodItem, getFoodItems,deleteFoodItems,updateFoodItems,getSingleItem,showSmilarProducts,
    adminGetall,gettimeFooditem,addtofavourate,getFavourate,removeFavourate,recommendFav,addRating } from '../collection/fooditems.collection.js'
const router = express.Router()


router.route('/add').post(adminjwt,upload.single('image'), addFoodItem)
router.route('/fooditems').post(getFoodItems)
router.route('/adminfood').get(adminjwt, adminGetall)
router.route('/time').get( gettimeFooditem)
router.route('/fav').post(authjwt, addtofavourate)
router.route('/getfav').get(authjwt, getFavourate)
router.route('/remove/:id').delete(authjwt, removeFavourate)
router.route('/recommend').get(authjwt, recommendFav)
router.route('/rating/:id').post(authjwt, addRating)


router.route('/detail/:id').get(getSingleItem)
router.route('/show/:id').get(showSmilarProducts)
router.route('/update/:id').patch(adminjwt,upload.single('image'), updateFoodItems)
router.route('/delete/:id').delete(adminjwt, deleteFoodItems)





export {router}

