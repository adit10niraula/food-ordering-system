import React, { useEffect } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { useDispatch, useSelector } from 'react-redux'
import { displayUser } from '../../actions/adminAction'
import "./adminpage.css"
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../../actions/userAction'
import { clearDeleteState } from '../../actions/userAction'


const AdminUserManage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {UserData, loading, error:displayerror} = useSelector((state)=> state.DisplayUser)

  const { adminData} = useSelector((state) => state.adminLogin);
  const {deleteuser, error} = useSelector((state)=> state.DeleteUser)
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])
  
  useEffect(()=>{

    dispatch(displayUser())
  },[dispatch])

  useEffect(()=>{

    if(deleteuser){
     
      dispatch(displayUser())
      
    }
    if(error){
      alert(`error: ${error}`)
    }

  },[deleteUser,error, dispatch])
  
  const handleuserDelete = (id)=>{
    if(window.confirm("are you sure you want to delete this user ? ")){

      dispatch(deleteUser(id))
    }
    
  }
  

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
          
          <button type="submit" onClick={()=> handleuserDelete(user?._id)}>delete</button>
           </div>
      })}
      
    </div>
    </AdminContainer>
  )
}

export default AdminUserManage
