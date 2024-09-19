import React, { useEffect } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { useDispatch, useSelector } from 'react-redux'
import { displayUser } from '../../actions/adminAction'
import "./adminpage.css"
import { useNavigate } from 'react-router-dom'

const AdminUserManage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {UserData, loading, error} = useSelector((state)=> state.DisplayUser)

  const { adminData} = useSelector((state) => state.adminLogin);
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])
  
  useEffect(()=>{

    dispatch(displayUser())
  },[])


  return (
    <AdminContainer>
      <h1>Users</h1>
    <div className='admin-user-container'>
      {UserData && UserData.map((user)=>{
        return <div key={user._id} className='admin-singleuser'>
          <div className="user-image-profile">
            <img  src={user.profile} alt="" />
          </div>
          <p >{user.name}</p>
          <p >{user.email}</p>
          <p className=''>{user.address}</p>
          <p>{user.contact}</p>
          
          
           </div>
      })}
      
    </div>
    </AdminContainer>
  )
}

export default AdminUserManage
