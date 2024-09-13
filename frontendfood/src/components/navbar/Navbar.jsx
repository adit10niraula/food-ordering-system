import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userAction'
import './navbar.css'

const Navbar = () => {
    const dispatch = useDispatch()
    const userinfo = useSelector((state)=> state.userLogin)
    
    const {userInfo}  = userinfo
  

    const handleLogout = ()=>{
        dispatch(logout())
    
    }
  return (
    <div className='nav-container'>
        <p>khana Ghar</p>

        <ul>
            <Link className='link' to="/">home</Link>
            <Link className='link' to="/product">FoodItems</Link>
            <Link className='link' to="/cart">cart</Link>
            
            {userInfo?  <button onClick={handleLogout} className='button'>logout</button> : <>
            <Link className='link' to="/login"> login</Link>
            <Link className='link' to="/register">register</Link>
            </> }
           
        </ul>

      
    </div>
  )
}

export default Navbar
