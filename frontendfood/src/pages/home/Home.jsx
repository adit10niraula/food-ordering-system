import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allFooditems } from '../../actions/fooditemAction'
import ProductList from '../../components/product/ProductList'
import UserContainer from '../../components/containers/UserContainer'
import { specialFoodItems } from '../../actions/fooditemAction'
import './home.css'

const Home = () => {

  // const [fooditem, setfooditem] = useState(null)
  const dispatch = useDispatch()

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
          <img src="/foodburger.jpeg" alt=""  style={{width: "100%", height:"90vh", objectFit:"cover"}}/>
        </div>

        <h1>Today special !!</h1>
        {userInfo ?
        <div className="home-fooditems">
          <ProductList fooditem={specialfooditem}/>
          
        
      </div> : <p>user must be logged in</p>
        
      }
        
      
    </div>
    </UserContainer>
  )
}

export default Home
