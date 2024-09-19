import React, { useEffect } from 'react'
import SingleProduct from './SingleProduct'
import './singleproduct.css'

import { useNavigate } from 'react-router-dom'

const ProductList = ({fooditem,handleAddToCart}) => {
    const navigate = useNavigate()
 
 

    const handleDetail = (id)=>{

      

        navigate(`detail/${id}`)
      
          
          
      }
    
    
  return (
    <div className='productlist-container'>
        { fooditem && fooditem.map((item)=>(
          <SingleProduct key={item._id} item={item} handleDetail={handleDetail} handleAddToCart={handleAddToCart}/>
        ))}
      
    </div>
  )
}

export default ProductList
