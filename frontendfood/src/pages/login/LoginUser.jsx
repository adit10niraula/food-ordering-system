import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../actions/userAction'
import UserContainer from '../../components/containers/UserContainer'
import { Link } from 'react-router-dom'
import './login.css'

const LoginUser = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogins = useSelector((state)=>state.userLogin)
    const {userInfo, loading, error} = userLogins


    const handleLogin = (e)=>{
        e.preventDefault()
        
        dispatch(login(email, password))
    }

    console.log("userinfo", userInfo)
    useEffect(()=>{

        if(userInfo){
            navigate('/')
        }

    },[userInfo, navigate])

//     style={{ 
            
//         background: "linear-gradient(to right, blue, purple)", // Direct access to public folder image
//   height: "100vh" ,
//   padding:"0",
//   margin:"0",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
 
// }} 

  return (
    <UserContainer>
        <div className='userloginreg-cont' >
    <div className='userlogregflex'>
       
    <div className='userlog-container'  >
        <h1>login user</h1>

        
       
        <form  onSubmit={handleLogin} action="" method="post">
          
           
            <input type="email" name="email" id="emai" placeholder='example@gmail.com' onChange={(e)=>setemail(e.target.value)} />
           
            
            <input type="password" name="password" id="password" placeholder='password' onChange={(e)=>setpassword(e.target.value)} />
            
            <button type="submit">login</button>
            <p>doesnot have account <Link to="/register">sing in</Link></p>
            <p>are you admin <Link to="/adminlogin">admin login</Link> </p>
        </form>

        <div className="errors">
        {loading && <p>loading ...</p>}
        {error && <p>{error}</p>}
       
        </div>
        
    </div>
    <div className="login-image-container">
        <img src="/orderfood.jpg" alt="" />
    </div>
    </div>
    </div>
    </UserContainer>
  )
}

export default LoginUser
