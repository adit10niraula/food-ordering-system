import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allFooditems } from '../../actions/fooditemAction'
import ProductList from '../../components/product/ProductList'
import UserContainer from '../../components/containers/UserContainer'
import { specialFoodItems } from '../../actions/fooditemAction'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Home = () => {

  // const [fooditem, setfooditem] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getfooditem = useSelector((state)=> state.fooditems)
  const getuserinfo = useSelector((state)=> state.userLogin)
  const {userInfo} = getuserinfo
  const {fooditem, loading, error } = getfooditem

  const specialfood = useSelector((state)=> state.specialfooditem)
  const {specialitem} = specialfood
  let specialfooditem;
  if(specialitem){
    specialfooditem = specialitem.items
  }


  // if(!userInfo){
  //   navigate('/login')
  // }

  console.log("specialfooditem", specialfooditem)
  console.log("fod", fooditem)

  useEffect(()=>{
    dispatch(allFooditems())
    dispatch(specialFoodItems())

  },[])
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
          <ProductList fooditem={specialfooditem}/>
          
        
      </div>
      
    </div>
    </UserContainer>
  )
}

export default Home
