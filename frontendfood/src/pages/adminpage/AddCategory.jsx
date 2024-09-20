import React, { useEffect, useState } from 'react'
import AdminContainer from '../../components/containers/AdminContainer'
import { addCategory } from '../../actions/adminAction'
import { useDispatch } from 'react-redux'

const AddCategory = () => {
    // const dispatch  = useDispatch()
    // const [categoryname, setcategoryname] = useState("")

    // useEffect(()=>{
    //     dispatch(addCategory(categoryname))
    // },[])
  return (
    <AdminContainer>
    <div>
        <h1>Add Category</h1>
        {/* <div className="category-insert">
            <label htmlFor="category"></label>
            <input type="text" name="category" id="" onChange={(e)=> setcategoryname(e.target.value)} />
            <button type="submit">Add category</button>
        </div> */}
      
    </div>
    </AdminContainer>
  )
}

export default AddCategory
