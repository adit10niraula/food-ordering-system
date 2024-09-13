import express from 'express'
import { getAllOrder ,addPaymentmethod, createOrder, getAdminOrder} from '../collection/order.collection.js'
import { authjwt } from '../middleware/auth.middleware.js'
import { adminjwt } from '../middleware/authadmin.middleware.js'
const router = express.Router()


router.route('/all').get(authjwt, getAllOrder)
router.route('/payment').post(authjwt, addPaymentmethod)
router.route('/create').post(authjwt, createOrder)
router.route('/adminorder').get(adminjwt, getAdminOrder)


export default router