import React, { useEffect } from 'react'

import AdminSingleProduct from './AdminSingleProduct'
import { useNavigate } from 'react-router-dom'

const AdminProductList = ({fooditem}) => {
    const navigate = useNavigate()
 
 

    const handleDetail = (id)=>{

      

        navigate(`/admin/fooditem/detail/${id}`)
      
          
          
      }
    
    
  return (
    <div className='productlist-container'>
        { fooditem && fooditem.map((item)=>(
          <AdminSingleProduct key={item._id} item={item} handleDetail={handleDetail} />
        ))}
      
    </div>
  )
}

export default AdminProductList
