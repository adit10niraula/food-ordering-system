import React from 'react'
import './singleproduct.css'
import { useSelector } from 'react-redux'

const SingleProduct = ({item, handleDetail}) => {


  
  return (
    <div>
        <div className="single-product-container">
            <div className="single-image"> 
            <img src={item?.image} alt="" />

            </div>
            <div className="product-info">

            <div className="title-price">
                <p className='title'>{item?.title}</p>
                <p className='price'>Rs. {item?.price}</p>
            </div>
            <p className='categroy'>{item?.category?.name}</p>
            <p className='description'>{item?.description}</p>

            
            <button onClick={()=>handleDetail(item?._id)}>detail</button>
            </div>
        </div>
      
    </div>
  )
}

export default SingleProduct
