import React from 'react'
import { useSelector } from 'react-redux'
import './singleproduct.css'


const ProductDetail = ({fooditem, handleAddToCart}) => {
  const {loading, error} = useSelector((state)=> state.FoodItemDetailDelete)



  const avgrating = fooditem?.rating?.reduce((acc, curr)=> acc + curr?.rating, 0)/ fooditem?.rating?.length || 0






  return (
    <div>

{ fooditem && <div className="detail-item">
            <div className="detail-fooditem">
                <div className="detail-image">

                <img src={fooditem?.image} alt="" />
                </div>
                <div className="detail-desc">
                    <p className='title'>title: {fooditem?.title}</p>
                    <p className='description'>description: {fooditem?.description}</p>
                    <p className='category'>category: {fooditem?.category?.name}</p>
                    <p className='cusine'>cusine:  {fooditem?.cusine}</p>
                    <p className='price'>price: Rs. {fooditem?.price}</p>
                    <p className='rating'>rating:  {avgrating.toFixed(1)}</p>
                    <p className='rating'>rating by:  {fooditem?.rating?.length} people</p>
                    

                    <button onClick={()=>handleAddToCart(fooditem?._id)}>add to cart</button> 
                    
                </div>
                

            </div>
            {error && <p>{error}</p>}
            
        </div>}
      
    </div>
  )
}

export default ProductDetail
