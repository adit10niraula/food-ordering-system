import React, { useEffect } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { adminFoodDetail } from '../../actions/adminAction'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetail from '../../components/product/ProductDetail'
import AdminProductDetail from '../../components/adminproduct/AdminProductDetail'
import { foodItemDetailDelete } from '../../actions/adminAction'
import { AdminFooditems } from '../../actions/adminAction'

const AdminFoodDetail = () => {
    const navigate = useNavigate()
    const dispatch =   useDispatch()
    const {id }= useParams()
    const {admindetail, loading, error:detailerror} = useSelector((state)=> state.adminfooditemdetail)
    const { adminData} = useSelector((state) => state.adminLogin);
    const admin = localStorage.getItem('admin')

    const {success,error} = useSelector((state)=>state.FoodItemDetailDelete)


  console.log("admin ", admin)
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])

    useEffect(()=>{
        dispatch(adminFoodDetail(id))
        

    },[])
  

    const handleEdit = (id)=>{
        navigate(`edit/${id}`)
        window.location.reload();
    }

    useEffect(()=>{
      if(success){
       
        dispatch(AdminFooditems());
        navigate('/admin/fooditem');
        


      }
      // if(error){
      //   alert(`error ${error}`)
      //   console.log("error", error)
      // }

    },[dispatch,success,error])

    const handledelete = (id)=>{
      if (window.confirm('Are you sure you want to delete this item?')) {
        dispatch(foodItemDetailDelete(id));
    }
    }

  return (
    <AdminContainer>
    <div>
        
            {admindetail && <AdminProductDetail fooditem={admindetail} handleEdit={handleEdit} handledelete={handledelete} adminData={adminData}/>}
        
    </div>
    </AdminContainer>
  )
}

export default AdminFoodDetail
