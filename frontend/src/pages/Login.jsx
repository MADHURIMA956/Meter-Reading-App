import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email:'',
    password:'',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    const copyLoginData = {...loginData};
    copyLoginData[name] = value;
    setLoginData(copyLoginData);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const {email,password} = loginData;
    if(!email || !password){
      return handleError('Please enter the required credentials')
    }
    try{
      const url = "http://localhost:8000/auth/login"
      const response = await fetch(url , {
        method: "POST",
        headers:{
          'content-type' : 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      const result =await response.json();
      const {success, message, jwtToken, name,error} = result;
      console.log("result",result)
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name)
        setTimeout(() => {
          navigate('/home')
        }, 1000);
      }else if(error){
        const details = error?.details[0].message
        handleError(details);
      }else if(!success){
        handleError(message);
      }
    }
    catch (err){
      handleError(err)
    }

  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email <span>*</span></label>
          <input 
            onChange={handleChange}
            type="email"
            name='email'
            placeholder='Enter your email...'
            value={loginData.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password <span>*</span></label>
          <input 
            onChange={handleChange}
            type="password"
            name='password'
            autoFocus
            placeholder='Enter your password...'
            value={loginData.password}
          />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an account ?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
