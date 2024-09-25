import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AdminContainer from '../../components/containers/AdminContainer'
import AdminFoodDetail from './AdminFoodDetail'
import { adminFoodDetail } from '../../actions/adminAction'
import { adminfooditemdetailedit } from '../../actions/adminAction'
import './adminpage.css'
import { getAllCategory } from '../../actions/fooditemAction'


const AdminEditFoodItem = () => {
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [categorys,setcategory] = useState("")
    const [image,setimage] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {category} = useSelector((state)=> state.getallcategory)
    const {editdata, error} = useSelector((state)=> state.editfooditem)
    
    useEffect(()=>{
      dispatch(getAllCategory())
    },[])
    
    // useEffect(()=>{
    //     dispatch(AdminFooditems())
    
    //   },[])

    const {id} = useParams()
    const {admindetail, loading} = useSelector((state)=> state.adminfooditemdetail)
    console.log("admingdetail", admindetail)

    useEffect(()=>{
        if(!admindetail && !admindetail?._id !== id){
            dispatch(adminFoodDetail(id))
        }
        else{
            settitle(admindetail.title)
            setdescription(admindetail.description)
            setprice(admindetail.price)
            setcategory(admindetail.category.name)
            setimage(admindetail.image)
        }

    },[id, admindetail, dispatch])

    useEffect(()=>{
      if(editdata){
        
        dispatch(adminFoodDetail(id))
        navigate(`/admin/fooditem/detail/${id}`)
      }
      if(error){
        alert(`error: ${error}`)
      }

    }, [dispatch, editdata,error])
  
  
    const handleEditFoodItem = async(e)=>{
      e.preventDefault()
     
      const formdata = new FormData()
      formdata.append("title", title)
      formdata.append("description", description)
      formdata.append('price', price)
      formdata.append("category", categorys)
      if(image){
        formdata.append('image', image)
      }

      dispatch(adminfooditemdetailedit(id, formdata))
      // navigate(`/admin/fooditem/detail/${id}`)
      
    }
    return (
      <AdminContainer>
        {/* <div className='Admin_add_Food'>
      <div className='admin-addFooditem-container'>
       <form className='admin-food-form'  onSubmit={handleEditFoodItem}>
        <div>
        <label htmlFor="title">title</label>
        <input type="text" name="title" id="title" value={title} onChange={(e)=>settitle(e.target.value)} />
        </div>
        <div>
        <label htmlFor="description">description</label>
        <input type="text" name="description" id="description" value={description} onChange={(e)=>setdescription(e.target.value)} />
        </div>
        <div>
        <label htmlFor="price">price</label>
        <input type="text" name="price" id="price" value={price} onChange={(e)=>setprice(e.target.value)} />
        </div>
        <div>
        <label htmlFor="category">category</label>
        <input type="text" name="category" id="category" value={category} onChange={(e)=>setcategory(e.target.value)} />
        </div>
        <div>
        <label htmlFor="image">image</label>
        <input type="file" name="image" id="image"  onChange={(e)=> setimage(e.target.files[0])} />
        </div>
        <button type="submit">add fooditem</button>
       </form>
      </div>
      </div> */}



<div className='Admin_add_Food'>

      
<div className='admin-addFooditem-container'>

  <h2> Add Food Items</h2>
 <form className='admin-food-form'  onSubmit={handleEditFoodItem}>
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
  <button type="submit">update fooditem</button>
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

export default AdminEditFoodItem
