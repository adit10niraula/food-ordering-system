import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../actions/userAction'
import UserContainer from '../../components/containers/UserContainer'
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

  return (
    <UserContainer>
    <div className='userlog-container'>
        <h1>login user</h1>

        {loading && <p>loading ...</p>}
        {error && <p>{error}</p>}
       
        <form  onSubmit={handleLogin} action="" method="post">
          
           
            <input type="email" name="email" id="emai" placeholder='example@gmail.com' onChange={(e)=>setemail(e.target.value)} />
           
            
            <input type="password" name="password" id="password" placeholder='password' onChange={(e)=>setpassword(e.target.value)} />
            
            <button type="submit">login</button>
        </form>
       
    </div>
    </UserContainer>
  )
}

export default LoginUser
