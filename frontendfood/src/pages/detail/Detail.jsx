import React, { useEffect, usesimilarerrorEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fooditemdetail } from '../../actions/fooditemAction'
import ProductDetail from '../../components/product/ProductDetail'
import ProductList from '../../components/product/ProductList'
import { fooditemSimilar } from '../../actions/fooditemAction'
import { addToCart } from '../../actions/cartAction'
import UserContainer from '../../components/containers/UserContainer'
import { rateFoodItem } from '../../actions/fooditemAction'


const Detail = () => {
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0);
    const navigate = useNavigate()
    const {id} = useParams()
    const singlefooditem = useSelector((state)=> state.fooditemDetail)
    const similarfood = useSelector((state)=> state.similarFooditems)
    const {userInfo} = useSelector((state)=> state.userLogin)
    const {ratedfood} = useSelector((state)=>state.RateFoodItem)

    const userrating = ratedfood?.userrating?.rating
    console.log("ratedfood, ",userrating)
  

    const {similarfooditem, loading: similarloading, error:similarerror } = similarfood
   

    const {fooditem, loading, error} = singlefooditem

    console.log("single detail fooditem", fooditem)


    const currentUserRating = fooditem?.rating?.find(
      (r) => r.user === userInfo?._id
  )?.rating || 0


  
   

    useEffect(()=>{
        dispatch(fooditemdetail(id))
        dispatch(fooditemSimilar(id))

    },[dispatch,id,ratedfood])

    const handleAddToCart = (id)=>{
         if(!userInfo){
        navigate('/login')
    }else{
    
        dispatch(addToCart(id))
        alert("added to cart")}
        
    }


    const handleRatingSubmit = () => {
        dispatch(rateFoodItem(id, rating));
        console.log("submitting rating")
      };
  return (
    <UserContainer>
    <div className='detail-container'>
        

        <div className="detail-fooditems">
        {loading && <p>loading ... </p>}
        {error && <p>{error}</p>}
            <ProductDetail fooditem={fooditem}  handleAddToCart={handleAddToCart}/>

            <div>
      <h3>Rate this food item:</h3>
      <select value={rating}   onChange={(e) => setRating(Number(e.target.value))}>
        <option value={0}>{currentUserRating && currentUserRating ? currentUserRating : <p>Select rating</p>}</option>
        <option value={1}>1 - Poor</option>
        <option value={2}>2 - Fair</option>
        <option value={3}>3 - Good</option>
        <option value={4}>4 - Very Good</option>
        <option value={5}>5 - Excellent</option>
      </select>
      <button onClick={handleRatingSubmit}>Submit Rating</button>
    </div>

        

        </div>
        <hr />

        

        <div className="similar-fooditems">

            <h1>similar products</h1>
            {similarloading && <p> loading ...</p>}
            {similarerror && <p> error ....</p>}

            <ProductList fooditem={similarfooditem} handleAddToCart={handleAddToCart}/>


        </div>
        

      
    </div>
    </UserContainer>
  )
}

export default Detail
