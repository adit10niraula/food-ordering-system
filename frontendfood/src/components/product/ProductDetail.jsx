import React from 'react'
import { useSelector } from 'react-redux'
import './singleproduct.css'


const ProductDetail = ({fooditem, handleAddToCart}) => {
  const {loading, error} = useSelector((state)=> state.FoodItemDetailDelete)





  return (
    <div>

{ fooditem && <div className="detail-item">
            <div className="detail-fooditem">
                <div className="detail-image">

                <img src={fooditem?.image} alt="" />
                </div>
                <div className="detail-desc">
                    <p className='title'>{fooditem?.title}</p>
                    <p className='description'>{fooditem?.description}</p>
                    <p className='category'>{fooditem?.category?.name}</p>
                    <p className='price'>Rs. {fooditem?.price}</p>
                    <button onClick={()=>handleAddToCart(fooditem?._id)}>add to cart</button> 
                    
                </div>
                

            </div>
            {error && <p>{error}</p>}
            
        </div>}
      
    </div>
  )
}

export default ProductDetail
