import express from 'express'
import { adminjwt } from '../middleware/authadmin.middleware.js'
import { authjwt } from '../middleware/auth.middleware.js'
import { addCategory, displayCategory, updateCategory, deleteCategory } from '../collection/category.collection.js'
const router = express.Router()

router.route('/add').post(addCategory)
router.route('/display').get(displayCategory)
router.route('/update/:id').patch(adminjwt, updateCategory)
router.route('/delete/:id').delete(adminjwt, deleteCategory)



export default router