import React, {useEffect} from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminOrder } from '../../actions/adminAction';
import './adminpage.css'


const AdminOrderManage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { adminData} = useSelector((state) => state.adminLogin);
  const {order} = useSelector((state)=> state.AdminOrder)
  console.log("orderhaha", order)


  useEffect(()=>{
    dispatch(adminOrder())

  },[])
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])
  return (
    <AdminContainer>
    <div className='admin-order-container'>
      <h1>Orders</h1>
      
      {order && order.map((item)=>(
        <div key={item._id} className='admin-order-items'> 
        <p>name: {item.user.name}</p>
        <p>payment status : {item.paymentStatus}</p>
        <p>total price: {item.totalprice}</p>
        <p>transaction code : {item.transactionCode}</p>
        <p>updated at : {new Date(item.updatedAt).toLocaleString()}</p>
        {/* <p>items: {item.cartitem.map((cart)=>(
          <ul>
            c
            </ul>))}</p> */}
        
         </div>
      ))}
    </div>
    </AdminContainer>
  )
}

export default AdminOrderManage
