import express from 'express'
import { getAllOrder ,addPaymentmethod, createOrder, getAdminOrder, deleteOrder,UserOrder,updateOrderStatus} from '../collection/order.collection.js'
import { authjwt } from '../middleware/auth.middleware.js'
import { adminjwt } from '../middleware/authadmin.middleware.js'
const router = express.Router()


router.route('/all').get(authjwt, getAllOrder)
router.route('/payment').post(authjwt, addPaymentmethod)
router.route('/create').post(authjwt, createOrder)
router.route('/adminorder').get( getAdminOrder)
router.route('/userorder').get(authjwt, UserOrder)
router.route('/delete/:id').delete(adminjwt, deleteOrder)
router.route('/:id/status').put(updateOrderStatus);



export default router