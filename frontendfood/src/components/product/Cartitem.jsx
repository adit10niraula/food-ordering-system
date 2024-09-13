import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Cartitem = ({items,handleCartDelete}) => {
    

  
  return (
    <div className='cart-item-component'>
        <div className="cartimage">
            <img src={items?.fooditem?.image} alt="" />
        </div>
        <div className="cart-item-detail">
            <p className='title'>{items?.fooditem?.title}</p>
            <p className='description'>{items?.fooditem?.description}</p>
            <p className='price'>{items?.fooditem?.price}</p>
            <p className='quantity'>{items?.quantity}</p>
        <button onClick={()=> handleCartDelete(items?._id)}>delete</button>
        </div>


    
    </div>
  )
}

export default Cartitem
