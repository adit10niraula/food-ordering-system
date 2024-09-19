import React, { useEffect } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './adminpage.css'


const Adminpanel = () => {
  const navigate = useNavigate()
  const { adminData, loading, error } = useSelector((state) => state.adminLogin);
  const {UserData} = useSelector((state)=> state.DisplayUser)
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])
  console.log("admindata dminpanel", adminData)
  return (
    <AdminContainer>
      <div>

     <h1>Dahboard</h1>
  
    <div className='adminpanel-container'>
      <div className="admin-order" >
        <p>order</p>

        <button onClick={()=> navigate('order')}>view Order</button>
        
      </div>
      <div className="admin-food" >
        <p>All fooditem</p>
        
      <button onClick={()=> navigate('fooditem')}>view Order</button>
      </div>
      <div className="admin-user" >
        <p>All users</p>

      <button onClick={()=> navigate('user')}>view Order</button>
        
      </div>
      
    </div>

    <div className='admin-user-dashboard-collection'>
      <h3>users</h3>
      {
        UserData && UserData.map((user)=>(
          <div key={user._id} className='admin-user-dashboard'> 
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.address}</p>
            <p>{user.contact}</p>
          </div>
        )

        )
      }
    </div>
    </div>
    </AdminContainer>
  )
}

export default Adminpanel
