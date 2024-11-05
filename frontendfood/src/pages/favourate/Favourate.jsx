// import React, { useEffect } from 'react'
// import UserContainer from '../../components/containers/UserContainer'

// import { useDispatch, useSelector } from 'react-redux'
// import { getfavourate } from '../../actions/fooditemAction'

// const Favourate = () => {

//     const dispatch = useDispatch()
//     const {getfav} = useSelector((state)=> state.getfav)


//     console.log("getfav",getfav)

//     useEffect(()=>{
//         dispatch(getfavourate())
//     },[])
//   return (
//     <UserContainer>
//     <div>
//         <h1>Favourate</h1>

//         <div>
//             {getfav && getfav?.favourates?.map((fav)=>(
//                 <div key={fav._id} className="favitems">
//                     <img src={fav?.fooditem?.image} alt="" />
//                        <p>{fav?.fooditem?.title}</p> 
//                        <p>{fav?.fooditem?.description}</p> 
//                        <p>{fav?.fooditem?.price}</p> 

//                        <button>remove</button>
//                 </div>
//             ))}
//         </div>
      
//     </div>
//     </UserContainer>
//   )
// }

// export default Favourate


import React, { useEffect } from 'react';
import UserContainer from '../../components/containers/UserContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getfavourate,removeFavourate } from '../../actions/fooditemAction';
import { useNavigate } from 'react-router-dom';


const Favourate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { getfav } = useSelector((state) => state.getfav);
  const {userInfo} = useSelector((state)=> state.userLogin)

  if(!userInfo){
    navigate('/login')
}


  useEffect(() => {
    dispatch(getfavourate());
  }, [dispatch]);

  const handleRemoveFavourite = (id) => {
    dispatch(removeFavourate(id));
  };

  const handledetail = (id)=>{
    navigate(`/product/detail/${id}`)

  }

  return (
    <UserContainer>
      <div>
        <h1>Favourites</h1>
        <div>
          {getfav && getfav.favourates?.map((fav) => (
            <div key={fav._id} className="favitems">
              <img src={fav?.fooditem?.image} alt="" />
              <p>{fav?.fooditem?.title}</p>
              <p>{fav?.fooditem?.description}</p>
              <p>{fav?.fooditem?.price}</p>
              <button onClick={() => handleRemoveFavourite(fav.fooditem._id)}>Remove</button>
              <button onClick={() => handledetail(fav.fooditem._id)}>detail</button>
            </div>
          ))}
        </div>
      </div>
    </UserContainer>
  );
};

export default Favourate;
