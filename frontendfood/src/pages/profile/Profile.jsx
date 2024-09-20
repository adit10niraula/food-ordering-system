import React, { useEffect } from 'react'
import UserContainer from '../../components/containers/UserContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.getcurrentuser)
    const {userInfo} = useSelector((state)=> state.userLogin)
    console.log("profile user", user)

    if(!userInfo){
        navigate('/login')
    }

    useEffect(()=>{
        dispatch(getCurrentUser())
    },[])

  return (
    <UserContainer>
    <div>
        <h1> welcome to profile page</h1>
        <div className="current-user-profile">
            <div className="user-profile-image">
                <img src={user && user?.profile} alt="" />
            </div>
            <div className="user-detail-profile">
                <p className='profile-title'>name</p>
                <p className='profile-detail'>{user && user?.name}</p>

                <p className='profile-title'>email</p>
                <p className='profile-detail'>{user && user?.email}</p>

                <p className='profile-title'>address</p>
                <p className='profile-detail'>{user && user?.address}</p>

                <p className='profile-title'>contact</p>
                <p className='profile-detail'>{user && user?.contact}</p>

            </div>
        </div>
      
    </div>
    </UserContainer>
  )
}

export default Profile
