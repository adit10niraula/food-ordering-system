import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userAction'
import './navbar.css'
import { getCurrentUser } from '../../actions/userAction'

const Navbar = () => {
    const dispatch = useDispatch()
    const userinfo = useSelector((state)=> state.userLogin)
    const {user} = useSelector((state)=>state.getcurrentuser)
    
    const {userInfo}  = userinfo
  

    const handleLogout = ()=>{
        dispatch(logout())
    
    }

    useEffect(()=>{
        dispatch(getCurrentUser())
    },[])
  return (
    <div className='nav-container'>
        <p> <Link className='homelink' to="/"><img src="/logofood.png" alt="" /></Link></p>

        <ul>
            <Link className='link' to="/">home</Link>
            <Link className='link' to="/product">FoodItems</Link>
            <Link className='link' to="/cart">cart</Link>
            
           
        </ul>
        <ul>
        {userInfo?<>
            <Link className='link' to="/profile"><img src={user && user?.profile} alt=""  style={{width:"30px", height:"30px" , borderRadius:"50%"}}/></Link>
         <button onClick={handleLogout} className='button'>logout</button>
        </>  : <>
            <Link className='link' to="/login"> login</Link>
            <Link className='link' to="/register">register</Link>
            </> }
           

        </ul>
      
    </div>
  )
}

export default Navbar
