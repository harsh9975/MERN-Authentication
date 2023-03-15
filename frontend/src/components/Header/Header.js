import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useGetDetailsQuery } from '../../services/auth/authService'
import './header.css'
import { logout, setCredentials } from '../../features/auth/authSlice'

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { data } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })

  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  const handleLogout = () =>{
    dispatch(logout());
    navigate('/login')
  }
  return (
    <div className='header'>
        <div className='logo'>
            INTERVIEW
        </div>
        <div>
           
            {
                userInfo ?
                <>
                 <Link className='nav-item' to="/">Home</Link>
                  <span className='nav-item' onClick={handleLogout}>Logout</span>
                </>
              
                :
                <>
                <Link className='nav-item' to="/login">Login</Link>
                <Link className='nav-item' to="/register">Sign Up</Link>
                </>
            }
        </div>
    </div>
  )
}

export default Header