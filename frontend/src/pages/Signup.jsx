import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name:'',
    email:'',
    password:'',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    const copySignupInfo = {...signupData};
    copySignupInfo[name] = value;
    setSignupData(copySignupInfo);
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const {name,email,password} = signupData;
    if(!name || !email || !password){
      return handleError('Please enter the required credentials')
    }
    try{
      const url = "http://localhost:8000/auth/signup"
      const response = await fetch(url , {
        method: "POST",
        headers:{
          'content-type' : 'application/json'
        },
        body: JSON.stringify(signupData)
      })
      const result =await response.json();
      const {success, message,error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
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
      <h1>SignUp</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name <span>*</span></label>
          <input 
            onChange={handleChange}
            type="text"
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value={signupData.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email <span>*</span></label>
          <input 
            onChange={handleChange}
            type="email"
            name='email'
            placeholder='Enter your email...'
            value={signupData.email}
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
            value={signupData.password}
          />
        </div>
        <button type='submit'>Signup</button>
        <span>Already has an account ?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup
