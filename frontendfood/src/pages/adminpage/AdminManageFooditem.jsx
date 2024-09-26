import React, { useEffect,useState } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { AdminFooditems } from '../../actions/adminAction'
import { useDispatch,useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import AdminProductList from '../../components/adminproduct/AdminProductList'
import { getAllCategory } from '../../actions/fooditemAction'

const AdminManageFooditem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {adminfood, loading, error} = useSelector((state)=> state.adminfooditem)
  const { adminData} = useSelector((state) => state.adminLogin);

  const [categoryid, setcategoryid] = useState("")
  const {category} = useSelector((state)=> state.getallcategory)
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])
 
  const fooditem = adminfood && adminfood.items
  
 
  useEffect(()=>{
    dispatch(AdminFooditems())
    dispatch(getAllCategory())

  },[])

  const handlecategoryItem = (id)=>{
    setcategoryid(id)

    dispatch(AdminFooditems(id))
    
}

const displayitem = categoryid ? fooditem && fooditem.filter((item)=> item.category._id === categoryid):
    fooditem && fooditem;

  return (
    <AdminContainer>
    <div>
      {loading && <p>loading ....</p>}
      {error && <p>{error}</p>}

      <div className='handle_button_search'>
            <button onClick={()=> handlecategoryItem(null)}>all</button>
            {category && category.map((items)=>(
                <button key={items._id} onClick={()=>handlecategoryItem(items._id)}>{items.name}</button>
            ))}
            
         
            
        </div>
      
    {fooditem && <AdminProductList fooditem={displayitem}/>}
      
    </div>
    </AdminContainer>
  )
}

export default AdminManageFooditem
