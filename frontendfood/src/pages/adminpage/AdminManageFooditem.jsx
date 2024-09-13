import React, { useEffect } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { AdminFooditems } from '../../actions/adminAction'
import { useDispatch,useSelector } from 'react-redux'
import ProductList from '../../components/product/ProductList'
import { useNavigate } from 'react-router-dom'

const AdminManageFooditem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {adminfood, loading, error} = useSelector((state)=> state.adminfooditem)
  const { adminData} = useSelector((state) => state.adminLogin);
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])
 
  const fooditem = adminfood && adminfood.items
  
 
  useEffect(()=>{
    dispatch(AdminFooditems())

  },[])
  return (
    <AdminContainer>
    <div>
      {loading && <p>loading ....</p>}
      {error && <p>{error}</p>}
      
    {fooditem && <ProductList fooditem={fooditem}/>}
      
    </div>
    </AdminContainer>
  )
}

export default AdminManageFooditem
