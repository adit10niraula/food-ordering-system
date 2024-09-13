import React from 'react'

import AdminNav from '../navbar/AdminNav'
import Footer from '../navbar/Footer'

const AdminContainer = ({children}) => {
  return (
    <div>
        <AdminNav/>

        {children}
        <Footer/>
      
    </div>
  )
}

export default AdminContainer
