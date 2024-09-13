import React, { useState } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { useDispatch, useSelector } from 'react-redux'
import { adminAddFoodItem , AdminFooditems} from '../../actions/adminAction'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './adminpage.css'

const AdminAddFoodITem = () => {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [category,setcategory] = useState("")
  const [image,setimage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { adminData } = useSelector((state) => state.adminLogin);
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])


  const handleAddFoodItem = async(e)=>{
    e.preventDefault()
    await dispatch(adminAddFoodItem(title, description,price,category,image))
    dispatch(AdminFooditems())
    alert("item added success")
    navigate('/admin/fooditem')
    
  }
  return (
    <AdminContainer>

      
    <div className='admin-addFooditem-container'>

      <h1> Add Food Items</h1>
     <form className='admin-food-form'  onSubmit={handleAddFoodItem}>
      <div>
      <label htmlFor="title">title</label> <br />
      <input type="text" name="title" id="title" value={title} onChange={(e)=>settitle(e.target.value)} />
      </div>
      <div>
      <label htmlFor="description">description</label><br />
      <input type="text" name="description" id="description" value={description} onChange={(e)=>setdescription(e.target.value)} />
      </div>
      <div>
      <label htmlFor="price">price</label> <br />
      <input type="text" name="price" id="price" value={price} onChange={(e)=>setprice(e.target.value)} />
      
      </div>
      <div>
      <label htmlFor="category">category</label> <br />
      <input type="text" name="category" id="category" value={category} onChange={(e)=>setcategory(e.target.value)} />
      
      </div>
      <div>
      <label htmlFor="image">image</label><br />
      <input type="file" name="image" id="image"  onChange={(e)=> setimage(e.target.files[0])} />
      </div>
      <button type="submit">add fooditem</button>
     </form>
    </div>
    </AdminContainer>
  )
}

export default AdminAddFoodITem
