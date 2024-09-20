import React from 'react'
import { useSelector } from 'react-redux'


const AdminProductDetail = ({fooditem,  handleEdit, handledelete,adminData}) => {
  const {loading, error} = useSelector((state)=> state.FoodItemDetailDelete)
  const admin = localStorage.getItem('admin')


  console.log("admin ", admin)




  return (
    <div>

{ fooditem && <div className="detail-item">
            <div className="detail-fooditem">
                <div className="detail-image">

                <img src={fooditem?.image} alt="" />
                </div>
                <div className="detail-desc">
                    <p>{fooditem?.title}</p>
                    <p>{fooditem?.description}</p>
                    <p>{fooditem?.category?.name}</p>
                    <p>{fooditem?.price}</p>
                    <button onClick={()=>handleEdit(fooditem?._id)}>edit</button> <button onClick={()=>handledelete(fooditem?._id)}>delete</button>
                    
                </div>
                

            </div>
            {error && <p>{error}</p>}
            
        </div>}
      
    </div>
  )
}

export default AdminProductDetail
