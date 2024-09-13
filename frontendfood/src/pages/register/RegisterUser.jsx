import React, { useEffect, useState } from 'react'
import '../login/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'
import UserContainer from '../../components/containers/UserContainer'

const RegisterUser = () => {
    
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [address, setaddress] = useState('')
    const [contact, setcontact] = useState('')
    const [profile, setprofile] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector((state)=> state.userRegister)
    const {userInfo, loading, error} = userRegister


    const handleRegister = (e)=>{
        e.preventDefault()
        dispatch(register(name, email, password, address, contact, profile))
        
    }

    useEffect(()=>{
      if(userInfo){
        navigate('/')

      }

    },[])
    

  return (
    <UserContainer>
    <div className='userlog-container'>
      <h1>Register user</h1>
        {loading && <p>loading...</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleRegister} action="" method="post">
            <div className='reg'>
            <input type="text" name="name" id="name" placeholder='enter your name' onChange={(e)=>setname(e.target.value)} /> 
           
            <input type="text" name="email" id="email" placeholder='email: example@gmail.com' onChange={(e)=>setemail(e.target.value)} /> 
            </div>

            <div className='reg'>
            <input type="text" name="address" id="address" placeholder='enter your address' onChange={(e)=>setaddress(e.target.value)} />
         
            <input type="text" name="contact" id="contact" placeholder='enter your contact number' onChange={(e)=>setcontact(e.target.value)} /> 
            </div>
            <div className='reg'>
            <input type="text" name="password" id="password" placeholder='enter your password' onChange={(e)=>setpassword(e.target.value)} /> 
            
            <input type="file" name="profile" id="profile" placeholder='profile'  onChange={(e)=>setprofile(e.target.files[0])}/>
            </div>
            <button type="submit">register</button>
        </form>
      
    </div>
    </UserContainer>
  )
}

export default RegisterUser
