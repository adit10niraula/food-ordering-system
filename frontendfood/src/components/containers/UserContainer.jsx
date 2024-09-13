import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../navbar/Footer'

const UserContainer = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
        <Footer/>
      
    </div>
  )
}

export default UserContainer
