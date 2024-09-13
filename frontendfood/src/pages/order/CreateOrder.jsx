import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createOrder } from '../../actions/cartAction'
import { useLocation, useNavigate } from 'react-router-dom'

const CreateOrder = () => {
  const navigate  = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const orderitemdetail = useSelector((state)=>state.createorder)
    const {orderData, loading, error} = orderitemdetail
    const queryParams = new URLSearchParams(location.search)
    const data = queryParams.get('data');


    console.log("orderdata", orderData)

    useEffect(()=>{
        if(data){

            dispatch(createOrder(data))
            navigate('/')
        }
    },[dispatch])
  return (
    <div>
        order create success
      
    </div>
  )
}

export default CreateOrder
