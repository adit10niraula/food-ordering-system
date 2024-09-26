import React, { useEffect, useState } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { addCategory } from '../../actions/adminAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const dispatch  = useDispatch()
    const [categoryname, setcategoryname] = useState("")
    const navigate = useNavigate()
   const {categoryadd} = useSelector((state)=>state.addcategory)


   useEffect(()=>{
      if(categoryadd){
        navigate('/admin/fooditem')
      }
   },[dispatch, categoryadd,navigate])

    const handleaddcategory = ()=>{
      dispatch(addCategory(categoryname))
        console.log("successs")
    }
  return (
    <AdminContainer>
    <div className='category-container'>
        <h1>Add Category</h1>
        <div className="category-insert">
            <label htmlFor="category"></label>
            <input type="text" name="category" id="" value={categoryname} onChange={(e)=> setcategoryname(e.target.value)} />
            <br /><button type="submit" onClick={handleaddcategory}>Add category</button>
        </div>
      
    </div>
    </AdminContainer>
  )
}

export default AddCategory
