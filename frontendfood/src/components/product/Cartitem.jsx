import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Cartitem = ({items,handleCartDelete}) => {
    
  console.log("items",items?.items?.title)
  
  return (
    <div className='cart-item-component'>
        <div className="cartimage">
            <img src={items?.items?.image} alt="" />
        </div>
        <div className="cart-item-detail">
            <p className='title'>{items?.items?.title}</p>
            <p className='description'>{items?.items?.description}</p>
            <p className='price'>{items?.items?.price}</p>
            <p className='quantity'>{items?.quantity}</p>
        <button onClick={()=> handleCartDelete(items?.items?._id)}>delete</button>
        </div>


    
    </div>
  )
}

export default Cartitem
