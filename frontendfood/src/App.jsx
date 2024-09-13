import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterUser from './pages/register/RegisterUser'
import Home from './pages/home/Home'
import LoginUser from './pages/login/LoginUser'
import Navbar from './components/navbar/Navbar'
import Detail from './pages/detail/Detail'
import Cart from './pages/cart/Cart'
import Order from './pages/order/Order'
import CreateOrder from './pages/order/CreateOrder'
import Products from './pages/products/Products'

import AdminAddFoodITem from './pages/adminpage/AdminAddFoodITem'
import AdminOrderManage from './pages/adminpage/AdminOrderManage'
import AdminUserManage from './pages/adminpage/AdminUserManage'
import Adminlogin from './pages/adminpage/Adminlogin'
import Adminpanel from './pages/adminpage/Adminpanel'
import AdminManageFooditem from './pages/adminpage/AdminManageFooditem'
import AdminFoodDetail from './pages/adminpage/AdminFoodDetail'
import AdminEditFoodItem from './pages/adminpage/AdminEditFoodItem'


const App = () => {



  return (
    <div>
      
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/login" element={<LoginUser/>}/>
      <Route path='/register' element={<RegisterUser/>}/>
      <Route path='/product/detail/:id' element={<Detail/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/order" element={<Order/>}/>
      <Route path= "/createorder" element={<CreateOrder/>}/>
      <Route path='/product' element={<Products/>}/>

      <Route path= "/admin" element={<Adminpanel/>}/>
      <Route path= "/adminlogin" element={<Adminlogin/>}/>
      <Route path= "/admin/fooditem" element={<AdminManageFooditem/>}/>
      <Route path= "/admin/order" element={<AdminOrderManage/>}/>
      <Route path= "/admin/user" element={<AdminUserManage/>}/>
      <Route path= "/admin/add" element={<AdminAddFoodITem/>}/>
      <Route path= "/admin/fooditem/detail/:id" element={<AdminFoodDetail/>}/>
      <Route path= "/admin/fooditem/detail/:id/edit/:id" element={<AdminEditFoodItem/>}/>
     </Routes>
      
    </div>
  )
}

export default App
