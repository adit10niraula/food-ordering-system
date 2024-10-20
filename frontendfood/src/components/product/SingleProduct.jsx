// import React from 'react'
// import './singleproduct.css'
// import { useSelector } from 'react-redux'

// const SingleProduct = ({item, handleDetail,handleAddToCart,addToFavourate}) => {


//   const {getfav} = useSelector((state)=>state.getfav)

//   const favfod = getfav?.favourates
//   console.log("get favaljdflsdjf", favfod)


  
//   return (
//     <div>
//         <div className="single-product-container">
//             <div className="single-image"> 
//             <img src={item?.image} alt="" />

//             </div>
//             <div className="product-info">

//             <div className="title-price">
//                 <p className='title'>{item?.title}</p>
//                 <p className='price'>Rs. {item?.price}</p>
//             </div>
//             <p className='categroy'>{item?.category?.name}</p>
//             <p className='description'>{item?.description}</p>

           
//             </div>
//             <div className='single-product-btnhandle'>
//             <button onClick={()=>handleDetail(item?._id)}>detail</button>
//             <button onClick={()=>handleAddToCart(item?._id)}>Add to Cart</button>
//             {/* <button onClick={()=>addToFavourate(item?._id)}>favourate</button> */}

                       
//               {getfav && getfav.favourates?.map((fav) => (
//                 fav?.fooditem?._id === item._id ? (
//                   <div key={fav.fooditem._id}>
                    
//                   </div>
//                   ) : <button onClick={()=>addToFavourate(item?._id)}>favourate</button>
//               ))}

//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default SingleProduct






import React from 'react';
import './singleproduct.css';
import { useSelector } from 'react-redux';

const SingleProduct = ({ item, handleDetail, handleAddToCart, addToFavourate }) => {
  const { getfav } = useSelector((state) => state.getfav);
  const favfod = getfav?.favourates;
  console.log("get favourites:", favfod);

  // Check if the current item is in the list of favourites
  const isFavourite = favfod?.some((fav) => fav?.fooditem?._id === item._id);
  const avgrating = item.rating.reduce((acc, curr)=> acc + curr.rating, 0)/ item.rating.length || 0

  return (
    <div>
      <div className="single-product-container">
        <div className="single-image">
          <img src={item?.image} alt="" />
        </div>
        <div className="product-info">
          <div className="title-price">
            <p className='title'>{item?.title}</p>
            <p className='price'>Rs. {item?.price}</p>
          </div>
          <p className='category'>{item?.category?.name}</p>
          <p className='description'>{item?.description}</p>
          <p className='rating'>rating:{avgrating.toFixed(1)} </p>

        </div>
        <div className='single-product-btnhandle'>
          <button onClick={() => handleDetail(item?._id)}>Detail</button>
          <button onClick={() => handleAddToCart(item?._id)}>Add to Cart</button>

          {/* Show "favourite" button only if the item is not already in favourites */}
          {!isFavourite && (
            <button onClick={() => addToFavourate(item?._id)}>Favourite</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
