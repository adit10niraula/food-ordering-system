import React, { useEffect, useState } from 'react'
import UserContainer from '../../components/containers/UserContainer'
import { useSelector,useDispatch } from 'react-redux'
import { allFooditems } from '../../actions/fooditemAction'
import ProductList from '../../components/product/ProductList'
import { getAllCategory } from '../../actions/fooditemAction'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../actions/cartAction'
import { addtofavourate } from '../../actions/fooditemAction'

const Products = () => {
    const navigate = useNavigate()
    const [categoryid, setcategoryid] = useState("")
   
    const dispatch = useDispatch()
    const getfooditem = useSelector((state)=> state.fooditems)
    const {fooditem, loading, error } = getfooditem

    const {userInfo} = useSelector((state)=> state.userLogin)

    const {category} = useSelector((state)=> state.getallcategory)

    // if(!userInfo){
    //     navigate('/login')
    // }
    

    useEffect(()=>{
        dispatch(allFooditems())
        dispatch(getAllCategory())

    },[dispatch])

    const handlecategoryItem = (id)=>{
        setcategoryid(id)

        dispatch(allFooditems(id))
        
    }
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
          navigate('/fav')
      }
      }

    const displayitem = categoryid ? fooditem && fooditem.filter((item)=> item.category._id === categoryid):
    fooditem && fooditem;

  
 

  
       
    console.log("dipalay item",displayitem)
  return (
    <UserContainer>
    <div>
        
        <div className="product-search-buttons">
            <h1 style={{paddingBottom:"20px"}}>Are You Hungry Here We Got Delicious Food !</h1>
           
        <div className='handle_button_search'>
            <button onClick={()=> handlecategoryItem(null)}>all</button>
            {category && category.map((items)=>(
                <button key={items._id} onClick={()=>handlecategoryItem(items._id)}>{items.name}</button>
            ))}
            
         
            
        </div>
        </div>
        

        <div className="all-products">
            <ProductList fooditem={displayitem} handleAddToCart={handleAddToCart} addToFavourate={addToFavourate}/>


        </div>
      
    </div>
    </UserContainer>
  )
}

export default Products
