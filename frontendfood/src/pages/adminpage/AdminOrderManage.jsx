import React, {useEffect} from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminOrderManage = () => {
  const navigate = useNavigate()

  const { adminData} = useSelector((state) => state.adminLogin);
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])
  return (
    <AdminContainer>
    <div>
      admin order mange
    </div>
    </AdminContainer>
  )
}

export default AdminOrderManage
