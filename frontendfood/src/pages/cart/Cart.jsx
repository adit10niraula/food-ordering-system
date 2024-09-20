import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCartItem } from '../../actions/cartAction'
import Cartitem from '../../components/product/Cartitem'
import { useNavigate } from 'react-router-dom'
import { deleteCartItem } from '../../actions/cartAction'
import UserContainer from '../../components/containers/UserContainer'


const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allcartitems = useSelector((state)=> state.getCartItems)
    const {userInfo} = useSelector((state)=> state.userLogin)
    const {cartitems, loading, error} = allcartitems
    console.log("cartiems", cartitems)
    
    if(!userInfo){
        navigate('/login')
    }

    useEffect(()=>{
        dispatch(getCartItem())
    },[dispatch])

    const length =cartitems && cartitems.cartitems.length
    const handleCheckout=()=>{
        if(length === 0){
            alert("add item")
            navigate('/')
        }
        else{

            navigate('/order')
        }
        
    }

    const handleCartDelete = (id)=>{
        dispatch(deleteCartItem(id))
    }
  return (
    <UserContainer>
    <div className='cart-container'>
        {loading && <p>loading...</p>}
        {error && <p>error ...</p>}
        <div className="cart-item-total">
            <p>total price: Rs. {cartitems && cartitems.results.totalPrice} </p>
            <p>total quantity: {cartitems && cartitems.results.totalQuantity} </p>
        <button onClick={handleCheckout}>checkout</button>
        </div>

        <div className="cart-item-container">
            {cartitems && cartitems.cartitems && cartitems?.cartitems.map((items)=>(
                <Cartitem items={items} key={items._id} handleCartDelete={handleCartDelete}/>
            ))}
        </div>

        

      
    </div>
    </UserContainer>
  )
}

export default Cart
