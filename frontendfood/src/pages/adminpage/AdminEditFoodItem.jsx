import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AdminContainer from '../../components/containers/AdminContainer'
import AdminFoodDetail from './AdminFoodDetail'
import { adminFoodDetail } from '../../actions/adminAction'
import { adminfooditemdetailedit } from '../../actions/adminAction'
import './adminpage.css'


const AdminEditFoodItem = () => {
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [category,setcategory] = useState("")
    const [image,setimage] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(()=>{
    //     dispatch(AdminFooditems())
    
    //   },[])

    const {id} = useParams()
    const {admindetail, loading, error} = useSelector((state)=> state.adminfooditemdetail)
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
  
  
    const handleEditFoodItem = async(e)=>{
      e.preventDefault()
     
      const formdata = new FormData()
      formdata.append("title", title)
      formdata.append("description", description)
      formdata.append('price', price)
      formdata.append("category", category)
      if(image){
        formdata.append('image', image)
      }

      dispatch(adminfooditemdetailedit(id, formdata))
      navigate(`/admin/fooditem/detail/${id}`)
      
    }
    return (
      <AdminContainer>
        <div style={{
        backgroundImage: "url('/foodcover1.jpg')", // Direct access to public folder image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh" ,
        opacity: "inherit"
      }}>
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
      </div>
      </AdminContainer>
    )
}

export default AdminEditFoodItem
