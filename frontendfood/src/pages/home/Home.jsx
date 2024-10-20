import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allFooditems } from '../../actions/fooditemAction'
import ProductList from '../../components/product/ProductList'
import UserContainer from '../../components/containers/UserContainer'
import { specialFoodItems } from '../../actions/fooditemAction'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { recommendfavourate } from '../../actions/fooditemAction'
import { addToCart } from '../../actions/cartAction'
import { addtofavourate } from '../../actions/fooditemAction'

const Home = () => {

  // const [fooditem, setfooditem] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getfooditem = useSelector((state)=> state.fooditems)
  const getuserinfo = useSelector((state)=> state.userLogin)
  const {userInfo} = getuserinfo
  const {fooditem, loading, error } = getfooditem
  const {recommendfav} = useSelector((state)=> state.recommendfavfood)

  const specialfood = useSelector((state)=> state.specialfooditem)
  const {specialitem} = specialfood
  let specialfooditem;
  if(specialitem){
    specialfooditem = specialitem.items
  }


  // if(!userInfo){
  //   navigate('/login')
  // }

  console.log("recomm fav food", recommendfav)
  console.log("fod", fooditem)

  useEffect(()=>{
    dispatch(allFooditems())
    dispatch(specialFoodItems())
    dispatch(recommendfavourate())

  },[])

  const handleAddToCart = (id)=>{
    if(!userInfo){
    navigate('/login')
}else{
    dispatch(addToCart(id))
    alert("added to cart")
}
    
}


const addToFavourate = (id)=>{
  if(!userInfo){
    navigate('/login')
}else{
    
    dispatch(addtofavourate(id))
    alert("added to cart")
}
}
  return (
    <UserContainer>
    <div className='home-container'>
      
        
        <div className="food-cover-image">
          <img src="/foodbug.png" alt="" />
          <div className="food-cover-desc">
          We provide you with healthy food items at convenient prices <br />
          <button> <Link className='link' to="/product">shop now</Link></button>
          </div>
        </div>

        <h1>Today special !!</h1>
        
        <div className="home-fooditems">
         
          <ProductList fooditem={specialfooditem} handleAddToCart={handleAddToCart} addToFavourate={addToFavourate}/>

          
        
      </div>

    { recommendfav && recommendfav.length>0 &&
    <>
      <h1>Recommendation</h1> 
      
      <ProductList fooditem={recommendfav} handleAddToCart={handleAddToCart} addToFavourate={addToFavourate}/>

      </>
    }
      
    </div>
    </UserContainer>
  )
}

export default Home
