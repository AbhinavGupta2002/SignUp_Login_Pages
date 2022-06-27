import React, {useState} from 'react'
import FormSignUp from './FormSignUp'
import FormSuccess from './FormSuccess'
import FormLogin from './FormLogin'
import {useLocation} from 'react-router-dom'
import './Form.css'

const Form = () => {
  const location = useLocation()
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true)
  }
  
  if (location.pathname === '/Signup_Login_Pages') {
    return (
        <div className='form-container'>
          <span className='close-btn'></span>
          <div className='form-content-left'>
            <img src={require('./img/img-2.svg').default} alt='spaceship' className='form-img'></img>
          </div>
          {!isSubmitted? <FormSignUp submitForm={submitForm}/> : <FormSuccess/>}
        </div>
    )} else {
        return (
          <div className='form-container'>
            <span className='close-btn'></span>
            <div className='form-content-left'>
              <img src={require('./img/img-2.svg').default} alt='spaceship' className='form-img'></img>
            </div>
            {!isSubmitted? <FormLogin submitForm={submitForm}/> : <FormSuccess/>}
          </div>
    )}
}

export default Form