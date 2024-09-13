import React, { useEffect } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './adminpage.css'


const Adminpanel = () => {
  const navigate = useNavigate()
  const { adminData, loading, error } = useSelector((state) => state.adminLogin);
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])
  console.log("admindata dminpanel", adminData)
  return (
    <AdminContainer>

     
  
    <div className='adminpanel-container'>
      <div className="admin" onClick={()=> navigate('order')}>order
        <img src="/order.png" alt="order image" />
      </div>
      <div className="admin" onClick={()=> navigate('fooditem')}>All fooditem
        <img src="/fooditems.png" alt="" />
      </div>
      <div className="admin" onClick={()=> navigate('user')}>All users
        <img src="/users.png" alt="" />
      </div>
      <div className="admin" onClick={()=> navigate('add')}>Food item
        <img src="add.png" alt="" />
      </div>
    </div>
    </AdminContainer>
  )
}

export default Adminpanel
