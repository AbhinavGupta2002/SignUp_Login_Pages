import React, {useState} from 'react';
import useForm from './UseForm';
import validation from './Validation';
import {Link} from 'react-router-dom';
import './Form.css';

const FormLogin = ({submitForm}) => {
    document.title = "Login Form"
    const {handleChange, values, handleSubmit, errors} = useForm(submitForm, validation)
    const [buttonText, setButtonText] = useState('SHOW')

    

    function handlePasswordView() {
        buttonText == 'HIDE' ? setButtonText('SHOW') : setButtonText('HIDE')
    }

  return (
      <div className='form-content-right'> 
        <form className='form' onSubmit={handleSubmit}>
            <h1 style={{ fontSize: '160%', textAlign: 'center'}}>Login Form</h1>
            <div className='form-inputs'>
                <label htmlFor='username' className='form-label'>
                    Username
                </label>
                {errors.username && <p>{errors.username}</p>}
                <input id='username' type='username' name='username' className='form-input' 
                        placeholder={'Enter your username'}
                        value={values.inputName} onChange={handleChange}/>
            </div>
            <div className='form-inputs'>
                <label htmlFor='password' className='form-label'>
                    Password
                </label>
                {errors.password && <p>{errors.password}</p>}
                <input id='password' type={buttonText == 'SHOW' ? 'password' : 'text'} name='password' className='form-input' 
                        placeholder={'Enter your password'}
                        value={values.inputName} onChange={handleChange}/>
            </div>
            <button type='button' className='password-button-3' onClick={handlePasswordView}>
                {buttonText}
            </button>
            <button className='form-input-btn' type='submit'>Login</button>
            <span className='form-input-login'>Don't Have An Account? <Link to='/Signup_Login_Pages'>Signup</Link></span>
        </form>
      </div>
  )
}

export default FormLogin