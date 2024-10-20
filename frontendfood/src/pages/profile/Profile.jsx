import React, { useEffect } from 'react'
import UserContainer from '../../components/containers/UserContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'
import { userOrder } from '../../actions/userAction'

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.getcurrentuser)
    const {userInfo} = useSelector((state)=> state.userLogin)
    

    const {userorder}  = useSelector((state)=> state.userorders)
    console.log("userorderss", userorder)

    if(!userInfo){
        navigate('/login')
    }

    useEffect(()=>{
        dispatch(getCurrentUser())
        dispatch(userOrder())
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

{userorder && userorder.length > 0 &&

        <div className="user-food-orders">
            <h1>Orders</h1>

            {userorder && userorder?.map((order)=>(
                <div key={order._id} className='user-order-detail-info'>
                <p>order id: {order?._id}</p>
                <p> payment status: {order?.paymentStatus}</p>
                <p>status: {order?.status}</p>
                
                {order?.cartitem?.map((item)=>(
                    <div key={item?.fooditem?._id} className='order-user-fooditem'>
                        <div className="image">
                            <img src={item?.fooditem?.image} alt="" />
                        </div>
                        <div className="user-order-detail">
                        <p>name:{item?.fooditem?.title}</p>
                        <p>price:{item?.fooditem?.price}</p>
                        <p>quantity: {item?.quantity}</p>
                        </div>
                         </div>

                ))} 
                <p>total Price : {order?.totalprice}</p>  
                 </div>
            ))}
        </div>}
      
    </div>
    </UserContainer>
  )
}

export default Profile
