
import { adminjwt } from '../middleware/authadmin.middleware.js'
import express from 'express'
import { upload } from '../middleware/multer.middleware.js'
import { authjwt } from '../middleware/auth.middleware.js'
import { addFoodItem, getFoodItems,deleteFoodItems,updateFoodItems,getSingleItem,showSmilarProducts,adminGetall,gettimeFooditem } from '../collection/fooditems.collection.js'
const router = express.Router()


router.route('/add').post(adminjwt,upload.single('image'), addFoodItem)
router.route('/fooditems').post(getFoodItems)
router.route('/adminfood').get(adminjwt, adminGetall)
router.route('/time').get( gettimeFooditem)


router.route('/detail/:id').get(getSingleItem)
router.route('/show/:id').get(authjwt, showSmilarProducts)
router.route('/update/:id').patch(adminjwt,upload.single('image'), updateFoodItems)
router.route('/delete/:id').delete(adminjwt, deleteFoodItems)




export {router}

