import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cartitem from "../../components/product/Cartitem";
import { addOrderPayment } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import UserContainer from "../../components/containers/UserContainer";
import { getCartItem } from '../../actions/cartAction'

const Order = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
  const getallcartitems = useSelector((state) => state.getCartItems);
  const { cartitems, loading, error } = getallcartitems;

  const orderpayments = useSelector((state)=> state.addorderpayment)
  const {paymentdetail, loading:orderloading, error:ordererror} = orderpayments
  console.log("payment details : ", paymentdetail)

  const totalprice = paymentdetail?.results?.totalPrice 
  console.log(totalprice)
  const signature = paymentdetail?.signature
  const uuid = paymentdetail?.uuid

  const {userInfo} = useSelector((state)=> state.userLogin)
 

  

    if(!userInfo){
        navigate('/login')
    }
    
 

  

  useEffect(()=>{
   
    
    dispatch(addOrderPayment())
    dispatch(getCartItem())
  },[dispatch])
  
  
  

  return (
    <UserContainer>
    <div className="order-container">
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      <div className="cart-item-container">
        {cartitems &&
        
          cartitems?.cartitems.map((items) => (
            <Cartitem items={items} key={items._id} />
          ))}
      </div>

      <div className="order-payment">
        {ordererror && <p>{ordererror}</p>}
        <h1>make payment</h1>
        <p>total amount: Rs. {cartitems && cartitems.results.totalPrice} </p>
        <p>total quantity: {cartitems && cartitems.results.totalQuantity} </p>

        <div className="payment-form">
          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
          >
            <input type="hidden" id="amount" name="amount" value={totalprice} required />
            <input
              type="hidden"
              id="tax_amount"
              name="tax_amount"
              value="0"
              required
            />
            <input
              type="hidden"
              id="total_amount"
              name="total_amount"
              value={totalprice}
              required
            />
            <input
              type="hidden"
              id="transaction_uuid"
              name="transaction_uuid"
              value={uuid}
              required
            />
            <input
              type="hidden"
              id="product_code"
              name="product_code"
              value="EPAYTEST"
              required
            />
            <input
              type="hidden"
              id="product_service_charge"
              name="product_service_charge"
              value="0"
              required
            />
            <input
              type="hidden"
              id="product_delivery_charge"
              name="product_delivery_charge"
              value="0"
              required
            />
            <input
              type="hidden"
              id="success_url"
              name="success_url"
              value="http://localhost:5173/createorder"
              required
            />
            <input
              type="hidden"
              id="failure_url"
              name="failure_url"
              value="http://localhost:5173/cart"
              required
            />
            <input
              type="hidden"
              id="signed_field_names"
              name="signed_field_names"
              value="total_amount,transaction_uuid,product_code"
              required
            />
            <input type="hidden" id="signature" name="signature" value={signature} required />
            <button type="submit">make payment</button>
          </form>
        </div>
      </div>
    </div>

    </UserContainer>
  );
};

export default Order;
