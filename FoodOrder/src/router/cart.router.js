import express from 'express'
import { addToCart, deleteFromCart,getAllCartItem,getCartItem } from '../collection/cart.collection.js'
import { authjwt } from '../middleware/auth.middleware.js'
const router = express.Router()

router.route('/all').get(authjwt, getAllCartItem)
router.route('/add').post(authjwt,addToCart)
router.route('/delete').post(authjwt, deleteFromCart)
router.route('/get').get(authjwt, getCartItem)



export default router