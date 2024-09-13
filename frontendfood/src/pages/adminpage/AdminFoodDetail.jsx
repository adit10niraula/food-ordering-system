import React, { useEffect } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { adminFoodDetail } from '../../actions/adminAction'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetail from '../../components/product/ProductDetail'
import AdminProductDetail from '../../components/adminproduct/AdminProductDetail'
import { foodItemDetailDelete } from '../../actions/adminAction'

const AdminFoodDetail = () => {
    const navigate = useNavigate()
    const dispatch =   useDispatch()
    const {id }= useParams()
    const {admindetail, loading, error} = useSelector((state)=> state.adminfooditemdetail)
    

    useEffect(()=>{
        dispatch(adminFoodDetail(id))
        

    },[])

    const handleEdit = (id)=>{
        navigate(`edit/${id}`)
    }
    const handledelete = (id)=>{
        dispatch(foodItemDetailDelete(id))
        alert('item deleted success')
        navigate('/admin/fooditem')
    }
  return (
    <AdminContainer>
    <div>
        
        {admindetail && <AdminProductDetail fooditem={admindetail} handleEdit={handleEdit} handledelete={handledelete}/>}
      
    </div>
    </AdminContainer>
  )
}

export default AdminFoodDetail
