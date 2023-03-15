import React from 'react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../../components/Button'
import Cards from '../../components/cards'
import { Input } from '../../components/Input'

const ForgotPass = () => {
  return (
    <div className='login-container'>
    <Cards>
        <h1 style={{textAlign:'center'}}>Forgot Password</h1>
        <Input label="Email" type='email' placeholder="Please enter email" />
        <PrimaryButton style={{width:'100%'}} label="Submit"/>
        <div style={{display:'flex',justifyContent:'center'}}>
            <Link to="/register">Back to Login</Link>
        </div>
    </Cards>
</div>
  )
}

export default ForgotPass