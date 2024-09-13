import React, { useEffect, usesimilarerrorEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fooditemdetail } from '../../actions/fooditemAction'
import ProductDetail from '../../components/product/ProductDetail'
import ProductList from '../../components/product/ProductList'
import { fooditemSimilar } from '../../actions/fooditemAction'
import { addToCart } from '../../actions/cartAction'
import UserContainer from '../../components/containers/UserContainer'


const Detail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const singlefooditem = useSelector((state)=> state.fooditemDetail)
    const similarfood = useSelector((state)=> state.similarFooditems)

    const {similarfooditem, loading: similarloading, error:similarerror } = similarfood
   

    const {fooditem, loading, error} = singlefooditem

   

    useEffect(()=>{
        dispatch(fooditemdetail(id))
        dispatch(fooditemSimilar(id))

    },[dispatch,id])

    const handleAddToCart = (id)=>{
        dispatch(addToCart(id))
        alert("added to cart")
        
    }
  return (
    <UserContainer>
    <div className='detail-container'>
        

        <div className="detail-fooditems">
        {loading && <p>loading ... </p>}
        {error && <p>{error}</p>}
            <ProductDetail fooditem={fooditem}  handleAddToCart={handleAddToCart}/>

        

        </div>
        <hr />

        

        <div className="similar-fooditems">

            <h1>similar products</h1>
            {similarloading && <p> loading ...</p>}
            {similarerror && <p> error ....</p>}

            <ProductList fooditem={similarfooditem}/>


        </div>
        

      
    </div>
    </UserContainer>
  )
}

export default Detail
