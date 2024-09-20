import React, { useState } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { useDispatch, useSelector } from 'react-redux'
import { adminAddFoodItem , AdminFooditems} from '../../actions/adminAction'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './adminpage.css'
import { getAllCategory } from '../../actions/fooditemAction'

const AdminAddFoodITem = () => {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [categorys,setcategory] = useState("")
  const [image,setimage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { adminData } = useSelector((state) => state.adminLogin);
  const {category} = useSelector((state)=> state.getallcategory)
  const {fooddata, loading, error} = useSelector((state)=> state.adminaddfooditem)

  console.log("category", fooddata)
  useEffect(()=>{
    dispatch(getAllCategory())
  },[])
  
  useEffect(()=>{
    if(!adminData){
      navigate('/adminlogin')
    }

  },[adminData, navigate])

  


  const handleAddFoodItem = async(e)=>{
    e.preventDefault()
   
   
    await dispatch(adminAddFoodItem(title, description,price,categorys,image))

    if(fooddata){

    dispatch(AdminFooditems())
    alert(`${title} added success`)
    settitle("")
    setdescription("")
    setprice("")
    setcategory("")
    setimage("") 
    }
    
    
  }
  return (
    <AdminContainer>
      <div className='Admin_add_Food'>

      
    <div className='admin-addFooditem-container'>

      <h2> Add Food Items</h2>
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
      <input type="number" name="price" id="price" value={price} onChange={(e)=>setprice(e.target.value)} />
      
      </div>
      <div>
      <label htmlFor="category">category</label> <br />
      <select
        name="category"
        id="category"
        value={categorys}
        onChange={(e) => setcategory(e.target.value)}
      >
         <option value="" disabled>Select a category</option>
        {category && category.map((cat) => (
          <option key={cat?._id} value={cat?.name}>
            {cat?.name}
          </option>
        ))}
      </select>
      
      </div>
      <div>
      <label htmlFor="image">image</label><br />
      <input type="file" name="image" id="image"  onChange={(e)=> setimage(e.target.files[0])} />
      </div>
      <button type="submit">add fooditem</button>
     </form>
    <div className="errors">
        {loading && <p>loading ...</p>}
        {error && <p>{error}</p>}
       
        </div>
    </div>
    <div>
      
    </div>
    </div>
    </AdminContainer>
  )
}

export default AdminAddFoodITem
