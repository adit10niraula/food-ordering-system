// import React, {useEffect} from 'react'
// import AdminContainer from '../../components/containers/AdminContainer'
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { adminOrder } from '../../actions/adminAction';
// import './adminpage.css'
// import { deleteOrder } from '../../actions/adminAction';


// const AdminOrderManage = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const { adminData} = useSelector((state) => state.adminLogin);
//   const {order} = useSelector((state)=> state.AdminOrder)

//   const {deleteorder,error} = useSelector((state)=> state.DeleteOrder)
//   console.log("orderhaha", order)


//   useEffect(()=>{
//     dispatch(adminOrder())

//   },[])
  
//   useEffect(()=>{
//     if(!adminData){
//       navigate('/adminlogin')
//     }

//   },[adminData, navigate])


//   useEffect(()=>{

//     if(deleteorder){
     
//       dispatch(adminOrder())
      
//     }
//     if(error){
//       alert(`error: ${error}`)
//     }

//   },[deleteorder,error, dispatch])




//   const handleorderDelete = (id)=>{
//     if(window.confirm("are you sure you want to delete this user ? ")){

//       dispatch(deleteOrder(id))
//     }
    
//   }
//   return (
//     <AdminContainer>


// <div className='admin-order-container'>
//       {order && order.map((order) => (
//         <div key={order._id} className='admin-order-items'>
//           <h3>Order ID: {order._id}</h3>
//           <p>Address: {order.address}</p>
//           <p>Total Price: ${order.totalprice}</p>
//           <p>Status: {order.status}</p>
//           <p>Payment Status: {order.paymentStatus}</p>
//           <h4>Cart Items:</h4>
//           {order.cartitem.map((cart, index) => (
//             <div key={index} className="cart-item">
//               <p>Item Name: {cart.fooditem?.title}</p>
//               <p>Description: {cart.fooditem?.description}</p>
//               <p>Price: ${cart.fooditem?.price}</p>
//               <p>Quantity: {cart?.quantity}</p>
//             </div>
//           ))}
//           <hr />
//           <button type='submit' onClick={()=>handleorderDelete(order?._id)}>delete</button>
//         </div>
//       ))}
//     </div>
//     </AdminContainer>
//   )
// }

// export default AdminOrderManage




import React, { useEffect, useState } from 'react';
import AdminContainer from '../../components/containers/AdminContainer';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminOrder} from '../../actions/adminAction';
import { updateOrderStatus } from '../../actions/adminAction';
import { deleteOrder } from '../../actions/adminAction';
import './adminpage.css';

const AdminOrderManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminData } = useSelector((state) => state.adminLogin);
  const { order } = useSelector((state) => state.AdminOrder);
  const { deleteorder, error } = useSelector((state) => state.DeleteOrder);
  
  console.log('orderhaha', order);

  useEffect(() => {
    dispatch(adminOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!adminData) {
      navigate('/adminlogin');
    }
  }, [adminData, navigate]);

  useEffect(() => {
    if (deleteorder) {
      dispatch(adminOrder());
    }
    if (error) {
      alert(`error: ${error}`);
    }
  }, [deleteorder, error, dispatch]);

  const handleOrderDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    console.log(id, newStatus)
    dispatch(updateOrderStatus(id, newStatus));
  };

  return (
    <AdminContainer>
      <div className="admin-order-container">
        {order &&
          order.map((order) => (
            <div key={order._id} className="admin-order-items">
              <h3>Order ID: {order._id}</h3>
              <p>Address: {order.address}</p>
              <p>Total Price: ${order.totalprice}</p>
              <p>Status: {order.status}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <h4>Cart Items:</h4>
              {order.cartitem.map((cart, index) => (
                <div key={index} className="cart-item">
                  <p>Item Name: {cart.fooditem?.title}</p>
                  <p>Description: {cart.fooditem?.description}</p>
                  <p>Price: ${cart.fooditem?.price}</p>
                  <p>Quantity: {cart?.quantity}</p>
                </div>
              ))}
              <div className="order-status-dropdown">
                <label htmlFor={`status-${order._id}`}>Update Status: </label>
                <select
                  id={`status-${order._id}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in Kitchen">In Kitchen</option>
                  <option value="ready">Ready</option>
                </select>
              </div>
              <button type="submit" onClick={() => handleOrderDelete(order?._id)}>
                Delete
              </button>
              <hr />
            </div>
          ))}
      </div>
    </AdminContainer>
  );
};

export default AdminOrderManage;
