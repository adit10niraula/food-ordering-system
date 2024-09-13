import React, { useState, useEffect } from 'react';
import AdminContainer from '../../components/containers/AdminContainer';
import { adminlogin } from '../../actions/adminAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../login/login.css'

const Adminlogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const { adminData, loading, error } = useSelector((state) => state.adminLogin);

  useEffect(() => {
    if (adminData) {
      navigate('/admin');
    }
  }, [adminData, navigate]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    dispatch(adminlogin({ email, password }));
  };

  return (
    <AdminContainer>
      <div className='userlog-container'>
        {error && <p>{error}</p>}
        <div className="admin-login-form">
          <h1>Admin Login</h1>
          <form onSubmit={handleAdminLogin}>
            
            <input
              type="email"
              name="email"
              id="email"
              placeholder='example@gmail.com'
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            
            <input
              type="password"
              name="password"
              id="password"
              placeholder='enter your password'
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </AdminContainer>
  );
};

export default Adminlogin;
