import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogout } from '../../actions/adminAction'
import { useDispatch, useSelector } from 'react-redux'


const AdminNav = () => {
  const { adminData, loading, error } = useSelector((state) => state.adminLogin);
 console.log("admindata",adminData)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleAdminLogout =()=>{
    dispatch(adminLogout())
  }
  return (
    <div className='nav-container'>
      <div className="admin-logo" >
        <p>admin panel</p>
      </div>
      <ul>
        <Link className='link' to="/admin">admin panel</Link>
        <Link className='link' to="/admin/order">order</Link>
        <Link className='link' to="/admin/fooditem">FoodItem</Link>
        <Link className='link' to="/admin/user">Users</Link>
        <Link className='link' to="/admin/add">Add Fooditem</Link>


        {adminData && adminData ? <button className='button'  onClick={handleAdminLogout}>logout</button>: <Link className='link' to= "/adminlogin">login</Link>}
       
        </ul>
        
      
    </div>
  )
}

export default AdminNav
